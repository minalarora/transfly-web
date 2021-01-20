const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 7)

const bannerSchema = mongoose.Schema({
    id:
    {
        type: Number,
        default: () => {
            return parseInt(nanoid())
        }
    },
    image:
    {
        type: Buffer
    }
    ,
     bannertype: {
        type: String,
        default: null,
    }
}
    , {
        timestamps: true
    })

// bannerSchema.pre('save', async function (next) {
//     const banner = this

//     // if (user.panimage && user.tdsimage && user.bankimage && (user.status == 0)) {
//     //     user.status = 1
//     // }
//     // invoice.amount = invoice.tonnage * invoice.rate
//     // invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - invoice.shortage
//     // invoice.date = invoice.updatedAt.toString().split("GM")[0]
//     next()
// })

bannerSchema.methods.toJSON = function () {
    const banner = this
    const bannerobject = banner.toObject()
    delete bannerobject.image
    return bannerobject
}

const Banner = mongoose.model('Banner', bannerSchema)

module.exports = Banner