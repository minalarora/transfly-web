const express = require('express')
const router  = new express.Router()
const Banner = require('../models/banner')
const auth = require('../auth/auth')
var multer  = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    },
    fileFilter: function (req, file, cb) {

            return cb(undefined, true);  

    }
})



router.post("/banner",auth,upload.single('image'),async (req,res)=>{
    try
    {
       if(req.file)
       {
        const banner = new Banner({image: req.file.buffer})
        await banner.save()
        res.status(200).send("DONE") 
       }
       else
       {
        res.status(400).send("NO IMAGE")
       }     
    }
    catch(e)
    {
        
        res.status(400).send(e.message)
    }
    /*const vehicle  = new Vehicle(req.body)
    vehicle.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
},(err,req,res,next)=>{
    return res.status(400).send("middleware error")
})

router.get("/allbanner",auth,async (req,res)=>{
    try
    {
        const banners = await Banner.find({},null,{skip: 0 , limit : 2, sort: {
            createdAt: -1
        }}).exec()  
        res.status(200).send(banners)      
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
   /* Booking.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/bannerimage/:id",async (req,res)=>{
    try
    {
        const id = req.params.id
        const banner = await Banner.findOne({id})
        if(banner!=null)
        {
            res.set('Content-Type', 'image/png')
            res.send(banner.image)
        }
        else
        {
            return res.status(400).send("IMAGE NOT FOUND")
        }         
    }
    catch(e)
    {
        res.status(400).send(e)
    }
  /*  const id = req.params.id
    Vehicle.findOne({id},(e, a)=>{
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

// router.patch("/reward/:id",auth,async (req,res)=>{
//     try
//     {
//         const updates = Object.keys(req.body)
//         const allowedUpdates = ['text','image']
//         const isValidOperation = updates.every((update)=>{
//                 return allowedUpdates.includes(update)
//         })
//         if(!isValidOperation)
//         {
//             return res.status(400).send("Invalid")
//         }
//         const id = req.params.id
//         /*const vehicle = await Vehicle.findOneAndUpdate({id},req.body,{
//             new : true,
//             runValidators: true
//         })*/
//         const reward = await Reward.findOne({id})
//         if(reward!=null)
//         {
//             updates.forEach((update)=>{
//                 reward[update] = req.body[update] 
//             })
//             await reward.save() 
//              res.status(200).send(reward)   
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
// })

// router.delete("/reward/:id",auth,async (req,res)=>{
//     try
//     {
//         const id = req.params.id
//         const reward = await Reward.findOneAndDelete({id})
//         if(reward!=null)
//         {
//              res.status(200).send(reward)   
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
// })




module.exports = router