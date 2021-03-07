const express = require('express')
const router = new express.Router()
const Transporter = require('../models/transporter')
const Transporterrequest = require('../models/transporterrequest')
const auth = require('../auth/auth')
const jwt = require("jsonwebtoken")


router.post('/transporterrequest',auth, async (req,res)=>{
    try
    {
        const request = new Transporterrequest({...req.body,requestuser: req.user.id})
        await request.save()
        return res.status(200).send("done")
    }
    catch(e)
    {
        return res.status(400).send(e.message)
    }
})


router.get('/transporterrequest',auth, async (req,res)=>{
    try
    {
        const requests = await Transporterrequest.find({status: 'PENDING'})

    }
    catch(e)
    {

    }
})


router.get('/transporterrequestaction')
{
    try
    {
        const id = req.query.id
        const action = req.query.action
        await Transporterrequest.findOneAndUpdate({id},{status: action})

    }
    catch(e)
    {

    }
}


module.exports = router