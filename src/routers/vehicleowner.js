const express = require('express')
const router  = new express.Router()
const VehicleOwner = require('../models/vehicleowner')
const auth = require('../auth/auth')
const jwt =require('jsonwebtoken')


router.post("/vehicleowner",async (req,res)=>{
    try
    {
        const vehicleowner  = new VehicleOwner(req.body)
        const token=await vehicleowner.generateToken()
        await vehicleowner.save()
        res.status(201).send({token,user:vehicleowner.getPublicProfile()})
    }
    catch(e)
    {
        console.log(e)
        res.status(400).send(e)
    }
   /* const vehicleowner  = new Vehicleowner(req.body)
    vehicleowner.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/allvehicleowner",auth,async (req,res)=>{
    try
    {
        const vehicleowners= await VehicleOwner.find({})  
        res.status(200).send(vehicleowners)    
    }
    catch(e)
    {
        res.status(400).send(e)
    }
  /*  Vehicleowner.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/vehicleowner/:mobile",auth,async (req,res)=>{
    try
    {
        const mobile = req.params.mobile
        const vehicleowner = await VehicleOwner.findOne({mobile})
        if(vehicleowner!=null)
        {
             res.status(200).send(vehicleowner.getPublicProfile())   
        }
        else
        {
            res.status(400)
        }  
    }
    catch(e)
    {
        res.status(400).send(e)
    }
  /*  const mobile = req.params.mobile
    Vehicleowner.findOne({mobile},(e, a)=>{
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

router.patch("/vehicleowner/:mobile",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstname','lastname','mobile','email','password','status',
        'accountno','ifsc','bankname','city','pan','tds']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const mobile = req.params.mobile
        /*const vehicleowner = await vehicleOwner.findOneAndUpdate({mobile},req.body,{
            new : true,
            runValidators: true
        })*/
        const vehicleowner = await VehicleOwner.findOne({mobile})
        if(vehicleowner!=null)
        {
            updates.forEach((update)=>{
                vehicleowner[update] = req.body[update] 
            })
            await vehicleowner.save() 
             res.status(200).send(vehicleowner.getPublicProfile())   
        }
        else
        {
            res.status(400)
        }
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.delete("/vehicleowner/:mobile",auth,async (req,res)=>{
    try
    {
        const mobile = req.params.mobile
        const vehicleowner = await VehicleOwner.findOneAndDelete({mobile})
        if(vehicleowner!=null)
        {
             res.status(200).send(vehicleowner.getPublicProfile())   
        }
        else
        {
            res.status(400)
        }
         
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.post("/vehicleowner/login",async (req,res)=>{
    try
    {
            const vehicleowner  = await VehicleOwner.findByMobie(req.body.mobile,req.body.password)
            if(vehicleowner == null)
            {
                return res.status(400)
            }
            const token  = await vehicleowner.generateToken()
            res.status(200).send({
                user: vehicleowner.getPublicProfile(),
                token
            })
    }
    catch(e)
    {
        res.status(400)
    }
})

router.get('/vehicleowner/me',auth,async (req,res)=>{
    res.send(req.user.getPublicProfile())
})


router.patch("/vehicleowner/me",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstname','lastname','mobile','email','password','status',
        'accountno','ifsc','bankname','city','pan','tds']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
            
            updates.forEach((update)=>{
                req.user[update] = req.body[update] 
             })

             await req.user.save()
            res.status(200).send(req.user.getPublicProfile())  
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.delete("/vehicleowner/me",auth,async (req,res)=>{
    try
    {
       await req.user.remove()
       res.status(200).send(req.user)
         
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})


router.post('/vehicleowner/logout',auth,async (req,res)=>{
    try
    {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token 
        })
        await req.user.save()
        res.status(200).send()

    }
    catch(e)
    {
        res.status(400)
    }
})



module.exports = router