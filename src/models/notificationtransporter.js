const mongoose = require('mongoose')
var Transporter = require('./transporter')

const firebase = require('../values')

const notificationtransporterSchema  = mongoose.Schema({

    user: 
    {
        type: String,
        ref: 'Transporter',
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


 notificationtransporterSchema.statics.createNotification = async (user,text)=>{
    try
    {
       
       const notification = new Notificationtransporter({user,text})
       await notification.save()
       let vehicleowner = await Transporter.findOne({ id: user })
       vehicleowner.firebase.forEach((token) => {
           try {
               firebase.sendFirebaseMessage(token, "TRANSFLY", text)

           }
           catch (e) {

           }
       })
    
    return true;
   
    }
    catch(e)
    {
      
       throw new Error(e.message)
    }
    
}

notificationtransporterSchema.pre('save', async function (next) {
    const notification = this
    //notification.date = moment(new Date(notification.createdAt)).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString() + "+00:00"
    notification.date = Date.now()
    next()
})


const Notificationtransporter  = mongoose.model("Notificationtransporter",notificationtransporterSchema)
module.exports = Notificationtransporter

