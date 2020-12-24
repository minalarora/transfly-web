const validator = require("validator")
const mongoose =  require('mongoose')
const jwt = require('jsonwebtoken')

const financeSchema =  mongoose.Schema({
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
        type: Buffer,
        default: undefined
    },
    aadhaar:
    {
        type: String,
        default: "NOT AVAILABLE"
        
    },
    aadhaarimage:
    {
        type: Buffer,
        default: undefined
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
                createdAt: { 
                    type: Date,
                     expires: '31d', 
                    default: Date.now
                 },
                required: true
            }
        }
    ]
},{
    timestamps: true
})

financeSchema.pre('save',async function(next){
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

financeSchema.statics.findByMobile = async (mobile,password)=>{
    const finance  = await Finance.findOne({mobile,password})
    if(!finance)
    {
        throw new Error('unable to login')
    }
    else
    {
        return finance
    }
}

financeSchema.methods.generateToken = async function(){
    const finance  = this
    const token  = jwt.sign({_id: finance.mobile},'transfly',{
        expiresIn: '30d'
    })
    finance.tokens  = finance.tokens.concat({token})
    await finance.save()
    return token
}


financeSchema.methods.getPublicProfile = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    return userobject
}

financeSchema.methods.getWebProfile = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    delete userobject.panimage
    delete userobject.aadhaarimage
    return userobject
}

const Finance = mongoose.model('Finance',financeSchema)

module.exports = Finance