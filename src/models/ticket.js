const mongoose = require('mongoose')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)

const ticketSchema  = mongoose.Schema({
    id:
    {
        type: Number,
        default: () => {
           return parseInt(nanoid())
        }
    },
    userid:
    {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    message:
    {
        type: String,
        default:null
    }
},{
    timestamps: true
})

const ticket = mongoose.model("Ticket",ticketSchema) 


module.exports = ticket
