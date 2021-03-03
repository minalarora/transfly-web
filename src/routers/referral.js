const express = require('express')
const router  = new express.Router()
const Referral = require('../models/referral')
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
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {

            return cb(undefined, true);  

    }
})





router.post("/referral",auth,upload.single('image'),async (req,res)=>{
    try
    {
       if(req.file)
       {
        let name = nanoid()

        var c = db.imagedb.model(name, 
          new Schema({ image: Buffer}), 
          name);
 
          var obj = new c({image: req.file.buffer})
           await obj.save()

        const reward  = new Referral({...req.body,image: name})
        await reward.save()
        res.status(200).send("DONE") 
       }
       else
       {
        const reward  = new Referral(req.body)
        await reward.save()
        res.status(200).send("DONE")  
       }     
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
})

router.get("/allreferral",auth,async (req,res)=>{
    try
    {
        const rewards = await Referral.find({},null,{skip: 0 , limit : 1, sort: {
            createdAt: -1
        }}).exec()  
        res.status(200).send(rewards)      
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

router.get("/referralimage/:id",async (req,res)=>{
    try
    {
        const id = req.params.id
        const reward = await Referral.findOne({id})
        if(reward!=null)
        {
            let c = db.imagedb.model(reward.image, 
                new Schema({ image: Buffer}), 
                reward.image);
    
                let imgobj = await c.find({})
            
                if(imgobj)
                {
                    res.set('Content-Type', 'image/png')
                    res.send(imgobj[0].image)    
                }
                else
                {
                    res.send(null)
                }
            // res.set('Content-Type', 'image/png')
            // res.send(reward.image)
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


router.patch("/reward/:id",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['text','image']
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
        const reward = await Reward.findOne({id})
        if(reward!=null)
        {
            updates.forEach((update)=>{
                reward[update] = req.body[update] 
            })
            await reward.save() 
             res.status(200).send(reward)   
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

router.delete("/reward/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const reward = await Reward.findOneAndDelete({id})
        if(reward!=null)
        {
             res.status(200).send(reward)   
        }
        else
        {
            res.status(400)
        }
         
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})




module.exports = router