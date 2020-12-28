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
    }
,
    mineid:
    {
        type: Number,
        required: true
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