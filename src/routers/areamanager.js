const express = require('express')
const router = new express.Router()
const auth = require('../auth/auth')
const jwt = require('jsonwebtoken')
var multer = require('multer')
const Mines = require('../models/mine')
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')
const Vehicleowner = require('../models/vehicleowner') // maine kiya h
const AreaManager = require('../models/areamanager')
const FieldStaff = require('../models/fieldstaff')
const Fieldstaff = require('../models/fieldstaff')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {

        return cb(undefined, true);

    }
})
const db = require('../db/dbfile')
const mongoose = require("mongoose")
var Schema = mongoose.Schema;
var transporterUpload = upload.fields([{ name: 'panimage', maxCount: 1 }, { name: 'aadhaarimage', maxCount: 1 }])




router.post("/areamanager", async (req, res) => {
    try {
        let mobile = req.body.mobile
        let user = await VehicleOwner.findOne({ mobile })
        if (user) {
            throw new Error("Unique")
        }
        user = await FieldStaff.findOne({ mobile })
        if (user) {
            throw new Error("Unique")
        }
        user = await AreaManager.findOne({ mobile })
        if (user) {
            throw new Error("Unique")
        }
        user = await Transporter.findOne({ mobile })
        if (user) {
            throw new Error("Unique")
        }
        const areamanager = new AreaManager(req.body)
        const token = await areamanager.generateToken()
        await areamanager.save()
        res.status(200).send({ token: "areamanager:" + token, ...areamanager.toJSON() })
    }
    catch (e) {
        ////(e)
        res.status(400).send(e.message)
    }
    /* const areamanager  = new AreaManager(req.body)
     areamanager.save().then((a)=>{
             res.status(201)
             res.send(a)
     }).catch((e)=>{
             res.status(400)
             res.send(e)
     })*/
})

router.get('/areamanager/me', auth, async (req, res) => {
    res.status(200).send({ token: "areamanager:" + req.token, ...req.user.toJSON(), profile: "https://transflyhome.club/areamanager/profile/" + req.user.mobile + "/image" })
})


router.get('/areamanager/profile/:mobile/image', async (req, res) => {
    try {
        const mobile = req.params.mobile
        const user = await AreaManager.findOne({ mobile })
        if (user != null) {
            let c = db.imagedb.model(user.profile, 
                new Schema({ image: Buffer}), 
                user.profile);
    
                let imgobj = await c.find({})
            
                if(imgobj)
                {
                    res.set('Content-Type', 'image/png')
                    res.send(imgobj[0].image)    
                }
                else
                {
                    res.send(null)
                }
    
            // res.set('Content-Type', 'image/png')
            // res.send(user.profile)
        }
        else {
            res.send(null)
        }
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/areamanager/me/pending', auth, async (req, res) => {
    try {
        var names = [];
        for (key in req.user.toObject()) {
            if (req.user[key] == null) {
                names.push(key.replace("image", ""))
            }
        }
        return res.status(200).send(names)
    }
    catch (e) {
        ////(e)
        res.status(400).send(e.message)
    }
})


router.get('/areamanager/mines', auth, async (req, res) => {
    try {
        await req.user.populate(
            {
                path: 'mines'
                ,
                options: {
                    sort: {
                        createdAt: -1
                    }
                }
            }).execPopulate()

        return res.status(200).send(req.user.mines)


    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/areamanager/allfieldstaff', auth, async (req, res) => {
    try {
        let fieldstafflist = await FieldStaff.find({ active: true, status: 2 })
        return res.status(200).send(fieldstafflist)
    }
    catch (e) {
        return res.status(400).send(e)
    }
})

router.post('/areamanager/confirm', auth, async (req, res) => {
    try {
        const fieldstaff = await FieldStaff.findOne({ id: req.body.fieldstaffid })
        if (fieldstaff) {
            let newmine = await Mines.findOne({ id: parseInt(req.body.mineid) })
            try {
                let oldmine = await Mines.findOne({ fieldstaff: fieldstaff.id })
                oldmine.fieldstaff = null
                await oldmine.save()
            }
            catch (e) {

            }

            newmine.fieldstaff = fieldstaff.id
            await newmine.save()
            return res.status(200).send("DONE")
        }
        else {
            return res.status(400).send("error")
        }
    }
    catch (e) {
        return res.status(400).send(e)
    }
})


router.get("/allareamanager", auth, async (req, res) => {
    try {
        const areamanagers = await AreaManager.find({})
        res.status(200).send(areamanagers)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /* AreaManager.find({}).then((a)=>{
         res.status(200)
         res.send(a)
     }).catch((e)=>{
         res.status(400)
         res.send(e)
     })*/
})

// router.get("/areamanager/:mobile",auth,async (req,res)=>{
//     try
//     {
//         const mobile = req.params.mobile
//         const areamanager = await Admin.findOne({mobile})
//         if(areamanager!=null)
//         {
//              res.status(200).send(areamanager.getPublicProfile())   
//         }
//         else
//         {
//             res.status(400)
//         }    
//     }
//     catch(e)
//     {
//         res.status(400).send(e)
//     }
//    /* const mobile = req.params.mobile
//     AreaManager.findOne({mobile},(e, a)=>{
//             if(e)
//             {
//                 res.status(400)
//                 res.send(e)       
//             }
//             else
//             {
//                 res.status(200)
//                 res.send(a)
//             }
//     })*/
// })

router.post("/areamanager/me", auth, transporterUpload, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        let imageupdates = []
        try {
            imageupdates = Object.keys(req.files)
        }
        catch (e) {

        }
        const allowedUpdates = ['name', 'mobile', 'email', 'password', 'status',
            'accountno', 'ifsc', 'bankname', 'pan', 'aadhaar', 'ename', 'erelation', 'emobile']
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation && (updates.length > 0)) {
            return res.status(400).send("Invalid")
        }

        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })

        imageupdates.forEach((update) => {
            req.user[update] = req.files[update][0].buffer

        })

        await req.user.save()
        return res.status(200)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


router.patch("/areamanager/:id", auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'mobile', 'email', 'password', 'status',
            'accountno', 'ifsc', 'bankname', 'city', 'pan', 'aadhaar', 'ename', 'erelation', 'emobile']
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation) {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /*  const areamanager = await AreaManager.findOneAndUpdate({mobile},req.body,{
              new : true,
              runValidators: true
          })*/
        const areamanager = await AreaManager.findOne({ id })
        if (areamanager != null) {
            updates.forEach((update) => {
                areamanager[update] = req.body[update]
            })
            await areamanager.save()
            res.status(200).send(areamanager.getPublicProfile())
        }
        else {
            return res.status(400)
        }
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete("/areamanager/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const areamanager = await Admin.findOneAndDelete({ id })
        if (admin != null) {
            res.status(200).send(areamanager.getPublicProfile())
        }
        else {
            return res.status(400)
        }

    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.post("/areamanager/login", async (req, res) => {
    try {
        const areamanager = await AreaManager.findByMobie(req.body.mobile, req.body.password)
        if (areamanager == null) {
            return res.status(400)
        }
        const token = await areamanager.generateToken()
        res.status(200).send({ token: "areamanager:" + token, ...areamanager.getPublicProfile() })
    }
    catch (e) {
        return res.status(400).send(e.message)
    }
})




router.delete("/areamanager/me", auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(req.user)

    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


router.post('/areamanager/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send("DONE")

    }
    catch (e) {
        return res.status(400)
    }
})




module.exports = router