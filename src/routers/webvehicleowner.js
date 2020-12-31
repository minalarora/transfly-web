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
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {


            let page = parseInt(req.query.page)
            if (page < 1) {
                page = 1;
            }
            const vehicleowner = await VehicleOwner.find({ status: 2 },null,{ skip: (page * 1 - 1), limit: 1 }).exec()
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
                if (page == 1) {    // this runs when no invoice exist so just rendering page with empty data
                    return res.render("vehicle_owner_list", { data })
                }
                else {

                  return res.redirect('/webvehicleownerall?page=' + (page - 1))
                }
            }
            // console.log("data",data.vehicleowner[0].mobile)
            return res.render('vehicle_owner_list', { data })
        }
        else {
            console.log('admin not found in all invoice')
        }
    }
    catch (e) {
        console.log(e)
    }
})


router.get('/webspecificvehicleowner/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
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
            await vehicleowner.populate({path: 'invoices'},null, { skip: (page * 1 - 1), limit: 1 }).execPopulate()

            data.prev = page - 1
            data.next = page + 1
            data.page = page
            let t = vehicleowner.toObject()
            data.vehicleowner = {
                ...t,
                invoices: vehicleowner.invoices,
                vehicles: vehicleowner.vehicles

            }

            if (vehicleowner.invoices.length == 0) {
                if (page == 1) {    // this runs when no invoice exist so just rendering page with empty data
                    return res.render("vehicle_owner_profile", { data })
                }
                else {

                    res.redirect('/webspecificvehicleowner/' + mobile + '?page=' + (page - 1))
                }
            }




            console.log("data", data)
            return res.render('vehicle_owner_profile', { data })
        }
        else {
            console.log('admin not found in all invoice')
        }
    }
    catch (e) {
        console.log(e)
    }
})

router.get("/vehicleownerrequest", async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const vehicleowner = await VehicleOwner.find({ status: 1 })
            let data = {
                vehicleowner: vehicleowner
            }
            return res.render('vehicleowner_request', { data })
        }
        else {
            console.log('admin not found in all finance')
        }
    }
    catch (e) {
        console.log(e)
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
            res.redirect('/vehicleownerrequest')
        }
    }
    catch (e) {
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
    }
    catch (e) {
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


module.exports = router