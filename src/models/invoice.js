const validator =  require("validator")
const mongoose = require('mongoose')

const invoiceSchema  = mongoose.Schema({
    id:
    {
        type: Number,
        
    },
    //minename and loading and vehicleownername
    vehicleno:
    {
        type: String,
        required: true
    },
    tonnage:
    {
        type: Number,
        required: true
    },
    rate:
    {
        type: Number,
        required: true
    },
    amount:
    {
        type:Number,
        default: 0
       
    },
    hsd:
    {
        type: Number,
        default: 0
    },
    cash:
    {
        type: Number,
        default: 0
    },
    tds:
    {
        type: Number,
        default: 0
    },
    officecharge:
    {
        type: Number,
        default: 0
    },
    shortage:
    {
        type: Number
        ,
        default: 0
    },
    balanceamount:
    {
        type: Number,
        default: 0
    },
    challantotransporter:
    {
        type: String,
        default: "NA"
    },
    balanceamountcleared:
    {
        type: String,
        default: "NA"
    },
    status:
    {
        type: String,
        enum : ['PENDING','COMPLETED'],
        default: 'PENDING'
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicleowner'
    },
    mine:
    {
        type: Number,
        required: true,
        ref: 'Mine'
    },
    date:
    {
        type: String
    }

}
,{
    timestamps: true
}
)

invoiceSchema.pre('save',async function(next){
    const invoice  = this
    invoice.amount = invoice.tonnage * invoice.rate
    invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - invoice.shortage
    invoice.date = invoice.createdAt.toString().split("GM")[0]
    next()
})



const invoice = mongoose.model("Invoice",invoiceSchema)


module.exports = invoice