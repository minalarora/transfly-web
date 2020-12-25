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

const jwt= require('jsonwebtoken')
const auth = require("../auth/auth")
var cookieParser = require('cookie-parser')
const vehicle = require('../models/vehicle')
var multer  = require('multer')
var sharp = require('sharp')
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
var transporterUpload = upload.fields([{ name: 'panimage', maxCount: 1 }, { name: 'aadhaarimage', maxCount: 1 }])
 
 
router.use(cookieParser())

router.get('/webadmin', async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            var data = {
                admin : admin
            }
            console.log(data)
           return res.render("app_admin_profile",{data})
        }
        else
        {
            console.log('admin not found')
        }  

    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webadminedit',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            var data = {
                admin : admin
            }
           return res.render("app_admin_profile_update",{data})
        }
        else
        {
            console.log('admin not found')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})




router.post('/webadminedit',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const updates = Object.keys(req.body)
            const allowedUpdates = ['name','mobile','email','password','status',
            'accountno','ifsc','bankname','city','pan','aadhaar','ename','erelation','emobile']
            const isValidOperation = updates.every((update)=>{
                                       return allowedUpdates.includes(update)
                                                            })
        if(!isValidOperation)
        {
            console.log('invalid operation')
        }
        else
        {
            updates.forEach((update)=>{
                admin[update] = req.body[update] 
             })

             await admin.save()
             return res.redirect('/webadmin')
        }
            
           
        }
        else
        {
            console.log('admin not found')
        }
       
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webadminlogout',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            admin.tokens = admin.tokens.filter((t)=>{
                return t.token != token
            })
            await admin.save()
            res.redirect('/')
        }
        else
        {
            //admin not found
        }
    }
    catch(e)
    {
        console.log(e)
    }
})


router.get("/addofficial",async (req,res)=>{
    res.render('add_official')
})

router.post('/addofficial/:type',transporterUpload,async (req,res)=>{
    try
    {


        if(req.params.type == "admin")
        {
            const obj  = {...req.body}
            const imageupdates = Object.keys(req.files)
            imageupdates.forEach((update)=>{
                obj[update] = req.files[update][0].buffer
                
            })
    
            const admin = new Admin(obj)
            await admin.save()
        }
        else
        {
            const obj  = {...req.body}
            const imageupdates = Object.keys(req.files)
            imageupdates.forEach((update)=>{
                obj[update] = req.files[update][0].buffer
                
            })
    
            const finance = new Finance(obj)
            await finance.save()
        }

        res.redirect('/addofficial')
      
    }
    catch(e)
    {
        console.log(e)
    }
    
},function (req, res, next) {

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
})

router.get('/logout',async (req,res)=>{

    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            admin.tokens = admin.tokens.filter((t)=>{
                return t.token != token
            })
            await admin.save()
            res.redirect('/')
        }
    }
    catch(e)
    {

    }
   

})

module.exports = router