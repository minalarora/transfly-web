const express = require('express')
const router  = new express.Router()
const Mine = require('../models/mine')
const jwt= require('jsonwebtoken')
const auth = require('../auth/auth')

router.post("/mine",async (req,res)=>{
    try
    {
        const mine  = new Mine(req.body)
        await mine.save()
        res.status(200).send(mine)         
    }
    catch(e)
    {
        
        res.status(400).send(e.message)
    }
   /* const mine  = new Mine(req.body)
    mine.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/allmine/vehicleowner",auth,async (req,res)=>{
    try
    {
        const mines= await Mine.find({active: true})  
        res.status(200).send(mines)      
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
   /* Mine.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/mine/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const mine = await Mine.findOne({id})
        if(mine!=null)
        {
             res.status(200).send(mine)   
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
    Mine.findOne({id},(e, a)=>{
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

router.get("/areaimage/:id",async (req,res)=>{
    try
    {
        const id = req.params.id
        const mine = await Mine.findOne({id})
        if(mine!=null)
        {
            res.set('Content-Type', 'image/png')
            res.send(mine.areaimage)
        }
        else
        {
            return res.status(400).send("DONE")
        }         
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
 
})

router.post("/mineimage/:id",async (req,res)=>{
    try
    {
            const id = req.params.id
            const mine = await Mine.findOne({id})
            
    }
    catch(e)
    {

    }
})

router.patch("/mine/:id",async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name','area','trailer','active','tyres','bodytype','loading','rate','etl','latitude',
        'longitude','landmark','areamanager','fieldstaff','transporter']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
       /* const mine = await Mine.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const mine = await Mine.findOne({id})
        if(mine!=null)
        {
            updates.forEach((update)=>{
                mine[update] = req.body[update] 
            })
            await mine.save() 
             res.status(200).send(mine)   
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

router.delete("/mine/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const mine = await Mine.findOneAndDelete({id})
        if(mine!=null)
        {
             res.status(200).send(mine)   
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