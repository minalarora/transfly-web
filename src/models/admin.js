const validator = require("validator")
const mongoose = require('mongoose')
const jwt= require('jsonwebtoken')

const adminSchema  = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    lastname: 
    {
        type: String,
        required: true ,
        trim: true,
        uppercase: true  
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
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
    city:
    {
        type: String,
        default: "NOT AVAILABLE"
        
    },
    pan:
    {
        type: String,
        default: "NOT AVAILABLE"
       
    },
    aadhaar:
    {
        type: String,
        default: "NOT AVAILABLE"
       
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
        uppercase: true  ,
        default: "NOT AVAILABLE"
    },
    emobile:{
        type: String,
        maxlength: [20,"Invalid Mobile Number"],
        default: "NOT AVAILABLE"
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

adminSchema.statics.findByMobile = async (mobile,password)=>{
    const admin  = await Admin.findOne({mobile,password})
    if(!admin)
    {
        throw new Error('unable to login')
    }
    else
    {
        return admin
    }
}

adminSchema.methods.generateToken = async function(){
    const admin  = this
    const token  = jwt.sign({_id: admin.mobile},'transfly',{
        expiresIn: '30d'
    })
    admin.tokens  = admin.tokens.concat({token})
    await admin.save()
    return token
}

adminSchema.methods.getPublicProfile = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    return userobject
}

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin