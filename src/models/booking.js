const mongoose =  require('mongoose')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)
const Invoice = require('../models/invoice')
let moment = require('moment-timezone')


const bookingSchema  = mongoose.Schema({
    id: {
        type: Number,
        default: () => {
           return parseInt(nanoid())
        }
    },

    owner:
    {
        type: String,
        required:true,
        ref: 'Vehicleowner'
    },
    vehicle:
    {
       type: String   
    },

    vehicleowner:
    {
        type: String
    },

    vehicleownermobile:
    {
        type:String
    },

    contact:
    {
        type: String,
        
    },

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
    //add mine name
    
    loading:
    {
        type: String,
        required: true
    },
    status:
    {
        type: String,
        enum : ['PENDING','COMPLETED'],
        default: 'PENDING'
    },
    date:
    {
        type: String,
        
    }
},{
    timestamps: true
})

bookingSchema.pre('save', async function (next) {
    const invoice = this
    invoice.date = moment(new Date(invoice.createdAt)).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString()
    next()
})

const Booking  = mongoose.model('Booking',bookingSchema)

module.exports = Booking