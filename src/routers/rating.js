const express = require('express')
const router  = new express.Router()
const Rating = require('../models/rating')
const auth = require('../auth/auth')
const email= require('../email')

router.post("/rating",auth,async (req,res)=>{
    try
    {
       
        const rating  = new Rating({...req.body,userid: req.user.id})
        await rating.save()
        email.sendEmail('RATING',"" + req.user.name + "\n" + req.user.mobile + "\n" + "RATING: " + rating.rating + "\n"+ "MESSAGE: "+ rating.message)
        return res.status(200).send("DONE")     
    }
    catch(e)
    {
        
       
        res.status(400).send(e.message)
    }
})

module.exports = router