const express = require('express')
const router = new express.Router()
const Transporter = require('../models/transporter')
const Transporterrequest = require('../models/transporterrequest')
const auth = require('../auth/auth')
const jwt = require("jsonwebtoken")
const Notificationtransporter = require('../models/notificationtransporter')
const Message  = require('../values')
const Mine = require('../models/mine')


router.post('/transporterrequest',auth, async (req,res)=>{
    try
    {
        const request = new Transporterrequest({...req.body,requestuser: req.user.id})
        await request.save()
        let text ="Dear customer, your request for updating the rate from " + req.body.oldrate  + " to " + req.body.newrate + " for  " + 
        req.body.minename + " - " + req.body.loadingname + " has been sent to our representatives."
        createNotification(req.user.id,text,0)
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
           let transporter =  await Transporterrequest.findOneAndUpdate({id},{status: "ACCEPTED"})
           let mine  = await Mine.findOne({id: transporter.mineid})
           for(let k = 0;k<mine.loading.length;k++)
             {
        if((mine.loading[k].loadingname == transporter.loadingname))
        {
          mine.loading[k].rate = transporter.newrate
        }
            }
            await mine.save()
          
            let text ="Dear customer, your request for updating the rate from " + transporter.oldrate  + " to " + transporter.newrate + " for  " + 
            transporter.minename + " - " + transporter.loadingname + " has been accepted."
        createNotification(transporter.requestuser,text,0)
        
        }
        else
        {
            let transporter = await Transporterrequest.findOneAndUpdate({id},{status: "REJECTED"})

            let text ="Dear customer, your request for updating the rate from " + transporter.oldrate  + " to " + transporter.newrate + " for  " + 
            transporter.minename + " - " + transporter.loadingname + " has been rejected."
            createNotification(transporter.requestuser,text,0)
            
        }

        return res.status(200).redirect('/transporterrate')
      

    }
    catch(e)
    {
        return res.status(200).send('transporterrate')
    }
})


let createNotification = async (user,text)=>
{
    try
    {
       
       const notification = new Notificationtransporter({user,text})
       await notification.save()
       let vehicleowner = await Transporter.findOne({ id: user })
       vehicleowner.firebase.forEach((token) => {
           try {
               Message.sendFirebaseMessage(token, "TRANSFLY", text)

           }
           catch (e) {

           }
       })
    
    return true;
   
    }
    catch(e)
    {
      
       throw new Error(e.message)
    }
   
}

module.exports = router