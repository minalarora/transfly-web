const validator = require("validator")
const mongoose = require('mongoose')
let moment = require('moment-timezone')
var Float = require('mongoose-float').loadType(mongoose);


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

    },
    contact:
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
        type: Float,
        required: true
    },
    rate:
    {
        type: Float,
        required: true
    },
    amount:
    {
        type: Float,
        default: 0

    },
    hsd:
    {
        type: Float,
        default: 0
    },
    cash:
    {
        type: Float,
        default: 0
    },
    tds:
    {
        type: Float,
        default: 0
    },
    officecharge:
    {
        type: Float,
        default: 0
    },
    shortage:
    {
        type: Float
        ,
        default: 0
    },
    balanceamount:
    {
        type: Float,
        default: 0
    },
    challantotransporter:
    {
        type: String,
        default: ""
    },
    balanceamountcleared:
    {
        type: String,
        default: ""
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
        default: "NA"
    },
    transporteramount:
    {
        type: Float,
        default: 0 

    }

}
    , {
        timestamps: true
    }
)

invoiceSchema.pre('save', async function (next) {
    const invoice = this
    invoice.amount = invoice.tonnage * invoice.rate
    invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - invoice.shortage 
    invoice.transporteramount = (invoice.tonnage * invoice.rate) - invoice.hsd - invoice.cash - invoice.shortage
    invoice.date = moment(new Date(invoice.createdAt)).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString()

    next()
})



const invoice = mongoose.model("Invoice", invoiceSchema)


module.exports = invoice