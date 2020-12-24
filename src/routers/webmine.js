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


router.get('/webmine',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mines= await Mine.find({})  
        
            let data ={
                mine: mines,
                cities: [ 'Bhopal','Funcity']
            }
           return res.render('mines_list',{data})
            
        }
        else
        {
            console.log('admin not found in web mine')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})


router.get('/webspecificmine/:id',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const id = req.params.id
            const mine = await Mine.findOne({id})
            if(mine!=null)
            {
                await mine.populate('invoices').execPopulate()
                let data = {
                    mine: mine,
                    invoices: mine.invoices
                }
              return  res.render('mine',{data})
                 
            }
            else
            {
               console.log('mine not found')
            }
        }
        else
        {
            console.log('admin not found in single mine')
        }
                 
    }
    catch(e)
    {
        console.log(e)
    }
})

router.post('/webspecificmine/:id',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const updates = Object.keys(req.body)
            const allowedUpdates =  ['id','name','area','trailer','active','tyres','bodytype','loading','rate','etl','latitude',
            'longitude','landmark']
            const isValidOperation = updates.every((update)=>{
                                       return allowedUpdates.includes(update)
                                                            })
        if(!isValidOperation)
        {
            console.log('invalid operation')
        }
        else
        {
            const id = req.params.id
            const mine = await Mine.findOne({id})
            if(mine)
            {
                updates.forEach((update)=>{
                    if(update == "active")
                    {
                       mine[update] = Boolean(req.body[update])
                    }
                    else
                    {
                    mine[update] = req.body[update] 
                    }
                    
                })
                await mine.save() 
                return res.redirect('/webspecificmine/'+ id)
            }
            else
            {
                console.log('mine not found')
            }
        }
        }
        else
        {
            console.log(e)
        }
    }
    catch(e)
    {
        console.log(e)
    }
})


module.exports = router