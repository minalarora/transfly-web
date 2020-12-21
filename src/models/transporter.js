const validator =  require('validator')
const mongoose =  require('mongoose')
const jwt = require("jsonwebtoken")

const transporterSchema  =  mongoose.Schema({
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
    city:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    gst:
    {
        type: String,
        default: "NOT AVAILABLE",
       
    },
    sta:
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
    mininglicense: {
        type: String,
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
}
,{
    timestamps: true
})


transporterSchema.statics.findByMobile = async (mobile,password)=>{
    const transporter  = await Transporter.findOne({mobile,password})
    if(!transporter)
    {
        throw new Error('unable to login')
    }
    else
    {
        return transporter
    }
}

transporterSchema.methods.generateToken = async function(){
    const transporter  = this
    const token  = jwt.sign({_id: transporter.mobile},'transfly',{
        expiresIn: '30d'
    })
    transporter.tokens  = transporter.tokens.concat({token})
    await transporter.save()
    return token
}

transporterSchema.virtual('mines',{
    ref: 'Mine',
    localField: 'mobile',
    foreignField: 'transporter'
  })


transporterSchema.methods.getPublicProfile = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    return userobject
}

const Transporter = mongoose.model('Transporter',transporterSchema)


module.exports = Transporter