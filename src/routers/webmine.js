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


router.get('/webmine', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const mines = await Mine.find({})

            let data = {
                mine: mines,
                cities: ['Bhopal', 'Funcity']
            }
            return res.render('mines_list', { data })

        }
        else {
            
            return res.redirect("/")
        }
    }
    catch (e) {
        
        return res.redirect("/")
    }
})


router.get('/webspecificmine/:id', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const id = req.params.id
            const mine = await Mine.findOne({ id })
            if (mine != null) {
                await mine.populate('invoices').execPopulate()
                let data = {
                    mine: mine,
                    invoices: mine.invoices
                }
                return res.render('mine', { data })

            }
            else {
               
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

router.post('/webspecificmine/:id', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const updates = Object.keys(req.body)
            const allowedUpdates = ['id', 'name', 'area', 'trailer', 'active', 'tyres', 'bodytype', 'loading', 'rate', 'etl', 'latitude',
                'longitude', 'landmark']
            const isValidOperation = updates.every((update) => {
                return allowedUpdates.includes(update)
            })
            if (!isValidOperation) {
               
            }
            else {
                const id = req.params.id
                const mine = await Mine.findOne({ id })
                if (mine) {
                    updates.forEach((update) => {
                        if (update == "active") {
                          
                            mine[update] = (req.body[update] == "true")
                        }
                        else {
                            mine[update] = req.body[update]
                        }

                    })
                    await mine.save()
                    return res.redirect('/webspecificmine/' + id)
                }
                else {
                 
                    return res.redirect('/webmine')
                }
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


module.exports = router