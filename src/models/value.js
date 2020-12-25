const mongoose = require('mongoose')

const valueSchema  = mongoose.Schema({
    id: {
        type: Number,
        default: 1000 
    }
})

const value = mongoose.model('Value',valueSchema)



module.exports = value