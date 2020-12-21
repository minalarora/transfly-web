const validator = require("validator")
const mongoose = require('mongoose')

const mineSchema  = mongoose.Schema({
    id:
    {
     type: Number,
     default: 0 
    },
     name:{
         type: String,
         unique: true,
         required: true
     },
     area:{
         type: String,
         required: true
     },
     trailer:
     {
         type: Boolean,
         default: true,
     },
     active:
     {
         type: Boolean,
         default: true,
     },
     tyres:
     {
         type: Number,
         required: true
     },
     bodytype:
     {
         type: String,
         enum : ['ATTACHED','NON-ATTACHED'],
         default: 'ATTACHED'
     },
     loading:
     {
         type: [String],
         required: true,
         validate: [arrayLimit, 'Atleast one loading is required']
     },
     rate:
     {
         type: Number,
         required: true
     },
     etl:
     {
         type: Number,
         required: true,
         validate(value)
         {
            if(value > 24)
            {
                throw new Error("Invalid Estimate Time of Loading")
            }
         }
     },
     latitude:
     {
         type: String,
         required: true
     },
     longitude:
     {
         type: String,
         required: true
     },
     landmark:{
         type: String
     },
     transporter:
    {
        type: String,
        ref: 'Transporter' 
    },
    areamanager:
    {
        type: String,
        ref: 'AreaManager'
    },
    fieldstaff:
    {
        type:String,
        ref: 'Fieldstaff'
    }
 
 }
 ,{
    timestamps: true
})


mineSchema.virtual('invoices',{
    ref: 'Invoice',
    localField: 'id',
    foreignField: 'mine'
})


const mine = mongoose.model('Mine',mineSchema)


 function arrayLimit(val) {
    return val.length > 0;
  }


 module.exports = mine