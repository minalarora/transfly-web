const validator = require("validator")
const mongoose = require('mongoose')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 7)

const mineSchema  = mongoose.Schema({
    id:
    {
     type: Number,
     default: () => {
        return parseInt(nanoid())
     }
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
     areaimage:
     {
        type: Buffer
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
         enum : ['ATTACHED','NON-ATTACHED','BOTH'],
         default: 'ATTACHED'
     },
     loading:
     {
         type: [{
             loadingname:
             {
                 type: String,
                 required: true
             },
             rate:
             {
                 type: Number,
                 default:0
             }
            ,
            etl:
            {
                type: Number,
                default:0
            },
            active:
            {
                type: Boolean,
                default: true
            }
         }],
        //  required: true,
        //  validate: [arrayLimit, 'Atleast one loading is required']
     },
    //  rate:
    //  {
    //      type: Number,
    //      default: 0 
    //  },
    //  etl:
    //  {
    //      type: Number,
    //      default: 0,
    //      validate(value)
    //      {
    //         if(value > 24)
    //         {
    //             throw new Error("Invalid Estimate Time of Loading")
    //         }
    //      }
    //  },
     latitude:
     {
         type: String,
         required: true
     },
     longitude:
     {
         type: String,
         required: true
     }
     ,
     arealatitude:
     {
         type: String,
         required: true
     },
     arealongitude:
     {
         type: String,
         required: true
     }
     ,
     landmark:{
         type: String,
         default: "NOT AVAILABLE"
     },
    areamanager:
    {
        type: String,
        default: null,
        ref: 'Areamanager'
    },
    fieldstaff:
    {
        type:String,
        default: null,
        ref: 'Fieldstaff'
    }
 
 }
 ,{
    timestamps: true
})


mineSchema.virtual('invoices',{
    ref: 'Invoice',
    localField: 'id',
    foreignField: 'mineid'
})

mineSchema.virtual('bookings',{
    ref: 'Booking',
    localField: 'id',
    foreignField: 'mineid'
})


mineSchema.virtual('transporterrequest', {
    ref: 'Transporterrequest',
    localField: 'id',
    foreignField: 'mineid'
})

mineSchema.methods.toJSON = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.areaimage
    userobject["areaimageurl"] = "https://transflyhome.club/areaimage/" + userobject.id 
    return userobject
}



const mine = mongoose.model('Mine',mineSchema)


 function arrayLimit(val) {
    return val.length > 0;
  }


 module.exports = mine