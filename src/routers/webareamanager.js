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
 
router.use(cookieParser())


router.get('/webareamanagerall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const areamanager= await AreaManager.find({})  
        
            let data ={
                areamanager: []
            }
            for(var i = 0;i<areamanager.length;i++)
            {
                await areamanager[i].populate('mines').execPopulate()
                let t =  areamanager[i].toObject()
                t.mine = areamanager[i].mines
                data.areamanager.push(t)
              
            }

           

            console.log(data.areamanager[0].mine)

            
            
           
           return res.render('area_manager_list',{data})
        }
        else
        {
            console.log('admin not found in all area manager')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webspecificareamanager/:mobile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mobile = req.params.mobile
            const areamanager = await AreaManager.findOne({mobile})
             if(areamanager!=null)
            {
                await areamanager.populate('mines').execPopulate()
                let t =areamanager.toObject()
                t.mines = areamanager.mines


                let data = {
                    areamanager: t
                }
                console.log(data)
            return res.render('area_manager_profile',{data})
                  
            }
            else
            {
                console.log('areamanager member not found')
            }    
        }
        else
        {
            console.log('admin not found in single areamanager')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})


router.get("/areamanagerrequest",async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const areamanager= await AreaManager.find({status: 1})  
            let data ={
                areamanager: areamanager
            }
           return res.render('areamanager_request',{data})
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

router.post("/areamanagerrequest",async (req,res)=>{
    
    console.log(req.body)
})



module.exports =  router
