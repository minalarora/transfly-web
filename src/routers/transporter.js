const express = require('express')
const router  = new express.Router()
const Transporter = require('../models/transporter')
const auth = require('../auth/auth')


router.post("/transporter",async (req,res)=>{
    try
    {
        const transporter  = new Transporter(req.body)
        const token=await transporter.generateToken()
        await transporter.save()
        res.status(201).send({token,user:transporter.getPublicProfile()}) 
    }
    catch(e)
    {
        res.status(400).send(e)
    }
  /*  const transporter  = new Transporter(req.body)
    transporter.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/alltransporter",auth,async (req,res)=>{
    try
    {
        const transporters= await Transporter.find({})  
         res.status(200).send(transporters)     
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* Transporter.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/transporter/:mobile",auth,async (req,res)=>{
    try
    {
        const mobile = req.params.mobile
        const transporter = await Transporter.findOne({mobile})
        if(transporter!=null)
        {
             res.status(200).send(transporter.getPublicProfile())   
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
    Transporter.findOne({mobile},(e, a)=>{
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

router.patch("/transporter/:mobile",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstname','lastname','mobile','email','password','status',
        'gst','sta','pan','aadhaar','mininglicense']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const mobile = req.params.mobile
        /*const transporter = await Transporter.findOneAndUpdate({mobile},req.body,{
            new : true,
            runValidators: true
        })*/
        const transporter = await Transporter.findOne({mobile})
        if(transporter!=null)
        {
            updates.forEach((update)=>{
                transporter[update] = req.body[update] 
            })
            await transporter.save() 
             res.status(200).send(transporter.getPublicProfile())   
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

router.delete("/transporter/:mobile",auth,async (req,res)=>{
    try
    {
        const mobile = req.params.mobile
        const transporter = await Transporter.findOneAndDelete({mobile})
        if(transporter!=null)
        {
             res.status(200).send(transporter.getPublicProfile())   
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


router.post("/transporter/login",async (req,res)=>{
    try
    {
            const transporter  = await Transporter.findByMobie(req.body.mobile,req.body.password)
            if(transporter == null)
            {
                return res.status(400)
            }
            const token  = await transporter.generateToken()
            res.status(200).send({
                user: transporter.getPublicProfile(),
                token
            })
    }
    catch(e)
    {
        res.status(400)
    }
})

router.get('/transporter/me',auth,async (req,res)=>{
    res.send(req.user.getPublicProfile())
})


router.patch("/transporter/me",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstname','lastname','mobile','email','password','status',
        'gst','sta','pan','aadhaar','mininglicense']
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

router.delete("/transporter/me",auth,async (req,res)=>{
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

router.post('/transporter/logout',auth,async (req,res)=>{
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