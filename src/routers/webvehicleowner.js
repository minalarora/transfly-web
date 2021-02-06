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

router.use(cookieParser())

router.get('/webvehicleownerall', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {


            let page = parseInt(req.query.page)
            if (page < 1) {
                page = 1;
            }
            const vehicleowner = await VehicleOwner.find({ status: 2 }, null, { skip: (page * 50 - 50), limit: 50 }).exec()
            let data = {
                vehicleowner: []
            }
            data.prev = page - 1
            data.next = page + 1
            data.page = page

            for (var i = 0; i < vehicleowner.length; i++) {
                let v = await vehicleowner[i].populate('vehicles').execPopulate()
                let t = vehicleowner[i].toObject()

                data.vehicleowner.push({
                    ...t,
                    vehicles: vehicleowner[i].vehicles
                })
            }
            if (vehicleowner.length == 0) {
                if (page == 1) { // this runs when no invoice exist so just rendering page with empty data
                    return res.render("vehicle_owner_list", { data })
                } else {

                    return res.redirect('/webvehicleownerall?page=' + (page - 1))
                }
            }
            ////("data",data.vehicleowner[0].mobile)
            return res.render('vehicle_owner_list', { data })
        } else {
            return res.redirect('/')
        }
    } catch (e) {
        return res.redirect('/')
    }
})

router.get('/webvehicleowner/activate/:mobile/:activate', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token }).exec()
        if (admin) {
            const mobile = req.params.mobile
            const activate = req.params.activate
            const areamanager = await VehicleOwner.findOne({ mobile })
            if (areamanager) {
                let isActive = (activate == 'true')
                areamanager.active = isActive
                await areamanager.save()
                return res.redirect("/webvehicleownerall")
            }
            else {
                return res.redirect("/webvehicleownerall")
            }

        }
        else {
            return res.redirect("/")
        }
    }
    catch (e) {
        return res.redirect("/webvehicleownerall")
    }
})



router.get('/webspecificvehicleowner/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            let page = parseInt(req.query.page)
            if (page < 1) {
                page = 1;
            }
            const mobile = req.params.mobile
            const vehicleowner = await VehicleOwner.findOne({ mobile })

            let data = {
                vehicleowner: {}
            }

            await vehicleowner.populate('vehicles').execPopulate()
            let invoices = await Invoice.find({ owner : vehicleowner.id }, null, { skip: (page * 20 - 20), limit: 20 }).exec()
            //vehicleowner.populate({ path: 'invoices' }, null, { skip: (page * 1 - 1), limit: 1 }).execPopulate()

            data.prev = page - 1
            data.next = page + 1
            data.page = page
            let t = vehicleowner.toObject()
            data.vehicleowner = {
                ...t,
                invoices: invoices,
                vehicles: vehicleowner.vehicles

            }

            if (invoices.length == 0) {
                if (page == 1) { // this runs when no invoice exist so just rendering page with empty data
                    return res.render("vehicle_owner_profile", { data })
                } else {

                    res.redirect('/webspecificvehicleowner/' + mobile + '?page=' + (page - 1))
                }
            }




          
            return res.render('vehicle_owner_profile', { data })
        } else {
            
            return res.redirect('/')
        }
    } catch (e) {
       
        return res.redirect('/')
    }
})

router.get("/vehicleownerrequest", async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const vehicleowner = await VehicleOwner.find({ status: 1 })
            let data = {
                vehicleowner: vehicleowner
            }
            return res.render('vehicleowner_request', { data })
        } else {
           
            return res.redirect('/')
        }
    } catch (e) {
        
        return res.redirect('/')
    }

})


router.get("/vehicleowner_request_action/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile
        const vehicleowner = await VehicleOwner.findOne({ mobile })
        if (vehicleowner) {
            // const obj  = {...req.body}


            vehicleowner["status"] = 2
            await vehicleowner.save()
            // let text = "Please complete your KYC under 'My Profile' section to start using this app."
       
        
            // Notification.createNotification(vehicleowner.id,text,0)
            res.redirect('/vehicleownerrequest')
        }
    } catch (e) {
        res.redirect('/vehicleownerrequest')
    }
})

router.post("/vehicleowner_request_action/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile
        const vehicleowner = await VehicleOwner.findOne({ mobile })
        if (vehicleowner) {
            // const obj  = {...req.body}
            const updates = Object.keys(req.body)

            updates.forEach((update) => {
                vehicleowner[update] = "NOT AVAILABLE",
                    vehicleowner[req.body[update]] = undefined
            })

            vehicleowner["status"] = 0
            await vehicleowner.save()
            res.redirect('/vehicleownerrequest')
        }
    } catch (e) {
        res.redirect('/vehicleownerrequest')
    }
})


router.get('/getvehicleownerdata/:mobile', async (req, res) => {
    const mobile = req.params.mobile
    const vehicleowner = await VehicleOwner.findOne({ mobile })
    const object = vehicleowner.toObject()

    delete object.__v
    delete object.tokens
    delete object._id

    return res.send(object)

})

router.get('/webvehicleowner/image/:mobile/:type',async (req,res)=>{
    try
    {
        let mobile = req.params.mobile
        let type = req.params.type
        let user  = await VehicleOwner.findOne({mobile})
        if(user!=null)
        {
            res.set('Content-Type', 'image/png')
            res.send(user[type])
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

router.get('/vehicleowner/image/:mobile/:type',async (req,res)=>{
    try
    {
        let mobile = req.params.mobile
        let type = req.params.type
        let user  = await VehicleOwner.findOne({mobile})
        if(user!=null)
        {
            res.set('Content-Type', 'image/png')
            res.send(user[type])
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


module.exports = router