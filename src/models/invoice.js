const validator = require("validator")
const mongoose = require('mongoose')
let moment = require('moment-timezone')


const invoiceSchema = mongoose.Schema({
    id:
    {
        type: Number,

    },
    owner:
    {
        type: String,
        required: true,
        ref: 'Vehicleowner'
    },
    //minename and loading and vehicleownername
    vehicle:
    {
        type: String,
        required: true
    },
    vehicleowner:
    {
        type: String,

    },
    vehicleownermobile:
    {
        type: String,
        
    }
    ,
    mineid:
    {
        type: Number,
        required: true,
        ref: 'Mine'
    },

    minename:
    {
        type: String,
        required: true
    },

    loading:
    {
        type: String
    },

    tonnage:
    {
        type: Number,
        required: true
    },
    rate:
    {
        type: Number,
        required: true
    },
    amount:
    {
        type: Number,
        default: 0

    },
    hsd:
    {
        type: Number,
        default: 0
    },
    cash:
    {
        type: Number,
        default: 0
    },
    tds:
    {
        type: Number,
        default: 0
    },
    officecharge:
    {
        type: Number,
        default: 0
    },
    shortage:
    {
        type: Number
        ,
        default: 0
    },
    balanceamount:
    {
        type: Number,
        default: 0
    },
    challantotransporter:
    {
        type: String,
        default: "NA"
    },
    balanceamountcleared:
    {
        type: String,
        default: "NA"
    },
    status:
    {
        type: String,
        enum: ['PENDING', 'COMPLETED'],
        default: 'PENDING'
    },
    date:
    {
        type: String
    },
    transporter:
    {
        type: String,
        required: true,
        ref: 'Transporter'
    },
    transportername:
    {
        type: String,
        
    },
    modeofpayment:
    {
        type: String,
        default:"NA"
    }

}
    , {
        timestamps: true
    }
)

invoiceSchema.pre('save', async function (next) {
    const invoice = this
    invoice.amount = invoice.tonnage * invoice.rate
    invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - (invoice.shortage * invoice.rate)
    invoice.date = moment(new Date(invoice.createdAt)).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString()
   
    next()
})



const invoice = mongoose.model("Invoice", invoiceSchema)


module.exports = invoice