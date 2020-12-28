const express = require('express')
const router  = new express.Router()
const Booking = require('../models/booking')
const Vehicleowner = require('../models/vehicleowner')
const auth = require('../auth/auth')

router.post("/booking",auth,async (req,res)=>{
    try
    {
        const booking  = new Booking({...req.body,owner: req.user._id,vehicleowner:req.user.name,vehicleownermobile:req.user.mobile})
        await booking.save()
        return res.status(200)       
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* const booking  = new Booking(req.body)
    booking.save().then((a)=>{
            res.status(201)
            res.send(a)
    }).catch((e)=>{
            res.status(400)
            res.send(e)
    })*/
})

router.get("/allbooking/vehicleowner",auth,async (req,res)=>{
    try
    {
        const bookings= await req.user.populate({
            path: 'bookings',
            match:{
                status: 'PENDING'
            }
            ,options:{
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()

        res.status(200).send(bookings)        
        /**
         * await Ticket.find({userid: req.user.mobile}).sort({date: -1}).execFind(function(err,tickets){ 
            if(tickets)
            {
                res.status(200).send(tickets)    
            }
            else
            {
                   res.status(200).send([]) 
            }
        })  
         * 
         */
    }
    catch(e)
    {
        res.status(400).send(e)
    }
   /* Booking.find({}).then((a)=>{
        res.status(200)
        res.send(a)
    }).catch((e)=>{
        res.status(400)
        res.send(e)
    })*/
})



router.get("/allbooking/fieldstaff",auth,async (req,res)=>{
    try
    {
         await req.user.populate(
            {
                path: 'mines',
                options:{
                    sort: {
                        createdAt: -1
                    }
                }
            }).execPopulate()

         let minearray = req.user.mines.map((mine)=>{
                return mine.id
         })   
         //mongoose.find({title: {$in: sd}})
        const bookings = await Booking.find({mineid: {$in: minearray},status: 'PENDING'}).sort({createdAt: -1}).execFind(function(err,bookings){ 
            if(bookings)
            {
                res.status(200).send(bookings)    
            }
            else
            {
                   res.status(200).send([]) 
            }
        }) 

        
        
    }
    catch(e)
    {
        res.status(400).send(e)
    }
  
})

router.get("/booking/vehicle/:mobile",auth,async (req,res)=>{
   
    try
{
    const mobile = req.params.mobile
    const vehicles= await Vehicle.find({driverid: mobile})  
    res.status(200).send(vehicles.map((vehicle)=>{
        return vehicle.number
    }))      
}
catch(e)
{
    res.status(400).send(e)
}

})


router.get("/booking/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const booking = await Booking.findOne({id})
        if(booking!=null)
        {
             res.status(200).send(booking)   
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
 /*   const id = req.params.id
    Booking.findOne({id},(e, a)=>{
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


router.patch("/booking/:id",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['vehicle','status']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /*const booking = await Booking.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const booking = await Booking.findOne({id})
        if(booking!=null)
        {
            updates.forEach((update)=>{
                booking[update] = req.body[update] 
            })
            await booking.save() 
             res.status(200)
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

router.delete("/booking/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const booking = await Booking.findOneAndDelete({id})
        if(booking!=null)
        {
             res.status(200).send(booking)   
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

router.get("/booking/me",auth,async (req,res)=>{
    try
    {
        await req.user.populate('bookings').execPopulate()
        res.status(200).send(req.user.bookings) 
    }
    catch(e)
    {
        res.status(400).send(e)
    }
 /*   const id = req.params.id
    Booking.findOne({id},(e, a)=>{
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




module.exports = router