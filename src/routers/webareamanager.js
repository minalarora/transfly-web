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
const { findOneAndUpdate } = require('../models/mine')
router.use(cookieParser())


router.get('/webareamanagerall', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const areamanager = await AreaManager.find({ status: 2 })

            let data = {
                areamanager: []
            }
            for (var i = 0; i < areamanager.length; i++) {
                //  await areamanager[i].populate('mines').execPopulate()

                var mines = await Mine.find({ areamanager: areamanager[i].id }).exec()

                let t = areamanager[i].toObject()
                // t.mines = areamanager[i].mines
                t.mines = mines
                data.areamanager.push(t)
            }
            return res.render('area_manager_list', { data })
        }
        else {

            return res.redirect("/")
        }
    }
    catch (e) {

        return res.redirect("/webareamanagerall")
    }
})


router.get('/webareamanager/activate/:mobile/:activate', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token }).exec()
        if (admin) {
            const mobile = req.params.mobile
            const activate = req.params.activate
            const areamanager = await AreaManager.findOne({ mobile })
            if (areamanager) {
                let isActive = (activate == 'true')
                areamanager.active = isActive
                await areamanager.save()
                return res.redirect("/webareamanagerall")
            }
            else {
                return res.redirect("/webareamanagerall")
            }

        }
        else {
            return res.redirect("/")
        }
    }
    catch (e) {
        return res.redirect("/webareamanagerall")
    }
})

router.get('/webareamanager/revokemine/:mobile', async (req, res) => {
    try {

        // const token = req.cookies['Authorization']
        // const decoded = jwt.verify(token, 'transfly')
        // const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        // if (admin) {

            const mobile = req.params.mobile
            let areamanager = await AreaManager.findOne({mobile})
            if(areamanager)
            {
                await Mine.update({areamanager: areamanager.id}, {"$set":{"areamanager": null}}, {"multi": true}, (err, writeResult) => {});
    
                return res.redirect("/webareamanagerall")
            }
            else
            {
                return res.redirect("/webareamanagerall")
               
            }
           

        // }
    }
    catch (e) {
       
        return res.status(400).send(e.message)

    }
})


router.get('/webspecificareamanager/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token }).exec()
        if (admin) {
            const mobile = req.params.mobile
            const areamanager = await AreaManager.findOne({ mobile })
            if (areamanager != null) {
                //  await areamanager.populate('mines').execPopulate()
                var mines = await Mine.find({ areamanager: areamanager.id }).exec()
                var allmines = await Mine.find({}).exec()
                let t = areamanager.toObject()
                t.mines = mines
                t.allmines = allmines

                let data = {
                    areamanager: t
                }

                return res.render('area_manager_profile', { data })

            }
            else {

                return res.redirect("/webareamanagerall")
            }
        }
        else {

            return res.redirect("/")
        }
    }
    catch (e) {

        return res.redirect("/webareamanagerall")
    }
})


router.get("/areamanagerrequest", async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const areamanager = await AreaManager.find({ status: 1 })
            let data = {
                areamanager: areamanager
            }
            return res.render('areamanager_request', { data })
        }
        else {

            return res.redirect("/")

        }
    }
    catch (e) {

        return res.redirect("/areamanagerrequest")
    }

})

router.post('/update_am_mines/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const mobile = req.params.mobile
            const areamanager = await AreaManager.findOne({ mobile })
            if (areamanager) {

                var newminess = Object.keys(req.body)


                var newmines = newminess.map((mine) => {
                    return parseInt(mine)
                })


                var oldminess = await Mine.find({ areamanager: areamanager.id })
                var oldmines = oldminess.map((mine) => {
                    return mine.id
                })


                newmines.forEach((mine) => {
                    Mine.findOneAndUpdate({ id: mine }, { areamanager: areamanager.id }).exec()
                })

                var nullmines = oldmines.filter((mine) => {
                    return (newmines.includes(mine) == false)
                })


                nullmines.forEach((mine) => {
                    Mine.findOneAndUpdate({ id: mine }, { areamanager: null }).exec()
                })


                return res.redirect("/webspecificareamanager/" + mobile)

            }
            else {
                return res.send("area manager not found")
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

    // const mines = Mine.find({ areamanager: null })
    // object.mines = mines

    //ajax api made to sedn data of request of area manager
    return res.send(object)
})

router.get('/areamanager/image/:mobile/:type',async (req,res)=>{
    try
    {
        let mobile = req.params.mobile
        let type = req.params.type
        let user  = await AreaManager.findOne({mobile})
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

router.get('/webareamanager/image/:mobile/:type',async (req,res)=>{
    try
    {
        let mobile = req.params.mobile
        let type = req.params.type
        let user  = await AreaManager.findOne({mobile})
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
