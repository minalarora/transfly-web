const express = require('express')
const router  = new express.Router()
const Admin = require('../models/admin')
const AreaManager = require('../models/areamanager')
const Booking = require('../models/booking')
const Fieldstaff = require('../models/fieldstaff')
const Finance = require('../models/finance')
const Invoice  = require('../models/invoice')
const Mine =  require('../models/mine')
const Ticket =  require('../models/ticket')
const Transporter = require('../models/transporter')
const Vehicle = require('../models/vehicle')
const VehicleOwner = require("../models/vehicleowner")

const jwt= require('jsonwebtoken')
const auth = require("../auth/auth")
var cookieParser = require('cookie-parser')
const vehicle = require('../models/vehicle')
 
router.use(cookieParser())

router.get('/webspecificinvoice/:id',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const id = req.params.id
            const invoice = await Invoice.findOne({id})
             if(invoice!=null)
            {
                let data ={
                    invoice: {}
                }
 
                   
                    let t =  invoice.toObject()
                
                    const mine = await Mine.findOne({id: invoice.mine})
                    const vehicleowner = await VehicleOwner.findById({_id: invoice.owner})
                    t.mine = mine.name
                    t.vehicleowner = vehicleowner.name
                    t.city  = mine.area
                    data.invoice = {...t}
                  
                
    
                return res.render('invoice',{data})
                  
            }
            else
            {
                console.log('invoice member not found')
            }    
        }
        else
        {
            console.log('admin not found in single invoice')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webinvoiceall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const invoice= await Invoice.find({}) 
            let data ={
                invoice: []
            }

            for(var i = 0;i<invoice.length;i++)
            {

               
                let t =  invoice[i].toObject()
            
                const mine = await Mine.findOne({id: invoice[i].mine})
                const vehicleowner = await VehicleOwner.findById({_id: invoice[i].owner})
                t.mine = mine.name
                t.vehicleowner = vehicleowner.firstname + " " + vehicleowner.lastname
                t.city  = mine.area
                data.invoice.push(t)
              
            }

            console.log(data)
           return res.render('invoicelist',{data})
        }
        else
        {
            console.log('admin not found in all invoice')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})



router.get('/webfinanceinvoice',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
            if(req.query.status)
            {
                let page = parseInt(req.query.page)
                if(page<1)
                {
                    page = 1;
                }
                const invoice= await Invoice.find({status: req.query.status},null,{skip: (page * 10-10),limit: 10}).exec() 
                let data ={
                    invoice: []
                }
                if(invoice.length == 0)
                {
                    res.redirect('/webfinanceinvoice?status='+ req.query.status + '&page=' + (page -1))
                }
                for(var i = 0;i<invoice.length;i++)
                {
    
                   
                    let t =  invoice[i].toObject()
                
                    const mine = await Mine.findOne({id: invoice[i].mine})
                    const vehicleowner = await VehicleOwner.findById({_id: invoice[i].owner})
                    t.mine = mine.name
                    t.vehicleowner = vehicleowner.name
                    t.city  = mine.area
                    data.invoice.push(t)
                  
                }

                data.prev = page - 1
                data.next = page + 1
                data.page = page
                
                if(req.query.status == "PENDING")
                {
                    return res.render('finance_pending_invoices',{data})
                }
                else
                {
                    return res.render('finance_invoice_list',{data})
                }
               
            }
            else
            {
                console.log('admin not found in all invoice')
            } 
            }
         else
        {

        }
        }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webupdatependinginvoice/:id',async (req,res)=>{
    try
    {
        
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
            const id = req.params.id
            const invoice = await Invoice.findOne({id})
            if(invoice!=null)
            {
                let data ={
                    invoice: {}
                }
 
                   
                    let t =  invoice.toObject()
                
                    const mine = await Mine.findOne({id: invoice.mine})
                    const vehicleowner = await VehicleOwner.findById({_id: invoice.owner})
                    console.log(vehicleowner)
                    t.mine = mine.name
                    t.vehicleowner = vehicleowner.name
                    t.city  = mine.area
                    data.invoice = {...t}
                return res.render('update_pending_invoice',{data})
                  
            }
            else
            {
                console.log('invoice member not found')
            }    
        }
    }
    catch(e)
    {

    }
})

router.post('/webupdatependinginvoice/:id',async (req,res)=>{
    try
    {
        
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
           
            const id = req.params.id
           const invoice = await Invoice.findOne({id})
            if(invoice!=null)
            {
                const updates = Object.keys(req.body)
                console.log(req.body)
                const allowedUpdates = ['id','vehicleno','tonnage','rate','amount','hsd','cash','tds',
        'officecharge','shortage','balanceamount','challantotransporter','balanceamountcleared','status']
                const isValidOperation = updates.every((update)=>{
                                           return allowedUpdates.includes(update)
                                                                })
            if(!isValidOperation)
            {
                console.log('invalid operation')
            }
            else
            {
                
              
                    updates.forEach((update)=>{
                       
                       
                            invoice[update] = req.body[update] 
                        
                        
                    })
                    invoice["status"] = "COMPLETED"
                    await invoice.save() 

                return res.redirect('/webfinanceinvoice?status=PENDING&page=1')
                  
                }
            
        }
        else
        {
            console.log('invoice not found')
        }
    }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webcompletedinvoice/:id',async (req,res)=>{
    try
    {
        
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
            const id = req.params.id
            const invoice = await Invoice.findOne({id})
            if(invoice!=null)
            {
                let data ={
                    invoice: {}
                }
 
                   
                    let t =  invoice.toObject()
                
                    const mine = await Mine.findOne({id: invoice.mine})
                    const vehicleowner = await VehicleOwner.findById({_id: invoice.owner})
                    console.log(vehicleowner)
                    t.mine = mine.name
                    t.vehicleowner = vehicleowner.name
                    t.city  = mine.area
                    data.invoice = {...t}
                return res.render('finance_completed_invoice',{data})
                  
            }
            else
            {
                console.log('invoice member not found')
            }    
        }
    }
    catch(e)
    {

    }
})


router.get('/webupdatecompletedinvoice/:id',async (req,res)=>{
    try
    {
        
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
            const id = req.params.id
            const invoice = await Invoice.findOne({id})
            if(invoice!=null)
            {
                let data ={
                    invoice: {}
                }
 
                   
                    let t =  invoice.toObject()
                
                    const mine = await Mine.findOne({id: invoice.mine})
                    const vehicleowner = await VehicleOwner.findById({_id: invoice.owner})
                    console.log(vehicleowner)
                    t.mine = mine.name
                    t.vehicleowner = vehicleowner.name
                    t.city  = mine.area
                    data.invoice = {...t}
                return res.render('finance_update_completed_invoice',{data})
                  
            }
            else
            {
                console.log('invoice member not found')
            }    
        }
    }
    catch(e)
    {

    }
})

router.post('/webupdatecompletedinvoice/:id',async (req,res)=>{
    try
    {
        
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
        if(finance)
        {
           
            const id = req.params.id
           const invoice = await Invoice.findOne({id})
            if(invoice!=null)
            {
                const updates = Object.keys(req.body)
                console.log(req.body)
                const allowedUpdates = ['id','vehicleno','tonnage','rate','amount','hsd','cash','tds',
        'officecharge','shortage','balanceamount','challantotransporter','balanceamountcleared','status']
                const isValidOperation = updates.every((update)=>{
                                           return allowedUpdates.includes(update)
                                                                })
            if(!isValidOperation)
            {
                console.log('invalid operation')
            }
            else
            {
                
              
                    updates.forEach((update)=>{
                       
                       
                            invoice[update] = req.body[update] 
                        
                        
                    })
                    
                    await invoice.save() 

                    console.log('hellooooooooo')
                return res.redirect('/webcompletedinvoice/'+ id)
                  
                }
            
        }
        else
        {
            console.log('invoice not found')
        }
    }
    }
    catch(e)
    {
        console.log(e)
    }
})


module.exports =  router
