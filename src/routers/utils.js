const jwt=require("jsonwebtoken")
const Admin = require("../models/admin")
const AreaManager = require("../models/areamanager")
const  Fieldstaff = require("../models/fieldstaff")
const Finance = require('../models/finance')
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')
const express = require('express')
const router  = new express.Router()

router.get("/me/pending",async (req,res)=>{
    try
    {
       var names=[];
       for(key in req.user.toObject())
       {
           if(req.user[key] == null)
            {
                names.push(key.replace("image",""))
            }
       }
       return res.status(200).send(names)
    }
    catch(e)
    {
        console.log(e)
        res.status(400).send(e.message)
    }
})


module.exports = router