const express = require('express')
const router  = new express.Router()
const Ticket = require('../models/ticket')
const auth = require('../auth/auth')

router.post("/ticket",auth,async (req,res)=>{
    try
    {
        const ticket  = new Ticket({...req.body,userid: req.user.id})
        await ticket.save()
        return res.status(200).send('DONE')        
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
    /*const ticket  = new Ticket(req.body)
    ticket.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/allticket",auth,async (req,res)=>{
    try
    {
        await Ticket.find({userid: req.user.id}).sort({createdAt : -1}).exec(function(err,tickets){ 
            if(tickets)
            {
                res.status(200).send(tickets)    
            }
            else
            {
                   res.status(200).send([]) 
            }
        })  
           
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
    /*Ticket.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/ticket/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const ticket = await Ticket.findOne({id})
        if(ticket!=null)
        {
             res.status(200).send(ticket)   
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
  /*  const id = req.params.id
    Ticket.findOne({id},(e, a)=>{
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

router.patch("/ticket/:id",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id','userid','category','message']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /*const ticket = await Ticket.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const ticket = await Ticket.findOne({id})
        if(ticket!=null)
        {
            updates.forEach((update)=>{
                ticket[update] = req.body[update] 
            })
            await ticket.save() 
             res.status(200).send(ticket)   
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

router.delete("/ticket/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.ticket
        const ticket = await Ticket.findOneAndDelete({id})
        if(ticket!=null)
        {
             res.status(200).send(ticket)   
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


module.exports = router