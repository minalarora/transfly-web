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

router.get('/webtransporterall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const transporter= await Transporter.find({status:2})  
        
            let data ={
                transporter: []
            }
            for(var i = 0;i<transporter.length;i++)
            {
                await transporter[i].populate('mines').execPopulate()
                let t =  transporter[i].toObject()
                t.mine = transporter[i].mines
                data.transporter.push(t)
              
            }


            
            
           
           return res.render('transporter_list',{data})
        }
        else
        {
            console.log('admin not found in all transporter')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webspecifictransporter/:mobile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mobile = req.params.mobile
            const transporter = await Transporter.findOne({mobile})
             if(transporter!=null)
            {
                // let data = {
                //     transporter: transporter
                // }
                await transporter.populate('mines').execPopulate()
                let t =  transporter.toObject()
                t.mines = transporter.mines
            let data ={
                transporter: {...t }
                }


                return res.render('transporter_profile',{data})
                  
            }
            else
            {
                console.log('transporter member not found')
            }    
        }
        else
        {
            console.log('admin not found in single transporter')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get("/transporterrequest",async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const transporter= await Transporter.find({status: 1})  
            let data ={
                transporter: transporter
            }
           return res.render('transporter_request',{data})
        }
        else
        {
            console.log('admin not found in all finance')
        }
    }
    catch(e)
    {
        console.log(e)
    }
  
})


router.get("/transporter_request_action/:mobile",async (req,res)=>{
    try
    {
        const mobile =  req.params.mobile
     const transporter = await Transporter.findOne({mobile})
     if(transporter)
     {
         // const obj  = {...req.body}
        
 
         transporter["status"] = 2
         await transporter.save()
         res.redirect("/transporterrequest")
         
     }
    }
    catch(e)
    {
        res.redirect("/transporterrequest")
    }
 })

router.post("/transporter_request_action/:mobile",async (req,res)=>{
   try
   {
       const mobile =  req.params.mobile
    const transporter = await Transporter.findOne({mobile})
    if(transporter)
    {
        // const obj  = {...req.body}
        const updates = Object.keys(req.body)
       
        updates.forEach((update)=>{
            transporter[update] = "NOT AVAILABLE",
            transporter[req.body[update]] = undefined
        })

        transporter["status"] = 0
        await transporter.save()
        res.redirect("/transporterrequest")
    }
   }
   catch(e)
   {
    res.redirect("/transporterrequest")
   }
})


router.get('/gettransporterdata/:mobile',async (req,res)=>{
    const mobile = req.params.mobile
    const transporter = await Transporter.findOne({mobile})
    const object = transporter.toObject()
    
    delete object.__v
    delete object.tokens
    delete object._id
   
    return res.send(object)



})






// router.get('/gettransporterimage/:mobile',async (req,res)=>{
//     const mobile = req.params.mobile
//     const transporter = await Transporter.findOne({mobile})
//      res.set('Content-Type','image/png')
//      res.send(transporter.staimage)
// })


// router.post('/transporter_request_action/:mobile',transporterUpload,async (req,res)=>
// {
//     console.log(req.body)
//     console.log("sds" + Object.keys(req.files))
// })


module.exports = router