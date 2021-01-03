const express = require('express')
const router  = new express.Router()
const Resale = require('../models/resale')
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


router.get('/allresale',auth,async (req,res)=>{
    try
    {
        const resale = await Resale.find({},null,{sort: {
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
            res.set('Content-Type', 'image/png')
            res.send(resale.vehicleimage[number - 1])
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

router.post("/resale/contact",auth,async (req,res)=>{
    try
    {
        return res.status(200).send("DONE")
    }
    catch(e)
    {
        return res.status(400).send(e.message)
    }
})




module.exports = router