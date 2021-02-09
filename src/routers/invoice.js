const express = require('express')
const router = new express.Router()
const Invoice = require('../models/invoice')
const auth = require('../auth/auth')
const Booking = require('../models/booking')
const Vehicle = require('../models/vehicle')
const VehicleOwner = require('../models/vehicleowner')
const Transporter = require('../models/transporter')
const Vehicleowner = require('../models/vehicleowner') // maine kiya h
const Mine = require('../models/mine')
const firebase = require('../values')
const Notification = require('../models/notification')
const Message  = require('../values')
const AreaManager = require('../models/areamanager')



router.post("/invoice", auth, async (req, res) => {
    try {
        if (req.user.status == 2) {
            const invoice = new Invoice({...req.body,completedby:req.user.name,completedbyid: req.user.id})
            let t = await Transporter.findOne({id: req.body.transporter})
            invoice.transportername = t.name
            // invoice.transportername = 
            const booking = await Booking.findOneAndUpdate({ id: req.body.id }, { status: "COMPLETED" })
            await Vehicle.findOneAndUpdate({ number: booking.vehicle }, { active: true })
            await invoice.save()
            // let vehicleowner = await VehicleOwner.findOne({ id: booking.owner })
            // vehicleowner.firebase.forEach((token) => {
            //     try {
            //         firebase.sendFirebaseMessage(token, "TRANSFLY", "Dear Customer,  Your Vehicle No. " + booking.vehicle +" has been Loaded and is ready for its journey From " + booking.minename + " - to - " + booking.loading + " with HSD amount Rs. " + req.body.hsd + " and Cash amount Rs " + req.body.cash +". Thank you, TransFly")

            //     }
            //     catch (e) {

            //     }
            // })
            let text = booking.vehicle + " Loaded " + booking.minename + "-" +  booking.loading +" HSD Rs. "+req.body.hsd+" Cash Rs "+req.body.cash+"."
             // Notification.createNotification(booking.owner,text,1)
             //let text = "Thank you for submitting your KYC details, you can check the status in few hours under 'My Profile'"
             const notification = new Notification({user: booking.owner,text,type:0})
             await notification.save()
             const user = await VehicleOwner.findOne({id: booking.owner})
             user.firebase.forEach((token) => {
                 try {
                    
                     firebase.sendFirebaseMessage(token, "TRANSFLY", text)
     
                 }
                 catch (e) {
     
                 }
             })
             Message.sendMessageOne(booking.vehicleownermobile,booking.vehicle,booking.minename,booking.loading,req.body.hsd,req.body.cash)


            return res.status(200).send("DONE")
        }
        else {
            res.status(402).send("COMPLETE YOUR KYC FIRST")
        }
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /* const invoice  = new Invoice(req.body)
     invoice.save().then((a)=>{
             res.status(201)
             res.send(a)
     }).catch((e)=>{
             res.status(400)
             res.send(e)
     })*/
})

router.get("/allinvoice/vehicleowner/:status", auth, async (req, res) => {
    try {
        const status = req.params.status
        await req.user.populate({
            path: 'invoices',
            match:
            {
                status
            }
            , options: {
                limit: 100,
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()




        if (req.query.from && req.query.to) {
            // const from = new Date(parseInt(req.query.from))
            // const to = new Date(parseInt(req.query.to))
            const from = new Date(req.query.from)
            const to = new Date(req.query.to + " 23:59:00+00:00")

            // let filterInvoices = req.user.invoices.filter((invoice) => {
            //     let invoiceDate = new Date(invoice.createdAt)

            //     return (invoiceDate >= from && invoiceDate <= to)
            // })
            let filterInvoices = req.user.invoices.filter((invoice) => {
                let invoiceDate = new Date(invoice.date + "+00:00")
                return (invoiceDate >= from && invoiceDate <= to)
            })
            return res.status(200).send(filterInvoices)
        }
        else {
            return res.status(200).send(req.user.invoices)
        }


    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /* Invoice.find({}).then((a)=>{
         res.status(200)
         res.send(a)
     }).catch((e)=>{
         res.status(400)
         res.send(e)
     })*/
})

router.get("/allinvoice/areamanager/", auth, async (req, res) => {
    try {
        if (req.user.status == 2) {

            // const date = new Date(parseInt(timestamp))
            // const datestring = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
            await req.user.populate(
                {
                    path: 'mines'
                    ,
                    options: {
                        sort: {
                            createdAt: -1
                        }
                    }
                }).execPopulate()

            let minearray = req.user.mines.map((mine) => {
                return mine.id
            })
            if(req.type == "areamanager")
            {
                 await Invoice.find({ mineid: { $in: minearray } }).sort({ createdAt: -1 }).exec(function (err, invoices) {
                    if (invoices) {
                        if (req.query.from && req.query.to) {
                           
                            const from = new Date(req.query.from)
                        const to = new Date(req.query.to + " 23:59:00+00:00")
                        let filterInvoices = invoices.filter((invoice) => {
                            let invoiceDate = new Date(invoice.date + "+00:00")
                            return (invoiceDate >= from && invoiceDate <= to)
                        })
                            return res.status(200).send(filterInvoices)
                        }
                        else {
                            return res.status(200).send(invoices)
                        }
                       
                    }
                    else {
                        res.status(200).send([])
                    }
                })
            }
            else
            {
                await Invoice.find({ completedbyid: req.user.id }).sort({ createdAt: -1 }).exec(function (err, invoices) {
                    if (invoices) {
                        if (req.query.from && req.query.to) {
                            // const from = new Date(parseInt(req.query.from))
                            // const to = new Date(parseInt(req.query.to))
                            // let filterInvoices = invoices.filter((invoice) => {
                            //     let invoiceDate = new Date(invoice.createdAt)
                            //     return (invoiceDate >= from && invoiceDate <= to)
                            // })
                            const from = new Date(req.query.from)
                        const to = new Date(req.query.to + " 23:59:00+00:00")
                        let filterInvoices = invoices.filter((invoice) => {
                            let invoiceDate = new Date(invoice.date + "+00:00")
                            return (invoiceDate >= from && invoiceDate <= to)
                        })
                            return res.status(200).send(filterInvoices)
                        }
                        else {
                            return res.status(200).send(invoices)
                        }
                        // const selectedinvoices = invoices.filter((invoice)=>{
                        //     let mineDate = new Date(invoice.createdAt) 
                        //     let mineDateString  =  mineDate.getDate() + "/" + mineDate.getMonth() + "/" + mineDate.getFullYear()
                        //     return datestring == mineDateString
                        // })
                        // res.status(200).send(selectedinvoices)    
                    }
                    else {
    
                        res.status(200).send([])
                    }
                })   
            }
            //mongoose.find({title: {$in: sd}})
            
        }
        else {
            res.status(200).send([])
        }
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /* Invoice.find({}).then((a)=>{
         res.status(200)
         res.send(a)
     }).catch((e)=>{
         res.status(400)
         res.send(e)
     })*/
})

router.get("/allinvoice/transporter/", auth, async (req, res) => {
    try {
        //    const mines =  await Invoice

        //    req.user.populate(
        //         {
        //             path: 'mines',
        //             options:{
        //                 sort: {
        //                     createdAt: -1
        //                 }
        //             }
        //         }).execPopulate()

        //      let minearray = req.user.mines.map((mine)=>{
        //             return mine.id
        //      })   
        //mongoose.find({title: {$in: sd}})
        if (req.user.status == 2) {

            // const date = new Date(parseInt(timestamp))
            // const datestring = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
            await Invoice.find({ transporter: req.user.id }).sort({ createdAt: -1 }).exec(function (err, invoices) {
                if (invoices) {
                    if (req.query.from && req.query.to) {
                        // const from = new Date(parseInt(req.query.from))
                        // const to = new Date(parseInt(req.query.to))
                        // let filterInvoices = invoices.filter((invoice) => {
                        //     let invoiceDate = new Date(invoice.createdAt)
                        //     return (invoiceDate >= from && invoiceDate <= to)
                        // })
                        const from = new Date(req.query.from)
                    const to = new Date(req.query.to + " 23:59:00+00:00")
                    let filterInvoices = invoices.filter((invoice) => {
                        let invoiceDate = new Date(invoice.date + "+00:00")
                        return (invoiceDate >= from && invoiceDate <= to)
                    })
                        return res.status(200).send(filterInvoices)
                    }
                    else {
                        return res.status(200).send(invoices)
                    }
                    // const selectedinvoices = invoices.filter((invoice)=>{
                    //     let mineDate = new Date(invoice.createdAt) 
                    //     let mineDateString  =  mineDate.getDate() + "/" + mineDate.getMonth() + "/" + mineDate.getFullYear()
                    //     return datestring == mineDateString
                    // })
                    // res.status(200).send(selectedinvoices)    
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
    /* Invoice.find({}).then((a)=>{
         res.status(200)
         res.send(a)
     }).catch((e)=>{
         res.status(400)
         res.send(e)
     })*/
})

router.get("/invoice/timestamp/:timestamp", auth, async (req, res) => {
    try {
        const timestamp = req.params.timestamp
        const date = new Date(parseInt(timestamp))
        const datestring = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
        const invoices = await Invoice.find()
        const selectedinvoices = invoices.filter((invoice) => {
            let mineDate = new Date(invoice.createdAt)
            let mineDateString = mineDate.getDate() + "/" + mineDate.getMonth() + "/" + mineDate.getFullYear()
            return datestring == mineDateString
        })
        res.status(200).send(selectedinvoices)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


router.get("/invoice/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const invoice = await Invoice.findOne({ id })
        if (invoice != null) {
            res.status(200).send(invoice)
        }
        else {
            return res.status(400)
        }
    }
    catch (e) {
        res.status(400).send(e.message)
    }
    /* const id = req.params.id
     Invoice.findOne({id},(e, a)=>{
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


router.patch("/invoice/:id", auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id', 'vehicleno', 'tonnage', 'rate', 'amount', 'hsd', 'cash', 'tds',
            'officecharge', 'shortage', 'balanceamount', 'challantotransporter', 'balanceamountcleared', 'status']
        const isValidOperation = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation) {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
        /* const invoice = await Invoice.findOneAndUpdate({id},req.body,{
             new : true,
             runValidators: true
         })*/
        const invoice = await Invoice.findOne({ id })
        if (invoice != null) {
            updates.forEach((update) => {
                invoice[update] = req.body[update]
            })
            await invoice.save()
            res.status(200).send(invoice)
        }
        else {
            return res.status(400)
        }
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.delete("/invoice/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const invoice = await Invoice.findOneAndDelete({ id })
        if (invoice != null) {
            res.status(200).send(invoice)
        }
        else {
            return res.status(400)
        }

    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get("/invoice/me", auth, async (req, res) => {
    try {
        await req.user.populate('invoices').execPopulate()
        res.status(200).send(req.user.invoices)
    }
    catch (e) {
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