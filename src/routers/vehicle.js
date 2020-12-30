const express = require('express')
const router  = new express.Router()
const Vehicle = require('../models/vehicle')
const auth = require('../auth/auth')
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

var allupload = upload.fields([{ name: 'rcimage', maxCount: 1 }])



router.post("/vehicle",auth,allupload,async (req,res)=>{
    try
    {
       let buffer = await sharp(req.files["rcimage"][0].buffer).resize(200).png().toBuffer();
        const vehicle  = new Vehicle({...req.body,driverid: req.user.mobile,rcimage:buffer})
        await vehicle.save()
        return res.status(200).send("DONE")  
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
    /*const vehicle  = new Vehicle(req.body)
    vehicle.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
},(err,req,res,next)=>{
    return res.status(400).send("middleware error")
})

router.get("/allvehicle",auth,async (req,res)=>{
    try
    {
        const vehicles= await Vehicle.find({driverid: req.user.mobile})  
        res.status(200).send(vehicles)      
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
   /* Booking.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/vehicle/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const vehicle = await Vehicle.findOne({id})
        if(vehicle!=null)
        {
             res.status(200).send(vehicle)   
        }
        else
        {
            res.status(400)
        }         
    }
    catch(e)
    {
        res.status(400).send(e)
    }
  /*  const id = req.params.id
    Vehicle.findOne({id},(e, a)=>{
            if(e)
            {
                res.status(400)
                res.send(e)       
            }
            else
            {
                res.status(200)
                res.send(a)
            }
    })*/
})

router.patch("/vehicle/:id",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id','number','rc','vehiclename','driverid']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /*const vehicle = await Vehicle.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const vehicle = await Vehicle.findOne({id})
        if(vehicle!=null)
        {
            updates.forEach((update)=>{
                vehicle[update] = req.body[update] 
            })
            await vehicle.save() 
             res.status(200).send(vehicle)   
        }
        else
        {
            res.status(400)
        }
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.delete("/vehicle/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const vehicle = await Vehicle.findOneAndDelete({id})
        if(vehicle!=null)
        {
             res.status(200).send(vehicle)   
        }
        else
        {
            res.status(400)
        }
         
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})




module.exports = router