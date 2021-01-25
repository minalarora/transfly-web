const express = require('express')
const router  = new express.Router()
const Mine = require('../models/mine')
const jwt= require('jsonwebtoken')
const auth = require('../auth/auth')
var multer  = require('multer')
var sharp = require('sharp')
var upload = multer({
    limits:
    {
        fileSize: 5000000
    }
})


router.post("/mine",async (req,res)=>{
    try
    {
        const mine  = new Mine(req.body)
        await mine.save()
        res.status(200).send(mine)         
    }
    catch(e)
    {
        
        res.status(400).send(e.message)
    }
   /* const mine  = new Mine(req.body)
    mine.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/allmine/vehicleowner",auth,async (req,res)=>{
    try
    {
        const mines= await Mine.find({})  
        res.status(200).send(mines)      
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
   /* Mine.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})

router.get("/mine/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const mine = await Mine.findOne({id})
        if(mine!=null)
        {
             res.status(200).send(mine)   
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
  /*  const id = req.params.id
    Mine.findOne({id},(e, a)=>{
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

router.get("/areaimage/:id",async (req,res)=>{
    try
    {
        const id = req.params.id
        const mine = await Mine.findOne({id})
        if(mine!=null)
        {
            res.set('Content-Type', 'image/png')
            res.send(mine.areaimage)
        }
        else
        {
            return res.status(400).send("DONE")
        }         
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
 
})

router.post("/nearme/mine",auth,async (req,res)=>{
    try
    {
        // console.log("near me")
        const mines  =  await Mine.find({})
        let shortestpath  = 99999
        let areaname = null
        mines.forEach((mine)=>{
            let tempDistance  = distance(req.body.latitude,req.body.longitude,mine.arealatitude,mine.arealongitude)
            if(shortestpath > tempDistance)
            {
                shortestpath = tempDistance
                areaname = mine.area
            }
        })
        res.status(200).send(areaname)
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}



// router.post("/mineimage/:id",async (req,res)=>{
//     try
//     {
//             const id = req.params.id
//             const mine = await Mine.findOne({id})
            
//     }
//     catch(e)
//     {

//     }
// })


router.patch("/mine/image/:id",upload.single("areaimage"),async (req,res)=>{
    try
    {

            const id = req.params.id
            const mine  = await Mine.findOne({id})
            mine.areaimage = await sharp(req.file.buffer).resize(200).png().toBuffer();
            await mine.save()
            return res.status(200).send("DONE")
    }
    catch(e)
    {
        return res.status(400).send(e.message)
    }
})
router.patch("/mine/:id",async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name','area','trailer','active','tyres','bodytype','loading','rate','etl','latitude',
        'longitude','landmark','areamanager','fieldstaff','transporter']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
       /* const mine = await Mine.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const mine = await Mine.findOne({id})
        if(mine!=null)
        {
            updates.forEach((update)=>{
                mine[update] = req.body[update] 
            })
            await mine.save() 
             res.status(200).send(mine)   
        }
        else
        {
          return  res.status(400)
        }
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

router.delete("/mine/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const mine = await Mine.findOneAndDelete({id})
        if(mine!=null)
        {
             res.status(200).send(mine)   
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


module.exports = router