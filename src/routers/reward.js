const express = require('express')
const router  = new express.Router()
const Reward = require('../models/reward')
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





router.post("/reward",auth,upload.single('image'),async (req,res)=>{
    try
    {
       if(req.file)
       {
        const reward  = new Reward({...req.body,image: req.file.buffer})
        await reward.save()
        res.status(200).send("DONE") 
       }
       else
       {
        const reward  = new Reward(req.body)
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

router.get("/allreward",auth,async (req,res)=>{
    try
    {
        const rewards = await Reward.find({},null,{skip: 0 , limit : 1, sort: {
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

router.get("/rewardimage/:id",async (req,res)=>{
    try
    {
        const id = req.params.id
        const reward = await Reward.findOne({id})
        if(reward!=null)
        {
            res.set('Content-Type', 'image/png')
            res.send(reward.image)
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
        res.status(400).send(e)
    }
})




module.exports = router