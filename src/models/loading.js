const mongoose = require('mongoose')


const loadingSchema = mongoose.Schema({
    loadingimage:
    {
        type: Buffer,
        required: true
    },
    loadingname:
    {
        type: String,
        required: true
    }

})

const loading  = mongoose.model('Loading',loadingSchema)

module.exports = loading