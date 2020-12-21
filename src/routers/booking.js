const express = require('express')
const router  = new express.Router()
const Booking = require('../models/booking')
const auth = require('../auth/auth')

router.post("/booking",auth,async (req,res)=>{
    try
    {
        const booking  = new Booking({...req.body,owner: req.user._id})
        await booking.save()
        res.status(201).send(booking)       
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* const booking  = new Booking(req.body)
    booking.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/allbooking",auth,async (req,res)=>{
    try
    {
        const bookings= await Booking.find({})  
        res.status(200).send(bookings)        
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

router.get("/booking/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const booking = await Booking.findOne({id})
        if(booking!=null)
        {
             res.status(200).send(booking)   
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
 /*   const id = req.params.id
    Booking.findOne({id},(e, a)=>{
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

router.patch("/booking/:id",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id','vehicleownerid','vehicleid','mineid','loading','status']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /*const booking = await Booking.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const booking = await Booking.findOne({id})
        if(booking!=null)
        {
            updates.forEach((update)=>{
                booking[update] = req.body[update] 
            })
            await booking.save() 
             res.status(200).send(booking)   
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

router.delete("/booking/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const booking = await Booking.findOneAndDelete({id})
        if(booking!=null)
        {
             res.status(200).send(booking)   
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

router.get("/booking/me",auth,async (req,res)=>{
    try
    {
        await req.user.populate('bookings').execPopulate()
        res.status(200).send(req.user.bookings) 
    }
    catch(e)
    {
        res.status(400).send(e)
    }
 /*   const id = req.params.id
    Booking.findOne({id},(e, a)=>{
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




module.exports = router