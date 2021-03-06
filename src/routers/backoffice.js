const express = require('express')
const router  = new express.Router()
const BackOffice = require('../models/backoffice')

router.post("/backoffice",async (req,res)=>{
    
    try
    {
        
        const backoffice  = new BackOffice(req.body)
        await backoffice.save()
        res.status(200).send(backoffice)    
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
    /*const admin  = new Admin(req.body)
    admin.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})


router.get("/backoffice",async (req,res)=>{
    try
    {
        const backoffice = await BackOffice.findOne({id: req.query.id,password: req.query.password})
        if(backoffice)
        {
            res.status(200).send(backoffice)
        }
        else
        {
            res.status(400).send("user not found!")
        }
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})


module.exports = router