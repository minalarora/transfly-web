const express = require('express')
const router  = new express.Router()
const Reward = require('../models/referral')
const auth = require('../auth/auth')



router.post("/reward",auth,async (req,res)=>{
    try
    {
       
        const reward  = new Reward(req.body)
        
        await reward.save()
        res.status(201).send(reward)      
    }
    catch(e)
    {
        
        res.status(400).send(e)
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
        const rewards = await Reward.find({})  
        res.status(200).send(rewards)      
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* Booking.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/reward/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const reward = await Reward.findOne({id})
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
        res.status(400).send(e)
    }
})




module.exports = router