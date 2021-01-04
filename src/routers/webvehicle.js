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

router.get("/getvehicledata", async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const vehicle = await Vehicle.find({ status: 0 })
            let data = {
                vehicle: vehicle
            }
            return res.render('vehicle_request_action', { data })
        }
        else {
            console.log('admin not found in all finance')
            return res.redirect('/')
        }
    }
    catch (e) {
        console.log(e)
        return res.redirect('/')
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
            res.redirect('/getvehicledata')
        }
    }
    catch (e) {
        res.redirect('/getvehicledata')
    }
})

router.post("/vehicle_request_action/:id", async (req, res) => {
    try {
        const id = req.params.id
        const vehicle = await Vehicle.findOne({ id })
        if (vehicle) {
            // const obj  = {...req.body}
            
            await vehicle.remove()
            res.redirect('/getvehicledata')
        }
    }
    catch (e) {
        res.redirect('/getvehicledata')
    }
})


module.exports = router