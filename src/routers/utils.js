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


router.post("/who",async (req,res)=>{
    try
    {
        let user  =  await VehicleOwner.findOne({mobile: req.body.mobile, password: req.body.password})
        if(user)
        {
            const token = await user.generateToken()
            await user.save()
            return res.status(200).send({
                token: "vehicleowner:" + token
            })
        }
         user  =  await Fieldstaff.findOne({mobile: req.body.mobile, password: req.body.password})
        if(user)
        {
            const token = await user.generateToken()
            await user.save()
            return res.status(200).send({
                token: "fieldstaff:" + token
            })
        }
         user  =  await AreaManager.findOne({mobile: req.body.mobile, password: req.body.password})
        if(user)
        {
            const token = await user.generateToken()
            await user.save()
            return res.status(200).send({
                token: "areamanager:" + token
            })
        }
        user  =  await Transporter.findOne({mobile: req.body.mobile, password: req.body.password})
        if(user)
        {
            const token = await user.generateToken()
            await user.save()
            return res.status(200).send({
                token: "transporter:" + token
            })
        }
        return res.status(400).send("User not found!")
        

    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

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
        
        res.status(400).send(e.message)
    }
})

router.post("/me/update",auth,allUpload,async (req,res)=>{

    try
    {
        const updates = Object.keys(req.body)
        console.log(req.body)
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
             await req.user.save()

             if(imageupdates)
             {
             image6updates.forEach((update)=>{
                 sharp(req.files[update][0].buffer).resize(200).png().toBuffer().then((buffer)=>{
                     
                    req.user[update] = buffer
                    req.user.save().then((user)=>{

                        return  res.status(200).send("Done")
                    }).catch((err)=>{
                        return  res.status(400).send(err.message)
                    })
                }).catch((error)=>{
                    console.log(error)
                    req.user[update] = null
                    return res.status(400).send('Image Uploading Failed')
                })
                
            })
        }
        else
        {
            return  res.status(200).send("Done")
        }
            
           
            
    }
    catch(e)
    {
        console.log(e)
        res.status(400).send(e.message)
    }
},(err,req,res,next)=>{
    return res.status(400).send("middleware error")
})


router.post("/changepassword",async (req,res)=>{
    try
    {
        let password = req.body["password"]
        let user  =  await VehicleOwner.findOneAndUpdate({mobile: req.body.mobile},{password})
        if(user)
        {
            await user.save()
            return res.status(200).send("DONE")
        }
        user  =  await Fieldstaff.findOneAndUpdate({mobile: req.body.mobile},{password})
        if(user)
        {
            await user.save()
            return res.status(200).send("DONE")
        }
         user  =  await AreaManager.findOneAndUpdate({mobile: req.body.mobile},{password})
        if(user)
        {
            await user.save()
            return res.status(200).send("DONE")
        }
        user  =  await Transporter.findOneAndUpdate({mobile: req.body.mobile},{password})
        if(user)
        {
            await user.save()
            return res.status(200).send("DONE")
        }
        
        return res.status(400).send("User not found!")
     
    }
    catch(e)
    {
        return res.status(400).send(e.message)
    }
})



module.exports = router