const express = require('express')
const router  = new express.Router()
const AreaManager = require('../models/areamanager')
const auth = require('../auth/auth')
const jwt = require('jsonwebtoken')
var multer  = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return cb(new Error('only image'))
        }
            return cb(undefined, true);  

    }
})
var transporterUpload = upload.fields([{ name: 'panimage', maxCount: 1 }, { name: 'aadhaarimage', maxCount: 1 }])


router.post("/areamanager",async (req,res)=>{
    try
    {
        const areamanager  = new AreaManager(req.body)
        const token=await areamanager.generateToken()
        await areamanager.save()
        res.status(200).send({token: "areamanager:" + token ,...areamanager.toJSON()})
    }
    catch(e)
    {
        console.log(e)
        res.status(400).send(e)
    }
   /* const areamanager  = new AreaManager(req.body)
    areamanager.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get('/areamanager/me',auth,async (req,res)=>{
    res.status(200).send({token: "areamanager:" + req.token ,...areamanager.toJSON()})
})

router.get("/allareamanager",auth,async (req,res)=>{
    try
    {
        const areamanagers= await AreaManager.find({})  
        res.status(200).send(areamanagers)    
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* AreaManager.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

// router.get("/areamanager/:mobile",auth,async (req,res)=>{
//     try
//     {
//         const mobile = req.params.mobile
//         const areamanager = await Admin.findOne({mobile})
//         if(areamanager!=null)
//         {
//              res.status(200).send(areamanager.getPublicProfile())   
//         }
//         else
//         {
//             res.status(400)
//         }    
//     }
//     catch(e)
//     {
//         res.status(400).send(e)
//     }
//    /* const mobile = req.params.mobile
//     AreaManager.findOne({mobile},(e, a)=>{
//             if(e)
//             {
//                 res.status(400)
//                 res.send(e)       
//             }
//             else
//             {
//                 res.status(200)
//                 res.send(a)
//             }
//     })*/
// })

router.post("/areamanager/me",auth,transporterUpload,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const imageupdates = Object.keys(req.files)
        const allowedUpdates = ['name','mobile','email','password','status',
        'accountno','ifsc','bankname','pan','aadhaar','ename','erelation','emobile']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation && (updates.length > 0))
        {
            return res.status(400).send("Invalid")
        }
            
            updates.forEach((update)=>{
                req.user[update] = req.body[update] 
             })

             imageupdates.forEach((update)=>{
                req.user[update] = req.files[update][0].buffer
                
            })
            
             await req.user.save()
            return res.status(200)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})


router.patch("/areamanager/:mobile",auth,async (req,res)=>{
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
      /*  const areamanager = await AreaManager.findOneAndUpdate({mobile},req.body,{
            new : true,
            runValidators: true
        })*/
        const areamanager = await AreaManager.findOne({mobile})
        if(areamanager!=null)
        {
            updates.forEach((update)=>{
                areamanager[update] = req.body[update] 
            })
            await areamanager.save() 
            res.status(200).send(areamanager.getPublicProfile())   
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

router.delete("/areamanager/:mobile",auth,async (req,res)=>{
    try
    {
        const mobile = req.params.mobile
        const areamanager = await Admin.findOneAndDelete({mobile})
        if(admin!=null)
        {
             res.status(200).send(areamanager.getPublicProfile())   
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

router.post("/areamanager/login",async (req,res)=>{
    try
    {
            const areamanager  = await AreaManager.findByMobie(req.body.mobile,req.body.password)
            if(areamanager == null)
            {
                return res.status(400)
            }
            const token  = await areamanager.generateToken()
            res.status(200).send({token: "areamanager:" + token ,...areamanager.getPublicProfile()})
    }
    catch(e)
    {
        res.status(400)
    }
})




router.delete("/areamanager/me",auth,async (req,res)=>{
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


router.post('/areamanager/logout',auth,async (req,res)=>{
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