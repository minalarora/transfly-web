const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')
const AreaManager = require('../models/areamanager')
const Booking = require('../models/booking')
const Fieldstaff = require('../models/fieldstaff')

const Finance = require('../models/finance')
const Invoice = require('../models/invoice')
const Mine = require('../models/mine')
const Ticket = require('../models/ticket')
const Transporter = require('../models/transporter')
const Vehicle = require('../models/vehicle')
const VehicleOwner = require("../models/vehicleowner")

const jwt = require('jsonwebtoken')
const auth = require("../auth/auth")
var cookieParser = require('cookie-parser')
const vehicle = require('../models/vehicle')

const db = require('../db/dbfile')
const mongoose = require("mongoose")
var Schema = mongoose.Schema;
var multer = require('multer')
var upload = multer({})
var transporterUpload = upload.fields([{ name: 'panimage', maxCount: 1 }, { name: 'aadhaarimage', maxCount: 1 }])
const Notificationtransporter = require('../models/notificationtransporter')
const Message  = require('../values')

router.use(cookieParser())

router.get('/webtransporterall', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const transporter = await Transporter.find({ status: 2 })

            let data = {
                transporter: []
            }
            for (var i = 0; i < transporter.length; i++) {
                await transporter[i].populate('mines').execPopulate()
                let t = transporter[i].toObject()
                t.mine = transporter[i].mines
                data.transporter.push(t)

            }
            return res.render('transporter_list', { data })
        }
        else {
            
            return res.redirect('/')
        }
    }
    catch (e) {
       
        return res.redirect('/')
    }
})


router.get('/webtransporter/activate/:mobile/:activate', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token }).exec()
        if (admin) {
            const mobile = req.params.mobile
            const activate = req.params.activate
            const areamanager = await Transporter.findOne({ mobile })
            if (areamanager) {
                let isActive = (activate == 'true')
                areamanager.active = isActive
                await areamanager.save()
                return res.redirect("/webtransporterall")
            }
            else {
                return res.redirect("/webtransporterall")
            }

        }
        else {
            return res.redirect("/")
        }
    }
    catch (e) {
        return res.redirect("/webtransporterall")
    }
})


router.get('/webspecifictransporter/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const mobile = req.params.mobile
            const transporter = await Transporter.findOne({ mobile })
            if (transporter != null) {
                // let data = {
                //     transporter: transporter
                // }
                await transporter.populate('mines').execPopulate()
                let t = transporter.toObject()
                t.mines = transporter.mines
                let data = {
                    transporter: { ...t }
                }
                return res.render('transporter_profile', { data })

            }
            else {
                
                return res.redirect('/webtransporterall')
            }
        }
        else {
             return res.redirect('/')
        }
    }
    catch (e) {
        
        return res.redirect('/')
    }
})

router.get("/transporterrequest", async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id : decoded._id, "tokens.token": token })
        if (admin) {
            const transporter = await Transporter.find({ status: 1 })
            let data = {
                transporter: transporter
            }
            return res.render('transporter_request', { data })
        }
        else {
          
            return res.redirect('/')
        }
    }
    catch (e) {
      
        return res.redirect('/')
    }

})


router.get("/transporter_request_action/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile
        const transporter = await Transporter.findOne({ mobile })
        if (transporter) {
            // const obj  = {...req.body}

            transporter["status"] = 2
            await transporter.save()
            let text ="Dear customer, your KYC has been approved. You can now use the features of the Transfly application."
            createNotification(transporter.id,text,0)
            
            res.redirect("/transporterrequest")

        }
    }
    catch (e) {
        res.redirect("/transporterrequest")
    }
})

router.post("/transporter_request_action/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile
        const transporter = await Transporter.findOne({ mobile })
        if (transporter) {
            // const obj  = {...req.body}
            const updates = Object.keys(req.body)

            updates.forEach((update) => {
                transporter[update] = "NOT AVAILABLE",
                    transporter[req.body[update]] = undefined
            })

            transporter["status"] = 0
            await transporter.save()
            let text ="Dear customer, your KYC has been rejected, please resubmit your KYC details. Thank you."
            createNotification(transporter.id,text,0)
            res.redirect("/transporterrequest")
        }
    }
    catch (e) {
        res.redirect("/transporterrequest")
    }
})


router.get('/gettransporterdata/:mobile', async (req, res) => {
    const mobile = req.params.mobile
    const transporter = await Transporter.findOne({ mobile })
    const object = transporter.toObject()

    delete object.__v
    delete object.tokens
    delete object._id

    return res.send(object)



})


router.get('/webtransporter/image/:mobile/:type',async (req,res)=>{
    try
    {
        let mobile = req.params.mobile
        let type = req.params.type
        let user  = await Transporter.findOne({mobile})
        if(user!=null)
        {
            let c = db.imagedb.model(user[type], 
                new Schema({ image: Buffer}), 
                user[type]);
    
                let imgobj = await c.find({})
            
                if(imgobj)
                {
                    res.set('Content-Type', 'image/png')
                    res.send(imgobj[0].image)    
                }
                else
                {
                    res.send(null)
                }     

          }
        else
        {
            return res.status(400)
        }         
    }
    catch(e)
    {
        
        return res.status(400)
    }
})





// router.get('/gettransporterimage/:mobile',async (req,res)=>{
//     const mobile = req.params.mobile
//     const transporter = await Transporter.findOne({mobile})
//      res.set('Content-Type','image/png')
//      res.send(transporter.staimage)
// })


// router.post('/transporter_request_action/:mobile',transporterUpload,async (req,res)=>
// {
//    //(req.body)
//    //("sds" + Object.keys(req.files))
// })

let createNotification = async (user,text)=>
{
    try
    {
       
       const notification = new Notificationtransporter({user,text})
       await notification.save()
       let vehicleowner = await Transporter.findOne({ id: user })
       vehicleowner.firebase.forEach((token) => {
           try {
               Message.sendFirebaseMessage(token, "TRANSFLY", text)

           }
           catch (e) {

           }
       })
    
    return true;
   
    }
    catch(e)
    {
      
       throw new Error(e.message)
    }
   
}

module.exports = router