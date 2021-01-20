const validator = require("validator")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Mine = require('../models/mine')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 5)


const areamanagerSchema  = mongoose.Schema({

    id:
    {
        type: String,
        unique: true,
     default: () => {
        return "AM:" + nanoid()
        }
    },

    firebase:
    {
        type: [String],
        default:[]
    },
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    mobile:{
        type: String,
        required: true,
        unique:true,
        maxlength: [12,"Invalid Mobile Number"]
    }
    ,
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Please fill valid email!")
            }
        }

    },
    password:
    {
        type: String,
        required: true
    },
    status:
    {
        type: Number,
        required: true,
        default: 0 
    }
    ,
    active:
    {
        type: Boolean,
        default: true
    },
    accountno:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    ifsc:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    bankname:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
     
    bankpersonname:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    pan:
    {
        type: String,
        default: "NOT AVAILABLE",
       
    },
    panimage:
    {
        type: Buffer,
        default: null
    },
    aadhaar:
    {
        type: String,
        default: "NOT AVAILABLE"
        
    },
    aadhaarimage:
    {
        type: Buffer,
        default:null
    },
    ename: {
        type: String,
        trim: true,
        uppercase: true,
        default: "NOT AVAILABLE"
    },
    erelation: 
    {
        type: String,
        trim: true,
        uppercase: true,
        default: "NOT AVAILABLE"  
    },
    emobile:{
        type: String,
        default: "NOT AVAILABLE",
        maxlength: [20,"Invalid Mobile Number"]
    },
    tokens: [
        {
            token : {
                type: String,
                
                required: true
            },
             createdAt:  { 
                    type: Date,
                   expires: '31d', 
                  default: Date.now
                         }
        }
    ]
},{
    timestamps: true
})


areamanagerSchema.pre('remove',async function(next){
    const user = this
    await Mine.updateMany({
        areamanager : user.id
    },
    { $set : { areamanager : null }},
     function(err, result) {
            
          })

    next()
})

areamanagerSchema.pre('save',async function(next){
    const user  = this
    if(user.panimage && user.aadhaarimage && (user.status == 0))
    {
        user.status = 1
    }
    // invoice.amount = invoice.tonnage * invoice.rate
    // invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - invoice.shortage
    // invoice.date = invoice.updatedAt.toString().split("GM")[0]
    next()
})

areamanagerSchema.statics.findByMobile = async (mobile,password)=>{
    const areamanager  = await AreaManager.findOne({mobile,password})
    if(!areamanager)
    {
        throw new Error('unable to login')
    }
    else
    {
        return areamanager
    }
}



areamanagerSchema.methods.toJSON = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    delete userobject.aadhaarimage
    delete userobject.panimage
    return userobject
}

areamanagerSchema.virtual('mines',{
    ref: 'Mine',
    localField: 'id',
    foreignField: 'areamanager'
  })

areamanagerSchema.methods.generateToken = async function(){
    const areamanager  = this
    const token  = jwt.sign({_id: areamanager.id},'transfly',{
        expiresIn: '30d'
    })
    areamanager.tokens  = areamanager.tokens.concat({token})
    await areamanager.save()
    return token
}



const AreaManager = mongoose.model('Areamanager',areamanagerSchema)

module.exports = AreaManager