const express = require('express')
const router  = new express.Router()
const Admin = require('../models/admin')
const jwt= require('jsonwebtoken')
const auth = require("../auth/auth")


router.post("/admin",async (req,res)=>{
    
    try
    {
        
        const admin  = new Admin(req.body)
        const token=await admin.generateToken()
        await admin.save()
        res.status(200).send({token,user:admin.getPublicProfile()})    
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
    /*const admin  = new Admin(req.body)
    admin.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/alladmin",auth,async (req,res)=>{
    try
    {
         const admins= await Admin.find({})  
         res.status(200).send(admins) 
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* Admin.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/admin/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const admin = await Admin.findOne({id})
        if(admin!=null)
        {
             res.status(200).send(admin.getPublicProfile())   
        }
        else
        {
            res.status(400)
        }
         
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
   /* const mobile = req.params.mobile
    Admin.findOne({mobile},(e, a)=>{
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

router.patch("/admin/me",auth,async (req,res)=>{
    try
    {
        ////('ruming')
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name','mobile','email','password','status',
        'accountno','ifsc','bankname','city','pan','aadhaar','ename','erelation','emobile']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            ////('ruming')
            return res.status(400).send("Invalid")
        }
        ////('ruminsdg')
            updates.forEach((update)=>{
                req.user[update] = req.body[update] 
             })

             await req.user.save()
          return  res.status(200).send(req.user.getPublicProfile())  
    }
    catch(e)
    {
        return res.status(400).send(e.message)
    }
})


router.patch("/admin/:id",auth,async (req,res)=>{
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
        const id = req.params.id
        /*const admin = await Admin.findOneAndUpdate({mobile},req.body,{
            new : true,
            runValidators: true
        })*/
        const admin =  await Admin.findOne({id})
        if(admin!=null)
        {
            
            updates.forEach((update)=>{
                admin[update] = req.body[update] 
             })
             await admin.save()
            res.status(200).send(admin.getPublicProfile())  
        }
        else
        {
            return res.status(400)
        }
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

router.delete("/admin/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const admin = await Admin.findOneAndDelete({id})
        if(admin!=null)
        {
             res.status(200).send(admin.getPublicProfile())   
        }
        else
        {
           return res.status(400)
        }
         
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})



router.delete("/admin/me",auth,async (req,res)=>{
    try
    {
       await req.user.remove()
       res.status(200).send(req.user)
         
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

router.post("/admin/login",async (req,res)=>{
    try
    {
            const admin  = await Admin.findByMobie(req.body.mobile,req.body.password)
            if(admin == null)
            {
                return res.status(400)
            }
            const token  = await admin.generateToken()
            res.status(200).send({
                user: admin.getPublicProfile(),
                token
            })
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})


router.get('/admin/me',auth,async (req,res)=>{

    return res.send(req.user.getPublicProfile())
})


router.post('/admin/logout',auth,async (req,res)=>{
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
        return res.status(400).send(e.message)
    }
})

module.exports = router