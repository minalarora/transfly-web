const express = require('express')
const router  = new express.Router()
const Rating = require('../models/rating')
const auth = require('../auth/auth')

router.post("/rating",auth,async (req,res)=>{
    try
    {
       
        const rating  = new Rating({...req.body,userid: req.user.mobile})
        await rating.save()
        return res.status(200)      
    }
    catch(e)
    {
        
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router