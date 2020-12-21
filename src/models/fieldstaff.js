const validator = require("validator")
const mongoose = require('mongoose')

const fieldstaffSchema = mongoose.Schema({
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
        default: "NOT AVAILABLE"
    },
    aadhaar:
    {
        type: String,
        default: "NOT AVAILABLE"
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

const Fieldstaff = mongoose.model('Fieldstaff',fieldstaffSchema)

module.exports = Fieldstaff