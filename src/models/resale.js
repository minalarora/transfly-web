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
        type: String,
        default: '0'
    },
    2:
    {
       
        type: String,
        default: '0'
    },
    3:
    {
        
        type: String,
        default: '0'
    },
    4:
    {
        
        type: String,
        default: '0'
    },
    5:
    {
       
        type: String,
        default: '0'
    },
    6:
    {
      
        type: String,
        default: '0'
    },
    7:
    {
        
        type: String,
        default: '0'
    },
    8:
    {
        type: String,
        default: '0'
    },
    9:
    {
       
        type: String,
        default: '0'
    },
    10:
    {
        
        type: String,
        default: '0'
    },
    11:
    {
      
        type: String,
        default: '0'
    },
    12:
    {
        
        type: String,
        default: '0'
    },
    13:
    {
        
        type: String,
        default: '0'
    }
    
},{
    timestamps: true
})

const resale = mongoose.model('Resale',resaleSchema)

module.exports = resale