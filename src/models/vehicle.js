const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)

const vehicleSchema = mongoose.Schema({
    id:
    {
        type: Number,
        default: () => {
           return parseInt(nanoid())
        }
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
        type: String,
        required: true  ,
        ref : 'Vehicleowner'  
    } ,
    rc:
    {
        type: String
    },
    rcimage:
    {
        type: Buffer
    },
    status:
    {
        type: Number,
        default: 0
    }
}
,{
    timestamps: true
})

const vehicle  = mongoose.model('Vehicle',vehicleSchema)

module.exports = vehicle