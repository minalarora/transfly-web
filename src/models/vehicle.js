const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({
    id:
    {
        type: Number,
        default: 0 
    },
    number: {
        type: String,
        unique: true,
        required: true,
    },
    rc: 
    {
        type: String,
        unique: true,
        required: true
    },
    vehiclename: {
        type: String,
        required: true
    },
    driverid: {
        type: Number,
        required: true    
    }
}
,{
    timestamps: true
})

const vehicle  = mongoose.model('Vehicle',vehicleSchema)

module.exports = vehicle