const mongoose =  require('mongoose')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)
const Invoice = require('../models/invoice')

const bookingSchema  = mongoose.Schema({
    id: {
        type: Number,
        default: () => {
           return parseInt(nanoid())
        }
    },
    vehicleid:
    {
       type: Number     
    },
    mineid:
    {
        type: Number,
        required: true
    },
    loading:
    {
        type: String,
        required: true
    },
    status:
    {
        type: String,
        enum : ['PENDING','ACTIVE'],
        default: 'PENDING'
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicleowner'
    }
},{
    timestamps: true
})



const Booking  = mongoose.model('Booking',bookingSchema)

module.exports = Booking