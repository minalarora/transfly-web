const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')
const AreaManager = require('../models/areamanager')
const Booking = require('../models/booking')
const Fieldstaff = require('../models/fieldstaff')
const Finance = require('../models/finance')
const Invoice = require('../models/invoice')
const Mine = require('../models/mine')
const Ticket = require('../models/ticket')
const Transporter = require('../models/transporter')
const Vehicle = require('../models/vehicle')
const VehicleOwner = require("../models/vehicleowner")
const Reward = require('../models/reward')
const Referral = require('../models/referral')
const Banner = require('../models/banner')

const jwt = require('jsonwebtoken')
const auth = require("../auth/auth")
var cookieParser = require('cookie-parser')
const vehicle = require('../models/vehicle')

var multer = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('only image'))
        }
        return cb(undefined, true);

    }
})





router.use(cookieParser())


router.get("/reward_referral", async (req, res) => {
    res.render('reward_referral')
})

router.post("/reward_referral/:type", upload.single('image'), async (req, res) => {
    try {


        if (req.params.type == "reward") {
            const obj = { ...req.body }
            if (req.file) {
                obj.image = req.file.buffer
            }


            const r = new Reward(obj)
            await r.save()
        }
        else if (req.params.type == "referral") {
            const obj = { ...req.body }
            if (req.file) {
                obj.image = req.file.buffer
            }

            const r = new Referral(obj)
            await r.save()
        }
        else {
            const obj = new Banner({ image: req.file.buffer, bannertype: req.body.bannertype })
            await obj.save()
        }

        res.redirect('/reward_referral')

    }
    catch (e) {
        res.redirect('/reward_referral')
    }

}, function (req, res, next) {

    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req, res, function (err) {

        if (err) {

            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            console.log('df')
            res.send("Invalid Image Format")
        }
        else {
            console.log('f')

            res.send("Success, Image uploaded!")
        }
    })
}
)

module.exports = router