const express = require('express')
const router  = new express.Router()
const Invoice = require('../models/invoice')
const auth = require('../auth/auth')
const Booking = require('../models/booking')
const Vehicle = require('../models/vehicle')
const Mine  = require('../models/mine')

router.post("/invoice",auth,async (req,res)=>{
    try
    {
        if(req.user.status == 2)
        {
        const invoice  = new Invoice(req.body)
        const booking =await Booking.findOneAndUpdate({id: req.body.id},{status: "COMPLETED"})
        await Vehicle.findOneAndUpdate({number: booking.vehicle},{active: true})
        await invoice.save()
        return res.status(200).send("DONE")  
       }
        else
        {
        res.status(402).send("COMPLETE YOUR KYC FIRST")
        }          
    }
    catch(e)
    {
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

router.get("/allinvoice/vehicleowner",auth,async (req,res)=>{
    try
    {
         await req.user.populate({
            path: 'invoices'
            ,options:{
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()



        res.status(200).send(req.user.invoices)        
    }
    catch(e)
    {
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

router.get("/allinvoice/areamanager/:timestamp",auth,async (req,res)=>{
    try
    {
        if(req.user.status == 2)
        {
        const timestamp = req.params.timestamp
        const date = new Date(parseInt(timestamp))
        const datestring = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
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
        const invoices = await Invoice.find({mineid: {$in: minearray}}).sort({createdAt: -1}).exec(function(err,invoices){ 
            if(invoices)
            {
                const selectedinvoices = invoices.filter((invoice)=>{
                    let mineDate = new Date(invoice.createdAt) 
                    let mineDateString  =  mineDate.getDate() + "/" + mineDate.getMonth() + "/" + mineDate.getFullYear()
                    // console.log(mineDateString)
                    return datestring == mineDateString
                })
                res.status(200).send(selectedinvoices)    
            }
            else
            {   
                   res.status(200).send([]) 
            }
        }) 
    }
    else
    {
        res.status(200).send([]) 
    }        
    }
    catch(e)
    {
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

router.get("/allinvoice/transporter/:timestamp",auth,async (req,res)=>{
    try
    {
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
         if(req.user.status == 2)
         {
         const timestamp = req.params.timestamp
        const date = new Date(parseInt(timestamp))
        const datestring = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
       await Invoice.find({transporter: req.user.mobile}).sort({createdAt: -1}).exec(function(err,invoices){ 
            if(invoices)
            {
                const selectedinvoices = invoices.filter((invoice)=>{
                    let mineDate = new Date(invoice.createdAt) 
                    let mineDateString  =  mineDate.getDate() + "/" + mineDate.getMonth() + "/" + mineDate.getFullYear()
                    return datestring == mineDateString
                })
                res.status(200).send(selectedinvoices)    
            }
            else
            {
                
                   res.status(200).send([]) 
            }
        })         
    }
    else
    {
        res.status(200).send([])  
    }
}
    catch(e)
    {
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

router.get("/invoice/timestamp/:timestamp",auth,async (req,res)=>{
    try
    {
        const timestamp = req.params.timestamp
        const date = new Date(parseInt(timestamp))
        const datestring = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
        const invoices  = await Invoice.find()
        const selectedinvoices = invoices.filter((invoice)=>{
            let mineDate = new Date(invoice.createdAt) 
            let mineDateString  =  mineDate.getDate() + "/" + mineDate.getMonth() + "/" + mineDate.getFullYear()
            return datestring == mineDateString
        })
        res.status(200).send(selectedinvoices)
    }
    catch(e)
    {
        res.status(400).send(e.message)
    }
})


router.get("/invoice/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const invoice = await Invoice.findOne({id})
        if(invoice!=null)
        {
             res.status(200).send(invoice)   
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


router.patch("/invoice/:id",auth,async (req,res)=>{
    try
    {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id','vehicleno','tonnage','rate','amount','hsd','cash','tds',
        'officecharge','shortage','balanceamount','challantotransporter','balanceamountcleared','status']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
        const id = req.params.id
       /* const invoice = await Invoice.findOneAndUpdate({id},req.body,{
            new : true,
            runValidators: true
        })*/
        const invoice  = await Invoice.findOne({id})
        if(invoice!=null)
        {
            updates.forEach((update)=>{
                   invoice[update] = req.body[update] 
            })
            await invoice.save()
            res.status(200).send(invoice)   
        }
        else
        {
          return  res.status(400)
        }
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.delete("/invoice/:id",auth,async (req,res)=>{
    try
    {
        const id = req.params.id
        const invoice = await Invoice.findOneAndDelete({id})
        if(invoice!=null)
        {
             res.status(200).send(invoice)   
        }
        else
        {
          return  res.status(400)
        }
         
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.get("/invoice/me",auth,async (req,res)=>{
    try
    {
        await req.user.populate('invoices').execPopulate()
        res.status(200).send(req.user.invoices) 
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