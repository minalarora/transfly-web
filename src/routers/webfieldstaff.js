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

router.get('/webfieldstaffall', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const fieldstaff = await Fieldstaff.find({ status: 2 }).exec()

            let data = {
                fieldstaff: []
            }
            for (var i = 0; i < fieldstaff.length; i++) {
                await fieldstaff[i].populate('mines').execPopulate()
                let t = fieldstaff[i].toObject()

                if (fieldstaff[i].mines.length != 0) {
                    t.mine = fieldstaff[i].mines[0].name
                }
                else {
                    t.mine = "NOT ALLOTTED"
                }

                data.fieldstaff.push(t)

            }



            return res.render('fieldstaff_list', { data })
        }
        else {
            console.log('admin not found in all area manager')
        }

    }
    catch (e) {
        console.log(e)
    }
})

router.get('/webspecificfieldstaff/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const mobile = req.params.mobile
            const fieldstaff = await Fieldstaff.findOne({ mobile })
            if (fieldstaff != null) {
                // await fieldstaff.populate('mines').execPopulate()
                // if(fieldstaff.mines.length !=0 )
                // {
                // let data = {
                //     fieldstaff: {...fieldstaff,mine:fieldstaff.mines[0].name  }
                // }
                // console.log(data)
                // return res.render('field_staff_profile',{data})
                // }
                // else
                // {
                //     let data = {
                //         fieldstaff: {...fieldstaff,mine:"NOT ALLOTTED"  }
                //     }
                //     return res.render('field_staff_profile',{data})
                // }    



                let data = {
                    fieldstaff: {}
                }
                await fieldstaff.populate('mines').execPopulate()
                let t = fieldstaff.toObject()

                if (fieldstaff.mines.length != 0) {
                    t.mine = fieldstaff.mines[0].name
                }
                else {
                    t.mine = "NOT ALLOTTED"
                }
                var allmines = await Mine.find({}).exec()
                t.allmines = allmines
                data.fieldstaff = t;

                console.log(data.fieldstaff.mine)
                return res.render('field_staff_profile', { data })

            }
            else {
                console.log('fieldstaff member not found')
            }
        }
        else {
            console.log('admin not found in single fieldstaff')
        }
    }
    catch (e) {
        console.log(e)
    }
})


router.post('/update_fs_mine/:mobile', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const mobile = req.params.mobile
            console.log(req.body)
            const areamanager = await Fieldstaff.findOne({ mobile })
            if (areamanager) {

                var newmines = Object.values(req.body)
                console.log("new m", newmines);

                var oldminess = await Mine.find({ fieldstaff: mobile })

                var oldmines = oldminess.map((mine) => {
                    return mine.id
                })
                console.log("oldmines", oldmines);

                newmines.forEach((mine) => {
                    Mine.findOneAndUpdate({ id: parseInt(mine) }, { fieldstaff: mobile }).exec()
                })

                var nullmines = oldmines.filter((mine) => {
                    return newmines.includes(mine) == false
                })

                console.log("null", nullmines);
                nullmines.forEach((mine) => {
                    Mine.findOneAndUpdate({ id: mine }, { fieldstaff: null }).exec()
                })

                return res.redirect("/webspecificfieldstaff/" + mobile)

            }
            else {
                console.log('admin ')
            }

        }
        else {
            console.log('admin not found in all finance')
        }
    }
    catch (e) {
        console.log(e.message)
    }
})

router.get('/revokemine/:name',async (req,res)=>{
    try{

        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
           
          const name = req.params.name
          let mine  = await Mine.findOneAndUpdate({name},{fieldstaff:null})
          return res.redirect("/webspecificfieldstaff/" + mine.fieldstaff)

        }
    }
    catch(e)
    {

    }
})

router.get("/fieldstaffrequest", async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ mobile: decoded._id, "tokens.token": token })
        if (admin) {
            const fieldstaff = await Fieldstaff.find({ status: 1 })
            let data = {
                fieldstaff: fieldstaff
            }
            return res.render('fieldstaff_request', { data })
        }
        else {
            console.log('admin not found in all finance')
        }
    }
    catch (e) {
        console.log(e)
    }

})


router.get("/fieldstaff_request_action/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile
        const fieldstaff = await Fieldstaff.findOne({ mobile })
        if (fieldstaff) {
            // const obj  = {...req.body}


            fieldstaff["status"] = 2
            await fieldstaff.save()
            res.redirect("/fieldstaffrequest")
        }
    }
    catch (e) {
        res.redirect("/fieldstaffrequest")
    }
})

router.post("/fieldstaff_request_action/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile
        const fieldstaff = await Fieldstaff.findOne({ mobile })
        if (fieldstaff) {
            // const obj  = {...req.body}
            const updates = Object.keys(req.body)

            updates.forEach((update) => {
                fieldstaff[update] = "NOT AVAILABLE",
                    fieldstaff[req.body[update]] = undefined
            })

            fieldstaff["status"] = 0
            await fieldstaff.save()
            res.redirect("/fieldstaffrequest")
        }
    }
    catch (e) {
        res.redirect("/fieldstaffrequest")
    }
})


router.get('/getfieldstaffdata/:mobile', async (req, res) => {
    const mobile = req.params.mobile
    const fieldstaff = await Fieldstaff.findOne({ mobile })
    const object = fieldstaff.toObject()

    delete object.__v
    delete object.tokens
    delete object._id

    return res.send(object)



})


module.exports = router
