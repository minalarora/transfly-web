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

router.get('/webfinance', async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
            var data = {
                finance : finance.getWebProfile()
            }
            console.log(data)
           return res.render("finance_admin_profile",{data})
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


router.get('/updatefinanceprofile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
            var data = {
                finance : finance.getWebProfile()
            }
            console.log(data)
            return res.render("finance_profile_update",{data})
        }
        else
        {

        }
    }
    catch(e)
    {
        
    }
})


router.post('/updatefinanceprofile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
            const updates = Object.keys(req.body)
            const allowedUpdates = ['accountno','ifsc','bankname']
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
                finance[update] = req.body[update] 
             })

             await finance.save()
             return res.redirect('/updatefinanceprofile')
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

router.get('/webfinancelogout',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
            finance.tokens = finance.tokens.filter((t)=>{
                return t.token != token
            })
            await finance.save()
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



//////////for admin
router.get('/webfinanceall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const finance= await Finance.find({})  
            let data ={
                finance: finance
            }
           return res.render('finance_official_list',{data})
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

router.get('/webspecificfinance/:mobile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mobile = req.params.mobile
            const finance = await Finance.findOne({mobile})
             if(finance!=null)
            {
                let data = {
                    finance: finance
                }
                return res.render('finance_official_profile',{data})
                  
            }
            else
            {
                console.log('finance member not found')
            }    
        }
        else
        {
            console.log('admin not found in single finance')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})


module.exports = router