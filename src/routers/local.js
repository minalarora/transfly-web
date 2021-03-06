const express = require('express')
const router = new express.Router()
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')
const Vehicle = require('../models/vehicle') // maine kiya h
const Mine = require('../models/mine')
const Loading = require('../models/loading')
const Booking = require('../models/booking')
const Notification = require('../models/notification')
const AreaManager = require('../models/areamanager')
const FieldStaff = require('../models/fieldstaff')
const Invoice = require('../models/invoice')
const Message  = require('../values')
const auth = require('../auth/auth')
const jwt = require('jsonwebtoken')
var multer = require('multer')
var firebase = require('../values')
let moment = require('moment-timezone')
const Admin = require('../models/admin')
const BackOffice = require('../models/backoffice')
const email = require('../email')

router.post("/local/validate",async (req,res)=>{
    try
    {
        let mobile = req.body.mobile
        let user = await VehicleOwner.findOne({ mobile })
        if(user)
        {
            return res.status(200).send("User found!")
        }
        else
        {
            return res.status(400).send("User not found!")
        }
    }
    catch(e)
    {
        return res.status(400).send("User not found!")
    }
})

router.post("/local/admin",async (req,res)=>{
    try
    {
        let mobile = req.body.mobile
        let password = req.body.password
        let user = await Admin.findOne({ mobile,password })
        if(user)
        {
            return res.status(200).send("User found!")
        }
        else
        {
            return res.status(400).send("User not found!")
        }
    }
    catch(e)
    {
        return res.status(400).send("User not found!")
    }
})


router.post("/local/user",async (req,res)=>{
    try
    {
        let name = req.body.mobile
        let password = req.body.password
        let user = await BackOffice.findOne({ name,password })
        if(user)
        {
            return res.status(200).send("User found!")
        }
        else
        {
            return res.status(400).send("User not found!")
        }
    }
    catch(e)
    {
        return res.status(400).send("User not found!")
    }
})



router.post("/local/vehicles",async (req,res)=>{
    try
    {
        let mobile = req.body.mobile
        let user = await VehicleOwner.findOne({ mobile })
        if(user)
        {
            const vehicles= await Vehicle.find({driverid: user.id})  
            res.status(200).send(vehicles)      
        }
        else
        {
            res.status(400).send("no user found!")
        }
    }
    catch(e)
    {
        res.status(400).send("no user found!")
    }
})


router.get("/local/mines",async (req,res)=>{
    try
    {
        const mines= await Mine.find({})  
        res.status(200).send(mines)  
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})

router.get("/local/loadings",async (req,res)=>{
    try
    {
        const mines= await Loading.find({})  
        res.status(200).send(mines)  
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})


router.post('/local/booking',async (req,res)=>{
    try
    {
        let mobile = req.body.mobile
        let user = await VehicleOwner.findOne({ mobile })
        if(user && user.status == 2)
        {
            let vehiclearray = await Vehicle.find({driverid:user.id})
            let updatedva = vehiclearray.filter((v)=>{
                if(v.number.includes(req.body.vehicle) )
                {
                  return true
                }
                else
                {
                  return false
                }
              })
        
              if(updatedva.length > 0)
              {
                const booking = new Booking({ ...req.body, owner: user.id, vehicleowner: user.name, vehicleownermobile: user.mobile })
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
                //  Notification.createNotification(req.user.id,text,0)
                
                const notification = new Notification({user: user.id,text,type:0})
                await notification.save()
                user.firebase.forEach((token) => {
                    try {
                       
                        firebase.sendFirebaseMessage(token, "TRANSFLY", text)
        
                    }
                    catch (e) {
        
                    }
                })
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
            else 
            {
                res.status(400).send("error1")
            }
        }
        else
        {
            res.status(400).send("error2")
        }
    }
    catch(e)
    {
        res.status(400).send("error3"+ e.message )
    }
})


router.get("/local/transporters",async (req,res)=>{
    try {
        const transporters = await Transporter.find({ status: 2 })
        res.status(200).send(transporters)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


router.get("/local/reporttransporter",async (req,res)=>{
    try {
        let user = await Transporter.findOne({ mobile: req.query.mobile })
        if (user && user.status == 2) {
            let invoice = await Invoice.find({ transporter: user.id }, null, {
                sort: {
                    createdAt: -1
                }
            }).exec()

            let data = {
                invoice: []
            }
            if (req.query.from && req.query.to) {


                const from = new Date(req.query.from)
                //const to = new Date(parseInt(req.query.to))
                     const to = new Date(req.query.to + " 23:59:00+00:00")
                    let filterInvoices = invoice.filter((invoice) => {
                        let invoiceDate = new Date(invoice.date + "+00:00")
                        return (invoiceDate >= from && invoiceDate <= to)
                    })
                    let totalinvoice = {}
                    totalinvoice.amount  = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.amount = totalinvoice.amount + i.amount
                    })


                    totalinvoice.hsd = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.hsd = totalinvoice.hsd + i.hsd
                    })

                    totalinvoice.cash = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.cash = totalinvoice.cash + i.cash
                    })

                    totalinvoice.tds = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.tds = totalinvoice.tds + i.tds
                    })

                    totalinvoice.officecharge = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.officecharge = totalinvoice.officecharge + i.officecharge
                    })


                    totalinvoice.balanceamount = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.balanceamount = totalinvoice.balanceamount + i.balanceamount
                    })

                    totalinvoice.shortage = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.shortage = totalinvoice.shortage + i.shortage
                    })

                    totalinvoice.transporteramount  = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.transporteramount = totalinvoice.transporteramount + i.transporteramount
                    })

                    totalinvoice.tonnage = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.tonnage = totalinvoice.tonnage + i.tonnage
                    })

                    totalinvoice.rate = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.rate = totalinvoice.rate + i.rate
                    })

                    

                    filterInvoices.push(totalinvoice)
                    
                    data.invoice = filterInvoices

            }
            else {
                data.invoice = []

            }

            return res.render('webview_areamanager_invoice2', { data })
        }
        else {
            let data = {
                invoice: []
            }
            data.invoice = []
            return res.render('webview_areamanager_invoice2', { data })
        }
    }
    catch (e) {
        let data = {
            invoice: []
        }
        data.invoice = []
        return res.render('webview_areamanager_invoice2', { data })
    }
})


router.get("/local/reportmine",async (req,res)=>{
    try {
        let user = await Mine.findOne({ id: req.query.id })
        if (user) {
            let invoice = await Invoice.find({ mineid : user.id }, null, {
                sort: {
                    createdAt: -1
                }
            }).exec()

            let data = {
                invoice: []
            }
            if (req.query.from && req.query.to) {


                const from = new Date(req.query.from)
                //const to = new Date(parseInt(req.query.to))
                     const to = new Date(req.query.to + " 23:59:00+00:00")
                    let filterInvoices = invoice.filter((invoice) => {
                        let invoiceDate = new Date(invoice.date + "+00:00")
                        return (invoiceDate >= from && invoiceDate <= to)
                    })
                    let totalinvoice = {}
                    totalinvoice.amount  = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.amount = totalinvoice.amount + i.amount
                    })


                    totalinvoice.hsd = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.hsd = totalinvoice.hsd + i.hsd
                    })

                    totalinvoice.cash = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.cash = totalinvoice.cash + i.cash
                    })

                    totalinvoice.tds = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.tds = totalinvoice.tds + i.tds
                    })

                    totalinvoice.officecharge = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.officecharge = totalinvoice.officecharge + i.officecharge
                    })


                    totalinvoice.balanceamount = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.balanceamount = totalinvoice.balanceamount + i.balanceamount
                    })

                    totalinvoice.shortage = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.shortage = totalinvoice.shortage + i.shortage
                    })

                    totalinvoice.transporteramount  = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.transporteramount = totalinvoice.transporteramount + i.transporteramount
                    })

                    totalinvoice.tonnage = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.tonnage = totalinvoice.tonnage + i.tonnage
                    })

                    totalinvoice.rate = 0
                    filterInvoices.forEach((i)=>{
                        totalinvoice.rate = totalinvoice.rate + i.rate
                    })

                    

                    filterInvoices.push(totalinvoice)
                    data.invoice = filterInvoices

            }
            else {
                data.invoice = []

            }

            return res.render('webview_areamanager_invoice2', { data })
        }
        else {
            let data = {
                invoice: []
            }
            data.invoice = []
            return res.render('webview_areamanager_invoice2', { data })
        }
    }
    catch (e) {
        let data = {
            invoice: []
        }
        data.invoice = []
        return res.render('webview_areamanager_invoice2', { data })
    }
})

router.get("/local/bookings",async (req,res)=>{
    try
    {
        
            await Booking.find({ status: 'PENDING' }).sort({ createdAt: -1 }).exec(function (err, bookings) {
                if (bookings) {
                    res.status(200).send(bookings)
                }
                else {
                    res.status(200).send([])
                }
            })    
        
           
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})


router.post("/local/delete",async (req,res)=>{
    try
    {
       for(i in req.body.bookingid)
       {
          
            const booking = await Booking.findOneAndDelete({ id: req.body.bookingid[i] })
            if (booking != null) 
            {
            await Vehicle.findOneAndUpdate({ number: booking.vehicle }, { active: true })
            let text = "Dear Customer, your current booking from " + booking.minename  + " to " + booking.loading + " has been cancelled. Please connect to us for more information."
            createNotification(booking.owner,text,0) 
           }
           if(i == 0)
           {
            email.sendEmail('DELETE BOOKING',"Booking has been deleted for " + booking.minename +" by user "  +  req.body.user)
           }
            
       }

       return res.status(200).send("done")

      
       
                       
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})



let createNotification = async (user,text,type)=>{
    try
    {
       if(type)
    {
       const notification = new Notification({user,text,type})
       await notification.save()
       var vehicleowner = await VehicleOwner.findOne({ id: user })
       vehicleowner.firebase.forEach((token) => {
           try {
              
               Message.sendFirebaseMessage(token, "TRANSFLY", text)

           }
           catch (e) {

           }
       })
       
    }
    else
    {
       const notification = new Notification({user,text})
       await notification.save()
       let vehicleowner = await VehicleOwner.findOne({ id: user })
       vehicleowner.firebase.forEach((token) => {
           try {
               Message.sendFirebaseMessage(token, "TRANSFLY", text)

           }
           catch (e) {

           }
       })
    }
    return true;
   
    }
    catch(e)
    {
       
      return true
    }
    
}



module.exports = router