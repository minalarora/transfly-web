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
    price:
    {
        type: String,
        required: true
    },
    vehicleimage:
    {
        type: [Buffer],
    },
    type:
    {
        type: String,
        enum: ['LEASE', 'RESALE'],
        default: 'RESALE'

    },
    a:
    {
        type: Boolean,
        default: false
    },
    b:
    {
       
        type: Boolean,
        default: false
    },
    c:
    {
        
        type: Boolean,
        default: false
    },
    d:
    {
        
        type: Boolean,
        default: false
    },
    e:
    {
       
        type: Boolean,
        default: false
    },
    f:
    {
      
        type: Boolean,
        default: false
    },
    g:
    {
        
        type: Boolean,
        default: false
    },
    h:
    {
        type: Boolean,
        default: false
    },
    i:
    {
        type: Boolean,
        default: false
    },
    j:
    {
        type: Boolean,
        default: false
    },
    k:
    {
      
        type: Boolean,
        default: false
    },
    l:
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