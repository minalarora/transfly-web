const express = require('express')
const router  = new express.Router()
const Admin = require('../models/admin')
const AreaManager = require('../models/areamanager')
const Booking = require('../models/booking')
const Fieldstaff = require('../models/fieldstaff')
const Finance = require('../models/finance')
const Invoice  = require('../models/invoice')
const Mine =  require('../models/mine')
const Ticket =  require('../models/ticket')
const Transporter = require('../models/transporter')
const Vehicle = require('../models/vehicle')
const VehicleOwner = require("../models/vehicleowner")
const Resale  =  require('../models/resale')
const jwt= require('jsonwebtoken')
const auth = require("../auth/auth")
var cookieParser = require('cookie-parser')
const vehicle = require('../models/vehicle')
var multer  = require('multer')
var sharp = require('sharp')
const { update } = require('../models/admin')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return cb(new Error('only image'))
        }
            return cb(undefined, true);  

    }
})
var resaleupload = upload.fields([{ name: 'vehicleimage', maxCount: 4 }])

 
router.use(cookieParser())

router.get("/resale",async (req,res)=>{
    res.render('resale')
})


router.get("/add_resale_vehicle",async (req,res)=>{
    res.render('add_resale_vehicle')
})

router.post("/add_resale_vehicle",resaleupload,async (req,res)=>{
    try
    {
        const obj  = {}
        const objkeys = Object.keys(req.body)
       
        objkeys.forEach((update) =>{
            if(req.body[update] == update)
            {
                obj[update] = true
            }
            else
            {
                obj[update] = false
            }
        })
        const imageupdates = Object.keys(req.files)
        var vimg = []
        imageupdates.forEach((update)=>{
            for(var i = 0; i< req.files[update].length;i++ )
            {
                vimg[i] =  req.files[update][i].buffer;
            }
         })

         const allowedUpdates = ['vehiclename','company','year','type','price']
         allowedUpdates.forEach((update) =>{
             obj[update] = req.body[update]
         })
         obj["vehicleimage"] = vimg
         const resale = new Resale(obj)
         await resale.save()
         res.redirect('/add_resale_vehicle')

    }
    catch(e)
    {
        res.redirect('/add_resale_vehicle')
    }

},function (req, res, next) {

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
})

router.get("/webspecificresale/:id",async (req,res)=>{
    res.render('specific_resale_vehicle')
})

module.exports =  router
