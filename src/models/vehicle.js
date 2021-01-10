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
    rcimage:
    {
        type: Buffer,
        default: null
    },
    tyres:
    {
        type: String,
        required:true
    },
    status:
    {
        type: Number,
        default: 0
    },
    date:
    {
        type: String
    },
    active:
    {
        type: Boolean,
        default: true
    }
}
,{
    timestamps: true
})

vehicleSchema.pre('save', async function (next) {
    const invoice = this
    invoice.date = invoice.createdAt.toString().split("GM")[0]
    next()
})

vehicleSchema.methods.toJSON = function()
{
    const vehicle = this
    const vehicleobject = vehicle.toObject()
    delete vehicleobject.rcimage
    return vehicleobject
}

const vehicle  = mongoose.model('Vehicle',vehicleSchema)

module.exports = vehicle