const validator =  require('validator')
const mongoose =  require('mongoose')
const jwt = require("jsonwebtoken")
const Mine  = require('../models/mine')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 5)



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
        type: Buffer,
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
        type: Buffer,
        default:null
    },
    sta:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    staimage:
    {
        type: Buffer,
        default:null
    },
    pan:
    {
        type: String,
        default: "NOT AVAILABLE",
       
    },
    panimage:
    {
        type: Buffer,
        default:null
    },
    aadhaar:
    {
        type: String,
        default: "NOT AVAILABLE"
        
    },
    aadhaarimage:
    {
        type: Buffer,
        default:null
    },
    mininglicense: {
        type: String,
        default: "NOT AVAILABLE"
    },
    mininglicenseimage:
    {
        type: Buffer,
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