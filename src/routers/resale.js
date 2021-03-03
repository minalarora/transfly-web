const express = require('express')
const router  = new express.Router()
const Resale = require('../models/resale')
const auth = require('../auth/auth')
var multer  = require('multer')
var sharp = require('sharp')
const email= require('../email')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {

            return cb(undefined, true);  

    }
})
const db = require('../db/dbfile')
const mongoose = require("mongoose")
var Schema = mongoose.Schema;


router.get('/allresale',auth,async (req,res)=>{
    try
    {
        const resale = await Resale.find({type:"RESALE"},null,{sort: {
            createdAt: -1
        }}).exec()  
        res.status(200).send(resale) 
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

router.get('/alllease',auth,async (req,res)=>{
    try
    {
        const resale = await Resale.find({type:"LEASE"},null,{sort: {
            createdAt: -1
        }}).exec()  
        res.status(200).send(resale) 
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

router.get("/resaleimage/:id/:number",async (req,res)=>{
    try
    {
        const id = req.params.id
        const number = req.params.number
        const resale = await Resale.findOne({id})
        if(resale!=null)
        {
            let c = db.imagedb.model(resale.vehicleimage[number - 1], 
                new Schema({ image: Buffer}), 
                resale.vehicleimage[number - 1]);
    
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
            // res.send(resale.vehicleimage[number - 1])
        }
        else
        {
            res.status(400).send('Unable to fetch image')
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

router.post("/resale/contact/:vehicle/:type",auth,async (req,res)=>{
    try
    {
        let vehicle = req.params.vehicle
        let type= req.params.type
        email.sendEmail('VEHICLE',"" + type +" \n" + req.user.name + "\n" + req.user.mobile + "\n" + "VEHICLE: " + vehicle)
        
        return res.status(200).send("DONE")
        
    }
    catch(e)
    {
        return res.status(400).send(e.message)
    }
})




module.exports = router