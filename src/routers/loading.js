const express = require('express')
const router  = new express.Router()
const Loading = require('../models/loading')
var multer  = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    }
})


router.post('/loading',upload.single('loading'),async (req,res)=>{
    try
    {
        if(req.file)
        {
                const loading  = new Loading({...req.body,loadingimage:req.file.buffer})
                await loading.save()
                res.status(200).send('DONE')
        }
        else
        {
            res.status(400).send('DONE')
        }
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})


router.get("/loading/:name",async (req,res)=>{
    try
    {
        const name = req.params.name
        const loading = await Loading.findOne({loadingname: name})
        if(loading!=null)
        {
            res.set('Content-Type', 'image/png')
            res.send(loading.loadingimage)
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


module.exports = router