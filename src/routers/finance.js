const express = require('express')
const router  = new express.Router()
const Finance = require('../models/finance')
const auth = require('../auth/auth')
const jwt = require('jsonwebtoken')


router.post("/finance",async (req,res)=>{
    try
    {
        const finance  = new Finance(req.body)
        const token=await finance.generateToken()
        await finance.save()
        res.status(201).send({token,user:finance.getPublicProfile()})      
    }
    catch(e)
    {
        console.log(e)
        res.status(400).send(e)
    }
   /* const finance  = new Finance(req.body)
    finance.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/allfinance",auth,async (req,res)=>{
    try
    {
        const finances= await Finance.find({})  
        res.status(200).send(finances)       
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* Finance.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/finance/:mobile",auth,async (req,res)=>{
    try
    {
        const mobile = req.params.mobile
        const finance = await Finance.findOne({mobile})
        if(finance!=null)
        {
             res.status(200).send(finance.getPublicProfile())   
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
    /*const mobile = req.params.mobile
    Finance.findOne({mobile},(e, a)=>{
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

router.patch("/finance/me",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name','mobile','email','password','status',
        'accountno','ifsc','bankname','city','pan','aadhaar','ename','erelation','emobile']
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


router.patch("/finance/:mobile",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name','mobile','email','password','status',
        'accountno','ifsc','bankname','city','pan','aadhaar','ename','erelation','emobile']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const mobile = req.params.mobile
       /* const finance = await Finance.findOneAndUpdate({mobile},req.body,{
            new : true,
            runValidators: true
        })*/
        const finance = await Finance.findOne({mobile})
        if(finance!=null)
        {
            updates.forEach((update)=>{
                finance[update] = req.body[update] 
            })
            await finance.save() 
             res.status(200).send(finance.getPublicProfile())   
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

router.delete("/finance/:mobile",auth,async (req,res)=>{
    try
    {
        const mobile = req.params.mobile
        const finance = await Finance.findOneAndDelete({mobile})
        if(finance!=null)
        {
             res.status(200).send(finance.getPublicProfile())   
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


router.post("/finance/login",async (req,res)=>{
    try
    {
            const finance  = await Finance.findByMobie(req.body.mobile,req.body.password)
            if(finance == null)
            {
                return res.status(400)
            }
            const token  = await finance.generateToken()
            res.status(200).send({
                user: finance.getPublicProfile(),
                token
            })
    }
    catch(e)
    {
        res.status(400)
    }
})

router.get('/finance/me',auth,async (req,res)=>{
    res.send(req.user.getPublicProfile())
})



router.delete("/admin/me",auth,async (req,res)=>{
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


router.post('/finance/logout',auth,async (req,res)=>{
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