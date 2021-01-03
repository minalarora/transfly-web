const validator = require("validator")
const mongoose = require('mongoose')
const jwt= require('jsonwebtoken')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)


const resaleSchema  = mongoose.Schema({
    id: {
        type: Number,
        default: () => {
           return parseInt(nanoid())
        }
    },
    vehiclename:
    {
        type: String,
        required: true
    },
    company:
    {
        type: String,
        required: true
    },
    year:
    {
        type: String,
        required: true
    },
    vehicleimage:
    {
        type: [Buffer],
    },
    1:
    {
        type: Boolean,
        default: false
    },
    2:
    {
       
        type: Boolean,
        default: false
    },
    3:
    {
        
        type: Boolean,
        default: false
    },
    4:
    {
        
        type: Boolean,
        default: false
    },
    5:
    {
       
        type: Boolean,
        default: false
    },
    6:
    {
      
        type: Boolean,
        default: false
    },
    7:
    {
        
        type: Boolean,
        default: false
    },
    8:
    {
        type: Boolean,
        default: false
    },
    9:
    {
        type: Boolean,
        default: false
    },
    10:
    {
        type: Boolean,
        default: false
    },
    11:
    {
      
        type: Boolean,
        default: false
    },
    12:
    {
        type: Boolean,
        default: false
    }
    
},{
    timestamps: true
})

resaleSchema.methods.toJSON = function () {
    const resale = this
    const resaleobject = resale.toObject()
    resaleobject["totalimage"] = resaleobject.vehicleimage.length
    delete resaleobject.vehicleimage
    
    return resaleobject
}

const resale = mongoose.model('Resale',resaleSchema)

module.exports = resale