const express = require('express')
const router  = new express.Router()
const Vehicle = require('../models/vehicle')
const Notification = require('../models/notification')
const firebase = require('../values')
let moment = require('moment-timezone')
const auth = require('../auth/auth')
const db = require('../db/dbfile')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 10)
const mongoose = require("mongoose")
var Schema = mongoose.Schema;
var multer  = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 50000000
    },
    fileFilter: function (req, file, cb) {

            return cb(undefined, true);  

    }
})

var allupload = upload.fields([{ name: 'rcimage', maxCount: 1 }])



/**
 * 
 * const values   = require('./src/values')
values.sendFirebaseMessage("dZetVzzWRbeZAIM3XkZoHE:APA91bFIR-m52RlPaE0mG2soWJCOPuVTYftZqc6LF_vuotByfAtizznyfvtkM2l_ie2X9-8ecJHXP6VSSwq1gwpNq5nDL22vvod2GD3My5R-4MVpOyyJ2B_DIjawFMGdUzWrqvj1_1w_",
"shani","good morning")
 */



router.post("/vehicle",auth,allupload,async (req,res)=>{
    try
    {
    //    let buffer = await sharp(req.files["rcimage"][0].buffer).resize(500).png().toBuffer();
    //    let name = nanoid()

    //    var c = db.imagedb.model(name, 
    //      new Schema({ image: Buffer}), 
    //      name);

    //      var obj = new c({image: buffer})
    //       await obj.save()
          

        const vehicle  = new Vehicle({...req.body,driverid: req.user.id})
        await vehicle.save()
        // req.user.firebase.forEach((token)=>{
        //     try
        //     {
        //         firebase.sendFirebaseMessage(token,"TRANSFLY","Your Vehicle has been added")
       
        //     }
        //     catch(e)
        //     {

        //     }
        //  })

        
        let text = "Your vehicle " + req.body.number +" has been added."
        
        const notification = new Notification({user: req.user.id,text,type:0})
        await notification.save()
        req.user.firebase.forEach((token) => {
            try {
               
                firebase.sendFirebaseMessage(token, "TRANSFLY", text)

            }
            catch (e) {

            }
        })

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
        const vehicles= await Vehicle.find({driverid: req.user.id})  
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
            return res.status(400)
        }         
    }
    catch(e)
    {
        res.status(400).send(e.message)
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

router.patch("/vehicle",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id','number','rc','vehiclename','driverid','contact']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.body.id
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
          return  res.status(400)
        }
    }
    catch(e)
    {
        res.status(400).send(e.message)
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
            return res.status(400)
        }
         
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})




module.exports = router