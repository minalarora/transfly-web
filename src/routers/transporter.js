const express = require('express')
const router = new express.Router()
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')
const Vehicleowner = require('../models/vehicleowner') // maine kiya h
const AreaManager = require('../models/areamanager')
const FieldStaff = require('../models/fieldstaff')
const Fieldstaff = require('../models/fieldstaff')
const auth = require('../auth/auth')
const jwt = require("jsonwebtoken")
var multer = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    }
})
var transporterUpload = upload.fields([{ name: 'mininglicenseimage', maxCount: 1 }, { name: 'staimage', maxCount: 1 }, { name: 'gstimage', maxCount: 1 }, { name: 'panimage', maxCount: 1 }, { name: 'aadhaarimage', maxCount: 1 }])


router.post("/transporter", async (req, res) => {
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
        const transporter = new Transporter(req.body)
        const token = await transporter.generateToken()
        await transporter.save()
        res.status(200).send({ token: "transporter:" + token, ...transporter.toJSON() })
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /*  const transporter  = new Transporter(req.body)
      transporter.save().then((a)=>{
              res.status(201)
              res.send(a)
      }).catch((e)=>{
              res.status(400)
              res.send(e)
      })*/
})

router.get('/transporter/me', auth, async (req, res) => {
    res.status(200).send({ token: "transporter:" + req.token, ...req.user.toJSON(), profile: "https://transfly-ftr2t.ondigitalocean.app/transporter/profile/" + req.user.mobile + "/image" })
})

router.get('/transporter/profile/:mobile/image', async (req, res) => {
    try {
        const mobile = req.params.mobile
        const user = await Transporter.findOne({ mobile })
        if (user != null) {
            res.set('Content-Type', 'image/png')
            res.send(user.profile)
        }
        else {
            res.send(null)
        }
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/transporter/me/pending', auth, async (req, res) => {
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
        // console.log(e)
        res.status(400).send(e.message)
    }
})



router.get("/alltransporter", auth, async (req, res) => {
    try {
        const transporters = await Transporter.find({ status: 2 })
        res.status(200).send(transporters)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /* Transporter.find({}).then((a)=>{
         res.status(200)
         res.send(a)
     }).catch((e)=>{
         res.status(400)
         res.send(e)
     })*/
})

// router.get("/transporter/:mobile",auth,async (req,res)=>{
//     try
//     {
//         const mobile = req.params.mobile
//         const transporter = await Transporter.findOne({mobile})
//         if(transporter!=null)
//         {
//              res.status(200).send(transporter.getPublicProfile())   
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
//   /*  const mobile = req.params.mobile
//     Transporter.findOne({mobile},(e, a)=>{
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
router.post("/transporter/me", auth, transporterUpload, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        let imageupdates = []
        try {
            imageupdates = Object.keys(req.files)
        }
        catch (e) {

        }
        const allowedUpdates = ['name', 'mobile', 'email', 'password', 'status',
            'gst', 'sta', 'pan', 'aadhaar', 'mininglicense']
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
        return res.status(200);
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.patch("/transporter/:id", auth, transporterUpload, async (req, res) => {
    try {
        // console.log(Object.keys(req.files))
        const updates = Object.keys(req.body)
        const imageupdates = Object.keys(req.files)
        const allowedUpdates = ['name', 'mobile', 'email', 'password', 'status',
            'gst', 'gstimage', 'sta', 'staimage', 'pan', 'panimage', 'aadhaar', 'aadhaarimage', 'mininglicense', 'mininglicenseimage']
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation) {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /*const transporter = await Transporter.findOneAndUpdate({mobile},req.body,{
            new : true,
            runValidators: true
        })*/
        const transporter = await Transporter.findOne({ id })
        if (transporter != null) {
            updates.forEach((update) => {
                transporter[update] = req.body[update]
            })

            console.log('reaching')
            imageupdates.forEach((update) => {
                transporter[update] = req.files[update][0].buffer
            })
            //req.files['avatar'][0] -> File
            //  req.files['gallery'] -> Array

            await transporter.save()
            res.status(200).send(transporter.getPublicProfile())
        }
        else {
            return res.status(400)
        }
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete("/transporter/:id", auth, async (req, res) => {
    try {
        const mobile = req.params.mobile
        const transporter = await Transporter.findOneAndDelete({ mobile })
        if (transporter != null) {
            res.status(200).send(transporter.getPublicProfile())
        }
        else {
            return res.status(400)
        }

    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


router.post("/transporter/login", async (req, res) => {
    try {
        const transporter = await Transporter.findByMobie(req.body.mobile, req.body.password)
        if (transporter == null) {
            return res.status(400)
        }
        const token = await transporter.generateToken()
        res.status(200).send({ token: "transporter:" + token, ...transporter.getPublicProfile() })
    }
    catch (e) {
        return res.status(400)
    }
})




router.delete("/transporter/me", auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(req.user)

    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/transporter/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send()

    }
    catch (e) {
        return res.status(400)
    }
})


module.exports = router