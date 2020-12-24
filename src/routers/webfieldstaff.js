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

router.get('/webfieldstaffall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const fieldstaff= await Fieldstaff.find({})  
        
            let data ={
                fieldstaff: []
            }
            for(var i = 0;i<fieldstaff.length;i++)
            {
                await fieldstaff[i].populate('mines').execPopulate()
                let t =  fieldstaff[i].toObject()
                
                if(fieldstaff[i].mines.length != 0)
                {
                    t.mine = fieldstaff[i].mines[0].name
                }
                else
                {
                    t.mine = "NOT ALLOTTED"
                }
               
                data.fieldstaff.push(t)
              
            }


           

            console.log(data.fieldstaff[0].mine)

            
            
           
           return res.render('fieldstaff_list',{data})
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

router.get('/webspecificfieldstaff/:mobile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mobile = req.params.mobile
            const fieldstaff = await Fieldstaff.findOne({mobile})
             if(fieldstaff!=null)
            {
                let data = {
                    fieldstaff: fieldstaff
                }
                return res.render('field_staff_profile',{data})
                  
            }
            else
            {
                console.log('fieldstaff member not found')
            }    
        }
        else
        {
            console.log('admin not found in single fieldstaff')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get("/fieldstaffrequest",async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const fieldstaff= await Fieldstaff.find({status: 1})  
            let data ={
                fieldstaff: fieldstaff
            }
           return res.render('fieldstaff_request',{data})
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

router.post("/fieldstaffrequest",async (req,res)=>{
    console.log(req.body)
})


module.exports =  router
