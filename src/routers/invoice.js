const express = require('express')
const router  = new express.Router()
const Invoice = require('../models/invoice')
const auth = require('../auth/auth')
const Booking = require('../models/booking')

router.post("/invoice",auth,async (req,res)=>{
    try
    {
        const invoice  = new Invoice({...req.body,owner: req.user._id})
        await Booking.findOneAndUpdate({id: req.body.id},{status: "COMPLETED"})
        await invoice.save()
        return res.status(200)       
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* const invoice  = new Invoice(req.body)
    invoice.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/allinvoice/vehicleowner",auth,async (req,res)=>{
    try
    {
        const invoices= await req.user.populate({
            path: 'invoices',
            match:{
                status: 'COMPLETED'
            }
            ,options:{
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()

        res.status(200).send(invoices)        
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* Invoice.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/invoice/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const invoice = await Invoice.findOne({id})
        if(invoice!=null)
        {
             res.status(200).send(invoice)   
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
   /* const id = req.params.id
    Invoice.findOne({id},(e, a)=>{
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

router.patch("/invoice/:id",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id','vehicleno','tonnage','rate','amount','hsd','cash','tds',
        'officecharge','shortage','balanceamount','challantotransporter','balanceamountcleared','status']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
       /* const invoice = await Invoice.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const invoice  = await Invoice.findOne({id})
        if(invoice!=null)
        {
            updates.forEach((update)=>{
                   invoice[update] = req.body[update] 
            })
            await invoice.save()
            res.status(200).send(invoice)   
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

router.delete("/invoice/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const invoice = await Invoice.findOneAndDelete({id})
        if(invoice!=null)
        {
             res.status(200).send(invoice)   
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

router.get("/invoice/me",auth,async (req,res)=>{
    try
    {
        await req.user.populate('invoices').execPopulate()
        res.status(200).send(req.user.invoices) 
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