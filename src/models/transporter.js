const validator =  require('validator')
const mongoose =  require('mongoose')
const jwt = require("jsonwebtoken")
const Mine  = require('../models/mine')
var Notification = require('./notificationtransporter')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 5)
const fetch = require("node-fetch")



const transporterSchema  =  mongoose.Schema({
    id:
    {
        type: String,
        unique: true,
     default: () => {
        return "TS:" + nanoid()
        }
    },

    
    profile:
    {
        type: String,
        default: null
    },
    firebase:
    {
        type: [String],
        default:[]
    },
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
        maxlength: [12,"Invalid Mobile Number"]
    }
    ,
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
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
    gst:
    {
        type: String,
        default: "NOT AVAILABLE",
       
    },
    gstimage:
    {
        type: String,
        default:null
    },
    sta:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    staimage:
    {
        type: String,
        default:null
    },
    pan:
    {
        type: String,
        default: "NOT AVAILABLE",
       
    },
    panimage:
    {
        type: String,
        default:null
    },
    aadhaar:
    {
        type: String,
        default: "NOT AVAILABLE"
        
    },
    aadhaarimage:
    {
        type: String,
        default:null
    },
    mininglicense: {
        type: String,
        default: "NOT AVAILABLE"
    },
    mininglicenseimage:
    {
        type: String,
        default:null
    },
    tokens: [
        {
            token : {
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
,{
    timestamps: true
})


transporterSchema.pre('save',async function(next){
    const user  = this
    if(user.panimage && user.aadhaarimage && user.staimage && user.gstimage && user.mininglicenseimage && (user.status == 0))
    {
        user.status = 1
        let text = "Thank you for submitting your KYC details, you can check the status in few hours under 'My Profile'"
        const notification = new Notification({user: user.id,text})
        await notification.save()
        user.firebase.forEach((token) => {
            try {
               
             
                sendFirebaseMessage2(token, "TRANSFLY", text)

            }
            catch (e) {
                    console.log(e.message)
            }
        })
    }
    // invoice.amount = invoice.tonnage * invoice.rate
    // invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - invoice.shortage
    // invoice.date = invoice.updatedAt.toString().split("GM")[0]
    next()
})

transporterSchema.statics.findByMobile = async (mobile,password)=>{
    const transporter  = await Transporter.findOne({mobile,password})
    if(!transporter)
    {
        throw new Error('unable to login')
    }
    else
    {
        return transporter
    }
}

transporterSchema.methods.generateToken = async function(){
    const transporter  = this
    const token  = jwt.sign({_id: transporter.id},'transfly',{
        expiresIn: '30d'
    })
    transporter.tokens  = transporter.tokens.concat({token})
    await transporter.save()
    return token
}

// transporterSchema.pre('remove',async function(next){
//     const user = this
//     await Mine.updateMany({
//         transporter : user.mobile
//     },
//     { $set : { transporter : undefined }},
//      function(err, result) {
//             if (err) {
//              //(err)
//             } else {
//              //(result)
//             }
//           })
//     next()
// })


transporterSchema.virtual('invoices',{
    ref: 'Invoice',
    localField: 'id',
    foreignField: 'transporter'
  })

  transporterSchema.virtual('notificationtransporter', {
    ref: 'Notificationtransporter',
    localField: 'id',
    foreignField: 'user'
})

transporterSchema.virtual('transporterrequest', {
    ref: 'Transporterrequest',
    localField: 'id',
    foreignField: 'requestuser'
})

transporterSchema.methods.toJSON = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    delete userobject.gstimage
    delete userobject.staimage
    delete userobject.panimage
    delete userobject.aadhaarimage
    delete userobject.mininglicenseimage
    delete userobject.profile
    return userobject
}

const Transporter = mongoose.model('Transporter',transporterSchema)




module.exports = Transporter

const sendFirebaseMessage2 =  function(token,title,message)
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
    console.log(res)
     //(res.status)
  }).catch((e)=>{
    console.log(e)
   //(e)
  }) 
  
 
}
catch(e)
{
 //(e)
}
  

  
}