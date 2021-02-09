const validator = require("validator")
const mongoose = require('mongoose')
const Booking = require('./booking')
const Invoice = require('./invoice')
const Vehicle = require('./vehicle')
var Notification = require('./notification')
const jwt = require('jsonwebtoken')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 5)
const fetch = require("node-fetch")



const vehicleownerSchema = mongoose.Schema({
    id:
    {
        type: String,
        unique: true,
     default: () => {
        return "VO:" + nanoid()
        }
    },
    firebase:
    {
        type: [String],
        default:[]
    },
    profile:
    {
        type: Buffer,
        default: null
    },
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    mobile: {
        type: String,
        required: true,
        unique:true,
        maxlength: [12, "Invalid Mobile Number"],
        
    }
    ,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please fill valid email!")
            }
        }

    },
    password:
    {
        type: String,
        required: true
    },
    status:
    {
        type: Number,
        required: true,
        default: 0
    }
    ,
    active:
    {
        type: Boolean,
        default: true
    },
    accountno:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    ifsc:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    bankname:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    bankimage:
    {
        type: Buffer,
        default: null
    },
    profile:
    {
        type: Buffer,
        default: null
    },
    bankpersonname:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    pan:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    panimage:
    {
        type: Buffer,
        default: null
    },
    tds:
    {
        //tdsdeclaration
        type: String,
        default: "NOT AVAILABLE"

    },
    tdsimage:
    {
        type: Buffer,
        default: null
    },
    ename: {
        type: String,
        trim: true,
        uppercase: true,
        default: "NOT AVAILABLE"
    },
    erelation: 
    {
        type: String,
        trim: true,
        uppercase: true,
        default: "NOT AVAILABLE"  
    },
    emobile:{
        type: String,
        default: "NOT AVAILABLE",
        maxlength: [20,"Invalid Mobile Number"]
    },
   
    tokens: [
        {
            token: {
                type: String,
                createdAt: {
                    type: Date,
                    expires: '31d',
                    default: Date.now
                },
                required: true
            }
        }
    ]

}
    , {
        timestamps: true
    })


vehicleownerSchema.pre('save', async function (next) {
    const user = this
   
    if (user.panimage  && user.bankimage && (user.status == 0)) {
        user.status = 1
      
        let text = "Thank you for submitting your KYC details, you can check the status in few hours under 'My Profile'"
        const notification = new Notification({user: user.id,text,type:0})
        await notification.save()
        user.firebase.forEach((token) => {
            try {
               
                sendFirebaseMessage(token, "TRANSFLY", text)

            }
            catch (e) {

            }
        })
        
       // Notification.createNotification(user.id,text,0)
    }
    // invoice.amount = invoice.tonnage * invoice.rate
    // invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - invoice.shortage
    // invoice.date = invoice.updatedAt.toString().split("GM")[0]
    next()
})

vehicleownerSchema.statics.findByMobile = async (mobile, password) => {
    const vehicleowner = await VehicleOwner.findOne({ mobile, password })
    if (!vehicleowner) {
        throw new Error('unable to login')
    }
    else {
        return vehicleowner
    }
}



vehicleownerSchema.methods.generateToken = async function () {
    const vehicleowner = this
    const token = jwt.sign({ _id: vehicleowner.id }, 'transfly', {
        expiresIn: '30d'
    })
    vehicleowner.tokens = vehicleowner.tokens.concat({ token })
    await vehicleowner.save()
    return token
}


vehicleownerSchema.methods.toJSON = function () {
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    delete userobject.panimage
    delete userobject.tdsimage
    delete userobject.bankimage
    delete userobject.profile
    return userobject
}

vehicleownerSchema.virtual('bookings', {
    ref: 'Booking',
    localField: 'id',
    foreignField: 'owner'
})

vehicleownerSchema.virtual('invoices', {
    ref: 'Invoice',
    localField: 'id',
    foreignField: 'owner'
})

vehicleownerSchema.virtual('vehicles', {
    ref: 'Vehicle',
    localField: 'id',
    foreignField: 'driverid'
})

vehicleownerSchema.virtual('notifications', {
    ref: 'Notification',
    localField: 'id',
    foreignField: 'user'
})


vehicleownerSchema.pre('remove', async function (next) {
    const user = this
    await Booking.deleteMany({
        owner: user.id
    })
    await Invoice.deleteMany({
        owner: user.id
    })
    await Vehicle.deleteMany({
        driverid: id
    })
    

    next()

})





const VehicleOwner = mongoose.model('Vehicleowner', vehicleownerSchema)

module.exports = VehicleOwner

const sendFirebaseMessage =  function(token,title,message)
{
//   {
//     "to": "dZetVzzWRbeZAIM3XkZoHE:APA91bFIR-m52RlPaE0mG2soWJCOPuVTYftZqc6LF_vuotByfAtizznyfvtkM2l_ie2X9-8ecJHXP6VSSwq1gwpNq5nDL22vvod2GD3My5R-4MVpOyyJ2B_DIjawFMGdUzWrqvj1_1w_",
//     "notification": {
//       "title": "Shani so jaate hain",
//       "body": "good night",
//       "mutable_content": true
//       }
// }

  const obj = {}
  obj.to = token
  obj.notification = {}
  obj.notification.title = title
  obj.notification.body = message
  obj.notification["mutable_content"] = true
  
try
{
   fetch("https://fcm.googleapis.com/fcm/send",{
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "Authorization":"key=AAAAVbPt_qI:APA91bG0No1HJJBMFhq4lYPe76XOBOqFa54raGaxd-kLFS9x7lWC7C7dq14CZYiziU8b686-Jk0pJFkVR3xP6cVhsFSAFkT7auTe0F9RLg4IzOf6R0FlPscrAy0MYY320VN3UudV8uBr"
    },
    body: JSON.stringify(obj)
  }).then((res)=>{
    
     //(res.status)
  }).catch((e)=>{
   //(e)
  }) 
  
 
}
catch(e)
{
 //(e)
}
  

  
}