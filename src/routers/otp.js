const express = require('express')
const router  = new express.Router()
const otpmethods = require('../otp')


router.get("/otp/login",async (req,res)=>{
    try
    {
        otpmethods.sendLoginOtp(req.query.mobile)
        return res.status(200).send("DONE")
    }
    catch(e)
    {
        return res.status(400).send("DONE")
    }
})

router.get("/otp/other",async (req,res)=>{
    try
    {
        otpmethods.sendLoginOtp(req.query.mobile)
        return res.status(200).send("DONE")
    }
    catch(e)
    {
        return res.status(400).send("DONE")
    }
})


router.get("/otp/verify",async (req,res)=>{
    try
    {
        let data =  otpmethods.verifyOtp(req.query.mobile,req.query.otp,res)
        // return res.status(200).send(data)
    }
    catch(e)
    {
        return res.status(400).send("DONE")
    }
})


router.get("/otp/resend",async (req,res)=>{
    try
    {
        otpmethods.sendLoginOtp(req.query.mobile)
        return res.status(200).send("DONE")
    }
    catch(e)
    {
        return res.status(400).send("DONE")
    }
})

module.exports = router