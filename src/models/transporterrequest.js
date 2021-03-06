const validator =  require('validator')
const mongoose =  require('mongoose')
const jwt = require("jsonwebtoken")
const Mine  = require('../models/mine')
const Transporter = require('../models/transporter')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 5)
let moment = require('moment-timezone')

const transporterrequestSchema  = mongoose.Schema({
    id:
    {
     type: Number,
     default: () => {
        return parseInt(nanoid())
     }
    },
    mineid:
    {
        type: Number,
        required: true,
        ref: 'Mine'
    },
     minename:{
         type: String,
         required: true
     },
     loadingname:{
         type: String,
         required: true
     },
     newrate:
     {
           type: Number,
            required: true
      },
    oldrate:
    {
        type: Number,
        required: true
    },
    requestuser:
    {
        type: String,
        required:true,
        ref: 'Transporter'
    },
    status:
    {
        type: String,
        enum : ['PENDING','ACCEPTED','REJECTED'],
        default: 'PENDING'
    },
    date:
    {
        type: String,
        
    }
    
 }
 ,{
    timestamps: true
})


transporterrequestSchema.pre('save', async function (next) {
    const invoice = this
    invoice.date = moment(new Date(invoice.createdAt)).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString()
    next()
})

const Transporterrequest  = mongoose.model('Transporterrequest',transporterrequestSchema)

module.exports = Transporterrequest