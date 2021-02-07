const mongoose = require('mongoose')

const firebase = require('../values')

const notificationSchema  = mongoose.Schema({

    user: 
    {
        type: String,
        ref: 'Vehicleowner',
        required:true,
    },
    text:
    {
        type: String,
        required:true

    },
    date:
    {
        type: String
    },
    type:
    {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
})


/**
 * vehicleownerSchema.statics.findByMobile = async (mobile, password) => {
    const vehicleowner = await VehicleOwner.findOne({ mobile, password })
    if (!vehicleowner) {
        throw new Error('unable to login')
    }
    else {
        return vehicleowner
    }
}
 * 
 */

 notificationSchema.statics.createNotification = async (user,text,type)=>{
     try
     {
        if(type)
     {
        const notification = new Notification({user,text,type})
        await notification.save()
        var vehicleowner = await VehicleOwner.findOne({ id: user })
        vehicleowner.firebase.forEach((token) => {
            try {
               
                firebase.sendFirebaseMessage(token, "TRANSFLY", text)

            }
            catch (e) {

            }
        })
        
     }
     else
     {
        const notification = new Notification({user,text})
        await notification.save()
        let vehicleowner = await VehicleOwner.findOne({ id: user })
        vehicleowner.firebase.forEach((token) => {
            try {
                firebase.sendFirebaseMessage(token, "TRANSFLY", text)

            }
            catch (e) {

            }
        })
     }
     return true;
    
     }
     catch(e)
     {
        throw new Error(e.message)
     }
     
 }


notificationSchema.pre('save', async function (next) {
    const notification = this
    //notification.date = moment(new Date(notification.createdAt)).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString() + "+00:00"
    notification.date = Date.now()
    next()
})


const Notification  = mongoose.model("Notification",notificationSchema)
module.exports = Notification

var VehicleOwner = require('./vehicleowner')