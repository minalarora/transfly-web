const jwt=require("jsonwebtoken")
const auth = require('../auth/auth')
const Admin = require("../models/admin")
const AreaManager = require("../models/areamanager")
const  Fieldstaff = require("../models/fieldstaff")
const Finance = require('../models/finance')
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')
const express = require('express')
const router  = new express.Router()

var multer  = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {

            return cb(undefined, true);  

    }
})

var allUpload = upload.fields([{ name: 'panimage', maxCount: 1 }, { name: 'bankimage', maxCount: 1 },{ name: 'tdsimage', maxCount: 1 },
{name: 'aadhaarimage', maxCount: 1 },{name: 'mininglicenseimage', maxCount: 1 },{name: 'gstimage', maxCount: 1 },{name: 'staimage', maxCount: 1 }])



router.get("/me/pending",auth,async (req,res)=>{
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

router.post("/me/update",auth,allUpload,async (req,res)=>{

    try
    {
        const updates = Object.keys(req.body)
        let imageupdates
        try
        {
             imageupdates = Object.keys(req.files)
        }
        catch(e)
        {

        }
        
        const allowedUpdates = ['name','mobile','email','password','status',
        'accountno','ifsc','bankname','pan','tds','emergencycontact','gst','sta','mininglicense','aadhaar',
             'ename','erelation','emobile']

        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation && (updates.length > 0))
        {
            return res.status(400).send("Invalid")
        }
            
            updates.forEach((update)=>{
                req.user[update] = req.body[update] 
             })

             imageupdates.forEach((update)=>{
                 sharp(req.files[update][0].buffer).resize(200).png().toBuffer().then((buffer)=>{
                    req.user[update] = buffer
                }).catch((error)=>{
                    req.user[update] = null
                })
                
            })
            
             await req.user.save()
            return  res.status(200).send("done")
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
},(err,req,res,next)=>{
    return res.status(400).send("middleware error")
})


module.exports = router