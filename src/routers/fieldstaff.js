const express = require('express')
const router = new express.Router()
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')
const Vehicleowner = require('../models/vehicleowner') // maine kiya h
const AreaManager = require('../models/areamanager')
const FieldStaff = require('../models/fieldstaff')
const Fieldstaff = require('../models/fieldstaff')
const auth = require('../auth/auth')
const jwt = require('jsonwebtoken')
var multer = require('multer')
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



router.post("/fieldstaff", async (req, res) => {
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
        const fieldstaff = new FieldStaff(req.body)
        const token = await fieldstaff.generateToken()
        await fieldstaff.save()
        res.status(200).send({ token: "fieldstaff:" + token, ...fieldstaff.toJSON() })
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /*const fieldstaff  = new Fieldstaff(req.body)
    fieldstaff.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get('/fieldstaff/me', auth, async (req, res) => {
    res.status(200).send({ token: "fieldstaff:" + req.token, ...req.user.toJSON(), profile: "https://transflyhome.club/fieldstaff/profile/" + req.user.mobile + "/image" })


})

router.get('/fieldstaff/profile/:mobile/image', async (req, res) => {
    try {
        const mobile = req.params.mobile
        const user = await FieldStaff.findOne({ mobile })
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

router.get('/fieldstaff/me/pending', auth, async (req, res) => {
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

router.get("/allfieldstaff", auth, async (req, res) => {
    try {
        const fieldstaffs = await FieldStaff.find({})
        res.status(200).send(fieldstaffs)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /*Fieldstaff.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

// router.get("/fieldstaff/:mobile",auth,async (req,res)=>{
//     try
//     {
//         const mobile = req.params.mobile
//         const fieldstaff = await Fieldstaff.findOne({mobile})
//         if(fieldstaff!=null)
//         {
//              res.status(200).send(fieldstaff.getPublicProfile())   
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
//     Fieldstaff.findOne({mobile},(e, a)=>{
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

router.post("/fieldstaff/me", auth, transporterUpload, async (req, res) => {
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
        res.status(200).send(req.user.getPublicProfile())
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


router.patch("/fieldstaff/:id", auth, async (req, res) => {
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
        /*const fieldstaff = await Fieldstaff.findOneAndUpdate({mobile},req.body,{
            new : true,
            runValidators: true
        })*/
        const fieldstaff = await FieldStaff.findOne({ id })
        if (fieldstaff != null) {
            updates.forEach((update) => {
                fieldstaff[update] = req.body[update]
            })
            await fieldstaff.save()
            res.status(200).send(fieldstaff.getPublicProfile())
        }
        else {

            return res.status(400)
        }
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete("/fieldstaff/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const fieldstaff = await FieldStaff.findOneAndDelete({ id })
        if (fieldstaff != null) {
            res.status(200).send(fieldstaff.getPublicProfile())
        }
        else {
            return res.status(400)
        }

    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.post("/fieldstaff/login", async (req, res) => {
    try {
        const fieldstaff = await FieldStaff.findByMobie(req.body.mobile, req.body.password)
        if (fieldstaff == null) {
            return res.status(400)
        }
        const token = await fieldstaff.generateToken()
        res.status(200).send({ token: "fieldstaff:" + token, ...fieldstaff.getPublicProfile() })
    }
    catch (e) {
        return res.status(400)
    }
})




router.delete("/admin/me", auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(req.user)

    }
    catch (e) {
        res.status(400).send(e)
    }
})


router.post('/fieldstaff/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send()

    }
    catch (e) {
        res.status(400)
    }
})

module.exports = router