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
        type: String
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


referralSchema.pre('save',async function(next){
    const reward  = this
    if(reward.text && reward.image)
    {
        reward.status = 0
    }
    else if(reward.text)
    {
        reward.status = 2
    }
    else if(reward.image)
    {
        reward.status = 1
    }
    
    next()
})
const Referral  = mongoose.model('Referral',referralSchema)

module.exports = Referral