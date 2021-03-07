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


router.get('/transporterrate', async (req,res)=>{
    try
    {

        const requests = await Transporterrequest.find({status: 'PENDING'})
        let transporter = []
        for (req in requests)
        {
            
                let t = await Transporter.findOne({id: requests[req].requestuser})
                requests[req].name = t.name
                requests[req].mobile = t.mobile
                transporter.push(requests[req])
        }
        let data = {
            transporter: transporter
        }
      
        return res.render('transporter_rate_request',{data})

    }
    catch(e)
    {

    }
})


router.get('/update_rate_transporter/:action/:id',async (req,res)=>
{
    try
    {
        const id = req.params.id
        const action = req.params.action
        if(action == "accept")
        {
            await Transporterrequest.findOneAndUpdate({id},{status: "ACCEPTED"})
        }
        else
        {
            await Transporterrequest.findOneAndUpdate({id},{status: "REJECTED"})
        }

        return res.status(200).redirect('/transporterrate')
      

    }
    catch(e)
    {
        return res.status(200).send('transporterrate')
    }
})


module.exports = router