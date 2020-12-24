const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)

const referralSchema = mongoose.Schema({
    id:
    {
        type: Number,
        default: () => {
           return parseInt(nanoid())
        }
    },
    text: {
        type: String,
    },
    image:
    {
        type: Buffer
    },
    status:
    {
        type: Number,
        default: 0
    }
}
,{
    timestamps: true
})

const Referral  = mongoose.model('Referral',referralSchema)

module.exports = Referral