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
                let name = nanoid()

                var c = db.imagedb.model(name, 
                  new Schema({ image: Buffer}), 
                  name);
         
                  var ob = new c({image: req.file.buffer})
                   await ob.save()

                obj.image = name
            }


            const r = new Reward(obj)
            await r.save()
        }
        else if (req.params.type == "referral") {
            const obj = { ...req.body }
            if (req.file) {
                let name = nanoid()

                var c = db.imagedb.model(name, 
                  new Schema({ image: Buffer}), 
                  name);
         
                  var ob = new c({image: req.file.buffer})
                   await ob.save()

                obj.image = name
            }

            const r = new Referral(obj)
            await r.save()
        }
        else {
            let name = nanoid()

            var c = db.imagedb.model(name, 
              new Schema({ image: Buffer}), 
              name);
     
              var ob = new c({image: req.file.buffer})
               await ob.save()

            const obj = new Banner({ image: name, bannertype: req.body.bannertype })
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
           //('df')
            res.send("Invalid Image Format")
        }
        else {
           //('f')

            res.send("Success, Image uploaded!")
        }
    })
}
)

module.exports = router