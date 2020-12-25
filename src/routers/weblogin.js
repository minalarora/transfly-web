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

router.get('/',async (req,res)=>{
    let data ={}
    return res.render('login',data)
})

router.post('/',async (req,res)=>{
    try
    {
        if(req.body.role == "admin")
        {
        const admin  = await Admin.findByMobile(req.body.mobile,req.body.password)
        if(admin == null)
        {
          console.log('admin not found')  
        }
        else
        {
            let token = await admin.generateToken()
            return res.status(200).cookie('Authorization',token).redirect('/webadmin')
        }
    }
    else
    {
        const finance  = await Finance.findByMobile(req.body.mobile,req.body.password)
        if(finance == null)
        {
          console.log('finance not found')  
        }
        else
        {
            let token = await finance.generateToken()
            return res.status(200).cookie('Authorization',token).redirect('/webfinance')
        }
    }
    }
    catch(e)
    {
        //error
        console.log(e)
    }
})

module.exports = router