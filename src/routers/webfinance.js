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

router.get('/webfinance', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        if (finance) {
            var data = {
                finance: finance.getWebProfile()
            }
           
            return res.render("finance_admin_profile", { data })
        }
        else {
            
            return res.redirect("/")
        }

    }
    catch (e) {
       
        return res.redirect("/")
    }
})


router.get('/updatefinanceprofile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        if (finance) {
            var data = {
                finance: finance.getWebProfile()
            }
         
            return res.render("finance_profile_update", { data })
        }
        else {
            return res.redirect("/")
        }
    }
    catch (e) {
        return res.redirect("/")
    }
})


router.post('/updatefinanceprofile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ mobile: decoded._id, "tokens.token": token })
        if (finance) {
            const updates = Object.keys(req.body)
            const allowedUpdates = ['accountno', 'ifsc', 'bankname']
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update)
            })
            if (!isValidOperation) {
               
            }
            else {
                updates.forEach((update) => {
                    finance[update] = req.body[update]
                })

                await finance.save()
                return res.redirect('/webfinance')
            }


        }
        else {
          
            return res.redirect("/")
        }

    }
    catch (e) {
       
        return res.redirect("/")
    }
})

router.get('/webfinancelogout', async (req, res) => {
    try {
        

        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        if (finance) {
           
            finance.tokens = finance.tokens.filter((t) => {
                return t.token != token
            })
            await finance.save()
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    return console.log(err);
                }
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                return res.redirect('/');
            });
        }
        else {
            //admin not found
            return res.redirect("/")
        }
    }
    catch (e) {
      
        return res.redirect("/")
    }
})



//////////for admins super admin
router.get('/webfinanceall', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const finance = await Finance.find({})
            let data = {
                finance: finance
            }
            return res.render('finance_official_list', { data })
        }
        else {
            
            return res.redirect("/")
        }
    }
    catch (e) {
        
        return res.redirect("/")
    }
})

router.get('/webspecificfinance/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const mobile = req.params.mobile
            const finance = await Finance.findOne({ mobile })
            if (finance != null) {
                let data = {
                    finance: finance
                }
                return res.render('finance_official_profile', { data })

            }
            else {
             
                return res.redirect("/webfinanceall")
            }
        }
        else {
          
            return res.redirect("/")
        }
    }
    catch (e) {
        
        return res.redirect("/")
    }
})


module.exports = router