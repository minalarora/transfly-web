const express = require('express')
const router = new express.Router()
const session = require('express-session');
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
var ssn;

router.get('/', async (req, res) => {
    ssn = req.session;
   

    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (ssn.role == "admin") {
        return res.redirect("/webadmin")
    }
    else if (ssn.role == "finance") {
        return res.redirect("/webfinance")
    }
    else {
        let data = { message: "", color: "" }
        console.log("get of login", data)
        return res.render('login', { data })
    }
})

router.post('/', async (req, res) => {
    try {
        data = { message: "", color: "" }

        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        if (req.body.role == "admin") {
            const admin = await Admin.findByMobile(req.body.mobile, req.body.password)
            if (admin == null) {
                data.message = "mobile or password wrong";
                data.color = "danger";
                console.log("admin not loggedin", data)
                return res.render("login", { data })
            }
            else {
                ssn = req.session;
                ssn.role = "admin" //setting session variable 
                let token = await admin.generateToken()
                return res.status(200).cookie('Authorization', token).redirect('/webadmin')
            }
        }
        else {
            const finance = await Finance.findByMobile(req.body.mobile, req.body.password)
            if (finance == null) {
                data.message = "mobile or password wrong";
                data.color = "danger";
                console.log(data)
                res.render("login", { data })
            }
            else {
                ssn = req.session;
                ssn.role = "finance" //setting session variable 
                let token = await finance.generateToken()
                return res.status(200).cookie('Authorization', token).redirect('/webfinance')
            }
        }
    }
    catch (e) {
        //error
        
        data.message = "mobile or password wrong";
        data.color = "danger";
        console.log(data)
        res.render("login", { data })
    }
})

module.exports = router