const express = require('express')
const router = new express.Router()
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')
const Vehicleowner = require('../models/vehicleowner') // maine kiya h
const AreaManager = require('../models/areamanager')
const FieldStaff = require('../models/fieldstaff')
const Fieldstaff = require('../models/fieldstaff')
const Notification = require('../models/notification')
const auth = require('../auth/auth')
const jwt = require('jsonwebtoken')
var multer = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    }
})

var transporterUpload = upload.fields([{ name: 'panimage', maxCount: 1 }, { name: 'bankimage', maxCount: 1 }, { name: 'tdsimage', maxCount: 1 }])



//for creating transport

router.post("/vehicleowner", async (req, res) => {
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
        const vehicleowner = new VehicleOwner(req.body)
        const token = await vehicleowner.generateToken()
        // vehicleowner.firebase = []
        // vehicleowner.firebase = vehicleowner.firebase.concat(req.body.firebase)
        let text = "Please complete your KYC under 'My Profile' section to start using this app."
       
        await vehicleowner.save()
        Notification.createNotification(vehicleowner.toJSON().id,text,0)
        res.status(200).send({ token: "vehicleowner:" + token, ...vehicleowner.toJSON() })
    }
    catch (e) {

        res.status(400).send(e.message)
    }
    /* const vehicleowner  = new Vehicleowner(req.body)
     vehicleowner.save().then((a)=>{
             res.status(201)
             res.send(a)
     }).catch((e)=>{
             res.status(400)
             res.send(e)
     })*/
})

router.get('/vehicleowner/me', auth, async (req, res) => {
    res.status(200).send({ token: "vehicleowner:" + req.token, ...req.user.toJSON(), profile: "https://transfly-ftr2t.ondigitalocean.app/vehicleowner/profile/" + req.user.mobile + "/image" })
})

router.get('/vehicleowner/profile/:mobile/image', async (req, res) => {
    try {
        const mobile = req.params.mobile
        const user = await VehicleOwner.findOne({ mobile })
        if (user) {

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

router.get('/vehicleowner/me/pending', auth, async (req, res) => {
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

        res.status(400).send(e.message)
    }
})

router.post("/vehicleowner/me", auth, transporterUpload, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        let imageupdates = []
        try {
            imageupdates = Object.keys(req.files)
        }
        catch (e) {

        }

        const allowedUpdates = ['name', 'mobile', 'email', 'password', 'status',
            'accountno', 'ifsc', 'bankname', 'bankimage', 'pan', 'panimage', 'tds', 'tdsimage', 'emergencycontact', 'firebase']
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
        return res.status(200).send("done")
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


router.get("/allvehicleowner", auth, async (req, res) => {
    try {
        const vehicleowners = await VehicleOwner.find({})
        res.status(200).send(vehicleowners)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /*  Vehicleowner.find({}).then((a)=>{
          res.status(200)
          res.send(a)
      }).catch((e)=>{
          res.status(400)
          res.send(e)
      })*/
})

// router.get("/vehicleowner/:mobile",auth,async (req,res)=>{
//     try
//     {
//         const mobile = req.params.mobile
//         const vehicleowner = await VehicleOwner.findOne({mobile})
//         if(vehicleowner!=null)
//         {
//              res.status(200).send(vehicleowner.getPublicProfile())   
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
//     Vehicleowner.findOne({mobile},(e, a)=>{
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

router.post("/vehicleowner/me", auth, transporterUpload, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const imageupdates = Object.keys(req.files)
        const allowedUpdates = ['name', 'mobile', 'email', 'password', 'status',
            'accountno', 'ifsc', 'bankname', 'bankimage', 'pan', 'panimage', 'tds', 'tdsimage', 'emergencycontact', 'firebase']
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




router.patch("/vehicleowner/:id", auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'mobile', 'email', 'password', 'status',
            'accountno', 'ifsc', 'bankname', 'city', 'pan', 'tds', 'firebase']
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation) {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /*const vehicleowner = await vehicleOwner.findOneAndUpdate({mobile},req.body,{
            new : true,
            runValidators: true
        })*/
        const vehicleowner = await VehicleOwner.findOne({ id })
        if (vehicleowner != null) {
            updates.forEach((update) => {
                vehicleowner[update] = req.body[update]
            })
            await vehicleowner.save()
            res.status(200).send(vehicleowner.getPublicProfile())
        }
        else {
            return res.status(400)
        }
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete("/vehicleowner/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const vehicleowner = await VehicleOwner.findOneAndDelete({ id })
        if (vehicleowner != null) {
            res.status(200).send(vehicleowner.getPublicProfile())
        }
        else {
            return res.status(400)
        }

    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.post("/vehicleowner/login", async (req, res) => {
    try {
        const vehicleowner = await VehicleOwner.findByMobie(req.body.mobile, req.body.password)
        if (vehicleowner == null) {
            return res.status(400)
        }
        const token = await vehicleowner.generateToken()
        res.status(200).send({ token: "vehicleowner:" + token, ...vehicleowner.getPublicProfile() })
    }
    catch (e) {
        return res.status(400)
    }
})





router.delete("/vehicleowner/me", auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send(req.user)

    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


router.post('/vehicleowner/logout', auth, async (req, res) => {
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