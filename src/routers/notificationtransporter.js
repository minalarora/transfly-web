const express = require('express')
const router = new express.Router()
const auth = require('../auth/auth')
const firebase = require('../values')
const Notification = require('../models/notificationtransporter')
const VehicleOwner = require('../models/transporter')
const Vehicle = require('../models/vehicle')



router.get("/allnotificationtransporter", auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'notificationtransporter'
            , options: {
                limit:500,
                sort: { createdAt : -1}
            }
        }).execPopulate()

      
        res.status(200).send(req.user.notifications)
    
    }
    catch (e) {
        res.status(400).send(e.message)
    }
  
})

module.exports = router

