const jwt = require("jsonwebtoken")
const auth = require('../auth/auth')
const Admin = require("../models/admin")
const AreaManager = require("../models/areamanager")
const Fieldstaff = require("../models/fieldstaff")
const Finance = require('../models/finance')
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')
const Vehicleowner = require('../models/vehicleowner') // maine kiya h
const express = require('express')
const message = require('../values')
const router = new express.Router()
const path = require('path')

const db = require('../db/dbfile')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 10)
const mongoose = require("mongoose")
var Schema = mongoose.Schema;



var multer = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        
    },
    fileFilter: function (req, file, cb) {

        return cb(undefined, true);

    }
})

// const storage = multer.diskStorage({
//     destination: function(req, file, cb)
//     {
//        cb(null, path.join(__dirname, './','uploads/'))
//       //  cb(null,__dirname)
//     },
//     filename: function(req,file,cb)
//     {
//         cb(null,"SDS" +file.originalname)
//     }
// })

// const upload = multer({storage: storage})




var allUpload = upload.fields([{ name: 'panimage', maxCount: 1 }, { name: 'bankimage', maxCount: 1 }, { name: 'tdsimage', maxCount: 1 },
{ name: 'aadhaarimage', maxCount: 1 }, { name: 'mininglicenseimage', maxCount: 1 }, { name: 'gstimage', maxCount: 1 }, { name: 'staimage', maxCount: 1 }, { name: 'profile', maxCount: 1 }])


router.post("/who", async (req, res) => {
    try {
        let user = await VehicleOwner.findOne({ mobile: req.body.mobile })
        if (user) {
            if (user.password == req.body.password) {
                const token = await user.generateToken()
                await user.save()
                return res.status(200).send({
                    token: "vehicleowner:" + token
                })
            }
            else {
                return res.status(402).send("PASSWORD MISMATCH")
            }
        }
        user = await VehicleOwner.findOne({ email: req.body.mobile })
        if (user) {
            if (user.password == req.body.password) {
                const token = await user.generateToken()
                await user.save()
                return res.status(200).send({
                    token: "vehicleowner:" + token
                })
            }
            else {
                return res.status(402).send("PASSWORD MISMATCH")
            }
        }

        user = await Fieldstaff.findOne({ mobile: req.body.mobile })
        if (user) {
            if (user.password == req.body.password) {
                const token = await user.generateToken()
                await user.save()
                return res.status(200).send({
                    token: "fieldstaff:" + token
                })
            }
            else {
                return res.status(402).send("PASSWORD MISMATCH")
            }
        }
        user = await Fieldstaff.findOne({ email: req.body.mobile })
        if (user) {
            if (user.password == req.body.password) {
                const token = await user.generateToken()
                await user.save()
                return res.status(200).send({
                    token: "fieldstaff:" + token
                })
            }
            else {
                return res.status(402).send("PASSWORD MISMATCH")
            }
        }
        user = await Transporter.findOne({ mobile: req.body.mobile })
        if (user) {
            if (user.password == req.body.password) {
                const token = await user.generateToken()
                await user.save()
                return res.status(200).send({
                    token: "transporter:" + token
                })
            }
            else {
                return res.status(402).send("PASSWORD MISMATCH")
            }
        }
        user = await Transporter.findOne({ email: req.body.mobile })
        if (user) {
            if (user.password == req.body.password) {
                const token = await user.generateToken()
                await user.save()
                return res.status(200).send({
                    token: "transporter:" + token
                })
            }
            else {
                return res.status(402).send("PASSWORD MISMATCH")
            }
        }
        user = await AreaManager.findOne({ mobile: req.body.mobile })
        if (user) {
            if (user.password == req.body.password) {
                const token = await user.generateToken()
                await user.save()
                return res.status(200).send({
                    token: "areamanager:" + token
                })
            }
            else {
                return res.status(402).send("PASSWORD MISMATCH")
            }
        }
        user = await AreaManager.findOne({ email: req.body.mobile })
        if (user) {
            if (user.password == req.body.password) {
                const token = await user.generateToken()
                await user.save()
                return res.status(200).send({
                    token: "areamanager:" + token
                })
            }
            else {
                return res.status(402).send("PASSWORD MISMATCH")
            }
        }
        return res.status(400).send("User not found!")


    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.get("/me/pending", auth, async (req, res) => {
    try {
        var names = [];
        var update = ["tdsimage", "panimage", "bankimage", "gstimage", "staimage", "mininglicenseimage", "aadhaarimage"]

        for (key in req.user.toObject()) {

            if (req.user[key] == null && update.includes(key)) {

                names.push(key.replace("image", ""))
            }
        }
        return res.status(200).send(names)
    }
    catch (e) {

        res.status(400).send(e.message)
    }
})

router.post("/me/delete", auth, async (req, res) => {
    try {
        let token = req.body.firebase
        /**
         *  req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!=req.token
        })
        await req.user.save()
         */
        req.user.firebase = req.user.firebase.filter((t) => {
            return t != token
        })
        await req.user.save()
        return res.status(200).send("DONE")

    }
    catch (e) {
        return res.status(400).send(e)
    }
})



router.post("/me/update", auth, allUpload, async (req, res) => {

    try {
        const updates = Object.keys(req.body)
        ////(req.body)
        let imageupdates
        try {
            imageupdates = Object.keys(req.files)
        }
        catch (e) {
            imageupdates = []
        }
       //(imageupdates)
        const allowedUpdates = ['name', 'mobile', 'email', 'password', 'status',
            'accountno', 'ifsc', 'bankname', 'pan', 'tds', 'emergencycontact', 'gst', 'sta', 'mininglicense', 'aadhaar',
            'ename', 'erelation', 'emobile', 'firebase', 'bankpersonname',]

        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation && (updates.length > 0)) {
            return res.status(400).send("Invalid")
        }

        updates.forEach((update) => {
            if (update == "firebase") {
                if (req.user.firebase == null || !(Array.isArray(req.user.firebase))) {
                    req.user.firebase = []
                }
                //  areamanager.tokens  = areamanager.tokens.concat({token})
                if (req.user.firebase.includes(req.body.firebase)) {

                }
                else {
                    req.user.firebase = req.user.firebase.concat(req.body.firebase)
                }
            }
            else {
                req.user[update] = req.body[update]
            }

        })
        await req.user.save()

        if (imageupdates.length > 0) {

           //("if")
            imageupdates.forEach((update) => {
                sharp(req.files[update][0].buffer).png().toBuffer().then((buffer) => {

                    // req.user[update] = buffer
                    // req.user.save().then((user) => {

                    //     return res.status(200).send("Done")
                    // }).catch((err) => {
                    //     return res.status(400).send(err.message)
                    // })

                   
                    let name = nanoid()

                    var c = db.imagedb.model(name, 
                      new Schema({ image: Buffer}), 
                      name);

                      var obj = new c({image: buffer})
                       obj.save().then(()=>{
                        req.user[update] = name
                        req.user.save()
                        return res.status(200).send("Done")

                       }).catch((e)=>{
                        return res.status(400).send(err.message)
                       })

                      

                }).catch((error) => {

                    req.user[update] = null
                    return res.status(400).send('Image Uploading Failed')
                })

            })
            // return res.send(req.file)
        }
        else {

            res.status(200).send("Done")
        }



    }
    catch (e) {

        res.status(400).send(e.message)
    }
}, (err, req, res, next) => {
    return res.status(400).send("middleware error" + err)
})


router.post("/changepassword", async (req, res) => {
    try {
        let password = req.body["password"]
        let user = await VehicleOwner.findOneAndUpdate({ mobile: req.body.mobile }, { password })
        if (user) {
            await user.save()
            return res.status(200).send("DONE")
        }
        user = await Fieldstaff.findOneAndUpdate({ mobile: req.body.mobile }, { password })
        if (user) {
            await user.save()
            return res.status(200).send("DONE")
        }
        user = await AreaManager.findOneAndUpdate({ mobile: req.body.mobile }, { password })
        if (user) {
            await user.save()
            return res.status(200).send("DONE")
        }
        user = await Transporter.findOneAndUpdate({ mobile: req.body.mobile }, { password })
        if (user) {
            await user.save()
            return res.status(200).send("DONE")
        }

        return res.status(400).send("User not found!")

    }
    catch (e) {
        return res.status(400).send(e.message)
    }
})


router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        let token = req.body.firebase
        /**
         *  req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!=req.token
        })
        await req.user.save()
         */
        req.user.firebase = req.user.firebase.filter((t) => {
            return t != token
        })
        await req.user.save()
        res.status(200).send()

    }
    catch (e) {
        return res.status(400)
    }
})

router.get('/faq',async (req,res)=>{
    return res.render('webview_faq', {  })
})

router.get('/invitation',async (req,res)=>{
    let mobile= req.query.mobile
    if(mobile)
    {
        message.sendMessageDownload(mobile)
    }
    return res.redirect("https://transfly.co.in/")
})





module.exports = router