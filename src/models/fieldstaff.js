const validator = require("validator")
const mongoose = require('mongoose')
const jwt =  require('jsonwebtoken')
const Mine  = require("../models/mine")

const fieldstaffSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    mobile:{
        type: String,
        required: true,
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
    pan:
    {
        type: String,
        default: "NOT AVAILABLE",
       
    },
    panimage:
    {
        type: Buffer
    },
    aadhaar:
    {
        type: String,
        default: "NOT AVAILABLE"
        
    },
    aadhaarimage:
    {
        type: Buffer
    },
    ename: {
        type: String,
        default: "NOT AVAILABLE",
        trim: true,
        uppercase: true
    },
    erelation: 
    {
        type: String,
        default: "NOT AVAILABLE",
        trim: true,
        uppercase: true  
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
                required: true,
                createdAt: { 
                    type: Date,
                     expires: '31d', 
                    default: Date.now
                 }
            }
        }
    ]
},{
    timestamps: true
})


fieldstaffSchema.pre('remove',async function(next){
    const user = this
    await Mine.updateMany({
        fieldstaff : user.mobile
    },
    { $set : { fieldstaff : undefined }},
     function(err, result) {
            if (err) {
              console.log(err)
            } else {
              console.log(result)
            }
          })
    next()
})


fieldstaffSchema.pre('save',async function(next){
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

fieldstaffSchema.statics.findByMobile = async (mobile,password)=>{
    const fieldstaff  = await Fieldstaff.findOne({mobile,password})
    if(!fieldstaff)
    {
        throw new Error('unable to login')
    }
    else
    {
        return fieldstaff
    }
}

fieldstaffSchema.methods.generateToken = async function(){
    const fieldstaff  = this
    const token  = jwt.sign({_id: fieldstaff.mobile},'transfly',{
        expiresIn: '30d'
    })
    fieldstaff.tokens  = fieldstaff.tokens.concat({token})
    await fieldstaff.save()
    return token
}


fieldstaffSchema.methods.getPublicProfile = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    return userobject
}

fieldstaffSchema.virtual('mines',{
    ref: 'Mine',
    localField: 'mobile',
    foreignField: 'fieldstaff'
  })

const Fieldstaff = mongoose.model('Fieldstaff',fieldstaffSchema)

module.exports = Fieldstaff