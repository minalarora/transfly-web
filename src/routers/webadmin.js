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
var upload = multer({})
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
                admin : admin.getPublicProfile()
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
                admin : admin.getPublicProfile()
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
            const allowedUpdates = ['firstname','lastname','mobile','email','password','status',
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

router.post('/addofficial/:type',upload.single('panimage'),async (req,res)=>{
    try
    {
        console.log(req.body)
    //const imageupdates = Object.keys(req.files)
    console.log(req.file.buffer)
    }
    catch(e)
    {
        console.log(e)
    }
    
})



module.exports = router