const validator = require("validator")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 5)


const adminSchema = mongoose.Schema({
    id:
    {
        type: String,
        unique: true,
     default: () => {
        return "AD:" + nanoid()
        }
    },

    firebase:
    {
        type: String,
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
        unique: true,
        maxlength: [12, "Invalid Mobile Number"]
    },
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
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0

    },
    accountno: {
        type: String,
        default: "NOT AVAILABLE"
    },
    ifsc: {
        type: String,
        default: "NOT AVAILABLE"
    },
    bankname: {
        type: String,
        default: "NOT AVAILABLE"
    },
    pan: {
        type: String,
        default: "NOT AVAILABLE"

    },
    panimage: {
        type: Buffer,
    },
    aadhaar: {
        type: String,
        default: "NOT AVAILABLE"

    },
    aadhaarimage: {
        type: Buffer
    },
    ename: {
        type: String,
        trim: true,
        uppercase: true,
        default: "NOT AVAILABLE"
    },
    erelation: {
        type: String,
        trim: true,
        uppercase: true,
        default: "NOT AVAILABLE"
    },
    emobile: {
        type: String,
        maxlength: [20, "Invalid Mobile Number"],
        default: "NOT AVAILABLE"
    },
    tokens: [{
        token: {
            type: String,
            createdAt: {
                type: Date,
                expires: '31d',
                default: Date.now
            },
            required: true

        }
    }]
}, {
    timestamps: true
})


adminSchema.pre('save', async function(next) {
    const user = this
    if (user.panimage && user.aadhaarimage && (user.status == 0)) {
        user.status = 2
    }
    // invoice.amount = invoice.tonnage * invoice.rate
    // invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - invoice.shortage
    // invoice.date = invoice.updatedAt.toString().split("GM")[0]
    next()
})


adminSchema.statics.findByMobile = async(mobile, password) => {
    const admin = await Admin.findOne({ mobile, password })
    if (!admin) {
        throw new Error('unable to login')
    } else {
        return admin
    }
}

adminSchema.methods.generateToken = async function() {
    const admin = this
    const token = jwt.sign({ _id: admin.id }, 'transfly', {
        expiresIn: '30d'
    })
    admin.tokens = admin.tokens.concat({ token })
    await admin.save()
    return token
}

adminSchema.methods.getPublicProfile =  function() {
    const user = this
    const userobject = user.toObject()
    try
    {
    delete userobject.password
    delete userobject.tokens
    delete userobject.panimage
    delete userobject.aadhaarimage
    }
    catch(e)
    {
        
    }
    return userobject
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin