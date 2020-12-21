const mongoose = require('mongoose')

const ticketSchema  = mongoose.Schema({
    id:
    {
        type: Number,
        default: 0 
    },
    userid:
    {
        type: Number,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    message:
    {
        type: String
    }
},{
    timestamps: true
})

const ticket = mongoose.model("Ticket",ticketSchema) 


module.exports = ticket
