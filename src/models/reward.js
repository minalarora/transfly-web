const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)

const rewardSchema = mongoose.Schema({
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

const Reward  = mongoose.model('Reward',rewardSchema)

module.exports = Reward