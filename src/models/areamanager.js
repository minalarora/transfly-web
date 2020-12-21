const validator = require("validator")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const areamanagerSchema  = mongoose.Schema({

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
        default: "NOT AVAILABLE",
       
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

areamanagerSchema.virtual('mines',{
    ref: 'Mine',
    localField: 'mobile',
    foreignField: 'areamanager'
  })

areamanagerSchema.methods.getPublicProfile = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    return userobject
}

areamanagerSchema.virtual('mines',{
    ref: 'Mine',
    localField: 'mobile',
    foreignField: 'areamanager'
  })

areamanagerSchema.methods.generateToken = async function(){
    const areamanager  = this
    const token  = jwt.sign({_id: areamanager.mobile},'transfly',{
        expiresIn: '30d'
    })
    areamanager.tokens  = areamanager.tokens.concat({token})
    await areamanager.save()
    return token
}

const AreaManager = mongoose.model('AreaManager',areamanagerSchema)

module.exports = AreaManager