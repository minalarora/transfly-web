const express = require('express')
const router = new express.Router()
const Booking = require('../models/booking')
const Vehicleowner = require('../models/vehicleowner') // maine kiya h
const VehicleOwner = require('../models/vehicleowner')
const Vehicle = require('../models/vehicle')
const Notification = require('../models/notification')
const FieldStaff = require('../models/fieldstaff')
const AreaManager  = require('../models/areamanager')
const Mine = require('../models/mine')
const auth = require('../auth/auth')
const firebase = require('../values')
let moment = require('moment-timezone')

router.post("/booking", auth, async (req, res) => {
    try {
        if (req.user.status == 2) {
            // const vehicle = await Vehicle.findOne({number: req.body.vehicle})
            // vehicle.contact = req.body.contact
            // await vehicle.save()
            const booking = new Booking({ ...req.body, owner: req.user.id, vehicleowner: req.user.name, vehicleownermobile: req.user.mobile })
            await booking.save()
            await Vehicle.findOneAndUpdate({ number: req.body.vehicle }, { active: false, contact: req.body.contact })
            
            // req.user.firebase.forEach((token) => {
            //     try {
            //         firebase.sendFirebaseMessage(token, "TRANSFLY", "Your booking from " + booking.minename + " to " + booking.loading + " has been successfully created.")

            //     }
            //     catch (e) {

            //     }
            // })

            let text = "Your booking from " + booking.minename + " to " + booking.loading + " has been successfully created."
             Notification.createNotification(req.user.id,text,0)
             let m = await Mine.findOne({id: booking.mineid})
             let fs  = await FieldStaff.findOne({id: m.fieldstaff})
             let am = await AreaManager.findOne({id: m.areamanager})
             let date = moment(new Date()).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString()
             try
             {
                firebase.sendMessageFour(fs.mobile,req.body.vehicle,date,req.body.minename,req.body.loading,req.body.contact)
                
                firebase.sendMessageFour(am.mobile,req.body.vehicle,date,req.body.minename,req.body.loading,req.body.contact)
             }
             catch(e)
             {

             }
             //(number,vehicle,date,from,to,driver)
          

            return res.status(200).send("done")
        }
        else {
            res.status(402).send("COMPLETE YOUR KYC FIRST")
        }
    }
    catch (e) {
        res.status(400).send(e.message)
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

router.get("/allbooking/vehicleowner", auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'bookings',
            match: {
                status: 'PENDING'
            }
            , options: {
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()

      
        res.status(200).send(req.user.bookings)
       

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
    catch (e) {
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



router.get("/allbooking/fieldstaff", auth, async (req, res) => {
    try {
        if (req.user.status == 2) {
            await req.user.populate(
                {
                    path: 'mines',
                    options: {
                        sort: {
                            createdAt: -1
                        }
                    }
                }).execPopulate()

            let minearray = req.user.mines.map((mine) => {
                return mine.id
            })
            //mongoose.find({title: {$in: sd}})
            const bookings = await Booking.find({ mineid: { $in: minearray }, status: 'PENDING' }).sort({ createdAt: -1 }).exec(function (err, bookings) {
                if (bookings) {
                    res.status(200).send(bookings)
                }
                else {
                    res.status(200).send([])
                }
            })
        }
        else {
            res.status(200).send([])
        }



    }
    catch (e) {
        res.status(400).send(e.message)
    }

})

router.get("/allbooking/areamanager", auth, async (req, res) => {
    try {
        if (req.user.status == 2) {
            await req.user.populate(
                {
                    path: 'mines',
                    options: {
                        sort: {
                            createdAt: -1
                        }
                    }
                }).execPopulate()

            let minearray = req.user.mines.map((mine) => {
                return mine.id
            })
            //mongoose.find({title: {$in: sd}})
            const bookings = await Booking.find({ mineid: { $in: minearray }, status: 'PENDING' }).sort({ createdAt: -1 }).exec(function (err, bookings) {
                if (bookings) {
                    res.status(200).send(bookings)
                }
                else {

                    res.status(200).send([])
                }
            })
        }
        else {
            res.status(200).send([])
        }

    }
    catch (e) {
        res.status(400).send(e.message)
    }

})




router.get("/booking/vehicle/:id", auth, async (req, res) => {

    try {
        const id = req.params.id
        const vehicles = await Vehicle.find({
            driverid: id,
            status: 1
        })
        res.status(200).send(vehicles.map((vehicle) => {
            return vehicle.number
        }))
    }
    catch (e) {
        res.status(400).send(e.message)
    }

})


router.get("/booking/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const booking = await Booking.findOne({ id })
        if (booking != null) {
            res.status(200).send(booking)
        }
        else {
            return res.status(400)
        }
    }
    catch (e) {
        res.status(400).send(e.message)
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


router.patch("/booking/:id", auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['vehicle', 'status']
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation) {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /*const booking = await Booking.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const booking = await Booking.findOne({ id })
        if (booking != null) {
            updates.forEach((update) => {
                booking[update] = req.body[update]
            })
            await booking.save()
            return res.status(200)
        }
        else {
            return res.status(400)
        }
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete("/booking/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const booking = await Booking.findOneAndDelete({ id })
        if (booking != null) {
            await Vehicle.findOneAndUpdate({ number: booking.vehicle }, { active: true })
            res.status(200).send(booking)
        }
        else {
            res.status(400).send("booking not found")
        }

    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.get("/booking/me", auth, async (req, res) => {
    try {
        await req.user.populate('bookings').execPopulate()
        res.status(200).send(req.user.bookings)
    }
    catch (e) {
        res.status(400).send(e.message)
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