const mongoose = require('mongoose')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)


const ratingSchema  = mongoose.Schema({
    
    userid:
    {
        type: String,
        required: true
    },
    rating:
    {
        type: Number,
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

const rating = mongoose.model("Rating",ratingSchema) 


module.exports = rating
