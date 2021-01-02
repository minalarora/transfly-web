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
const mine = require('../models/mine')
router.use(cookieParser())


router.get('/webareamanagerall', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const areamanager = await AreaManager.find({ status: 2 })

            let data = {
                areamanager: []
            }
            for (var i = 0; i < areamanager.length; i++) {
                //  await areamanager[i].populate('mines').execPopulate()
                console.log(areamanager[i].mobile)
                var mines = await Mine.find({ areamanager: areamanager[i].mobile }).exec()
                console.log("mines", mines)
                let t = areamanager[i].toObject()
                // t.mines = areamanager[i].mines
                t.mines = mines
                data.areamanager.push(t)
            }
            return res.render('area_manager_list', { data })
        }
        else {
            console.log('admin not found in all area manager')
            return res.redirect("/")
        }
    }
    catch (e) {
        console.log(e)
        return res.redirect("/webareamanagerall")
    }
})

router.get('/webspecificareamanager/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token }).exec()
        if (admin) {
            const mobile = req.params.mobile
            const areamanager = await AreaManager.findOne({ mobile })
            if (areamanager != null) {
                //  await areamanager.populate('mines').execPopulate()
                var mines = await Mine.find({ areamanager: areamanager.mobile }).exec()
                var allmines = await Mine.find({}).exec()
                let t = areamanager.toObject()
                t.mines = mines
                t.allmines = allmines

                let data = {
                    areamanager: t
                }
                console.log(data)
                return res.render('area_manager_profile', { data })

            }
            else {
                console.log('areamanager member not found')
                return res.redirect("/areamanagerall")
            }
        }
        else {
            console.log('admin not found in single areamanager')
            return res.redirect("/")
        }
    }
    catch (e) {
        console.log(e)
        return res.redirect("/areamanagerall")
    }
})


router.get("/areamanagerrequest", async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const areamanager = await AreaManager.find({ status: 1 })
            let data = {
                areamanager: areamanager
            }
            return res.render('areamanager_request', { data })
        }
        else {
            console.log('admin not found in all finance')
            return res.redirect("/")

        }
    }
    catch (e) {
        console.log(e)
        return res.redirect("/areamanagerrequest")
    }

})

router.post('/update_am_mines/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const mobile = req.params.mobile
            console.log(req.body)
            const areamanager = await AreaManager.findOne({ mobile })
            if (areamanager) {

                var newminess = Object.keys(req.body)
                console.log("newminess", newminess);

                var newmines = newminess.map((mine) => {
                    return parseInt(mine)
                })
                console.log("newmines", newmines);

                var oldminess = await Mine.find({ areamanager: mobile })
                var oldmines = oldminess.map((mine) => {
                    return mine.id
                })
                console.log("old", oldmines);

                newmines.forEach((mine) => {
                    Mine.findOneAndUpdate({ id: mine }, { areamanager: mobile }).exec()
                })

                var nullmines = oldmines.filter((mine) => {
                    return (newmines.includes(mine) == false)
                })
                console.log("nullmines", nullmines);

                nullmines.forEach((mine) => {
                    Mine.findOneAndUpdate({ id: mine }, { areamanager: null }).exec()
                })
                console.log("updated");

                return res.redirect("/webspecificareamanager/" + mobile)

            }
            else {
                return res.send("area manager not found")
            }

        }
        else {
            console.log('admin not found in all finance')
            return res.redirect("/")
        }
    }
    catch (e) {
        console.log(e.message)
        return res.redirect("/")
    }
})


router.get("/areamanager_request_action/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile

        const areamanager = await AreaManager.findOne({ mobile })
        if (areamanager) {
            // const obj  = {...req.body}


            areamanager["status"] = 2
            await areamanager.save()
            res.redirect('/areamanagerrequest')
        }
    }
    catch (e) {
        res.redirect('/areamanagerrequest')
    }
})

router.post("/areamanager_request_action/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile
        const areamanager = await AreaManager.findOne({ mobile })
        if (areamanager) {
            // const obj  = {...req.body}
            const updates = Object.keys(req.body)

            updates.forEach((update) => {
                areamanager[update] = "NOT AVAILABLE",
                    areamanager[req.body[update]] = undefined
            })

            areamanager["status"] = 0
            await areamanager.save()
            res.send({ areamanager })
            res.redirect('/areamanagerrequest')
        }
    }
    catch (e) {
        res.redirect('/areamanagerrequest')
    }
})


router.get('/getareamanagerdata/:mobile', async (req, res) => {
    const mobile = req.params.mobile
    const areamanager = await AreaManager.findOne({ mobile })
    const object = areamanager.toObject()

    delete object.__v
    delete object.tokens
    delete object._id

    const mines = Mine.find({ areamanager: null })
    object.mines = mines

    //ajax api made to sedn data of request of area manager
    return res.send(object)
})


module.exports = router
