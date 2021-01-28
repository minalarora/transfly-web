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

router.use(cookieParser())

router.get("/vehiclerequest", async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const vehicles = await Vehicle.find({ status: 0 })
            let data = {
                vehicle: vehicles
            }
            return res.render('vehicle_request_list', { data })
        } else {

            return res.redirect('/')
        }
    } catch (e) {

        return res.redirect('/')
    }

})

router.get('/getvehicledata/:id', async (req, res) => {
    try {
        const id = req.params.id
        const vehicle = await Vehicle.findOne({ id })
        const object = vehicle.toObject();
        const vehicleowner = await VehicleOwner.findOne({ id: vehicle.driverid })
        object["vehicleownername"] = vehicleowner.name
        object["vehicleownermobile"] = vehicleowner.mobile
        delete object.__v
        delete object._id


        return res.send(object)


    } catch (e) {

    }
})
router.get("/vehicle_request_action/:id", async (req, res) => {
    try {
        const id = req.params.id
        const vehicle = await Vehicle.findOne({ id })
        if (vehicle) {
            // const obj  = {...req.body}


            vehicle["status"] = 1
            await vehicle.save()
            res.redirect('/vehiclerequest')
        }
    } catch (e) {
        res.redirect('/vehiclerequest')
    }
})

router.post("/vehicle_request_action/:id", async (req, res) => {
    try {
        const id = req.params.id
        const vehicle = await Vehicle.findOne({ id })
        if (vehicle) {
            // const obj  = {...req.body}

            await vehicle.remove()
            res.redirect('/vehiclerequest')
        }
    } catch (e) {
        res.redirect('/vehiclerequest')
    }
})

router.get('/webvehicle/image/:id', async (req, res) => {
    try {
        let id = req.params.id
       //("running")
        let user = await Vehicle.findOne({ id })
        if (user != null) {
            res.set('Content-Type', 'image/png')
            res.send(user.rcimage)
        }
        else {
            return res.status(400)
        }
    }
    catch (e) {

        return res.status(400)
    }
})


module.exports = router