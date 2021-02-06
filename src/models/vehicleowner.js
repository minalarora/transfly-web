const validator = require("validator")
const mongoose = require('mongoose')
const Booking = require('./booking')
const Invoice = require('./invoice')
const Vehicle = require('./vehicle')
const Notification = require('./notification')
const jwt = require('jsonwebtoken')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 5)



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
        Notification.createNotification(user.id,text,0)
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