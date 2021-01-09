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
    }
},{
    timestamps: true
})



const Booking  = mongoose.model('Booking',bookingSchema)

module.exports = Booking