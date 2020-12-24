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


router.get("/rewardreferralrequest",async (req,res)=>{
    res.render('areamanager_request')
})

router.post("/rewardreferralrequest/:type",async (req,res)=>{
    console.log(req.body)
    console.log(req.params.type)

})

module.exports =  router