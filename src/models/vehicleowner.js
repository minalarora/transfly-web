const validator = require("validator")
const mongoose = require('mongoose')
const Booking = require('./booking')
const Invoice = require('./invoice')
const Vehicle = require('./vehicle')
const jwt = require('jsonwebtoken')


const vehicleownerSchema  = mongoose.Schema({
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
    pan:
    {
        type: String,
        default: "NOT AVAILABLE"
    },
    panimage:
    {
        type: Buffer
    },
    tds:
    {
        type: String,
        default: "NOT AVAILABLE"
    
    },
    tdsimage:
    {
        type: Buffer
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


vehicleownerSchema.pre('save',async function(next){
    const user  = this
    if(user.panimage  && user.tdsimage && (user.status == 0))
    {
        user.status = 1
    }
    // invoice.amount = invoice.tonnage * invoice.rate
    // invoice.balanceamount = invoice.amount - invoice.hsd - invoice.cash - invoice.tds - invoice.officecharge - invoice.shortage
    // invoice.date = invoice.updatedAt.toString().split("GM")[0]
    next()
})

vehicleownerSchema.statics.findByMobile = async (mobile,password)=>{
    const vehicleowner  = await VehicleOwner.findOne({mobile,password})
    if(!vehicleowner)
    {
        throw new Error('unable to login')
    }
    else
    {
        return vehicleowner
    }
}

vehicleownerSchema.methods.generateToken = async function(){
    const vehicleowner  = this
    const token  = jwt.sign({_id: vehicleowner.mobile},'transfly',{
        expiresIn: '30d'
    })
    vehicleowner.tokens  = vehicleowner.tokens.concat({token})
    await vehicleowner.save()
    return token
}


vehicleownerSchema.methods.getPublicProfile = function()
{
    const user = this
    const userobject = user.toObject()
    delete userobject.password
    delete userobject.tokens
    return userobject
}

vehicleownerSchema.virtual('bookings',{
    ref: 'Booking',
    localField: '_id',
    foreignField: 'owner'
})

vehicleownerSchema.virtual('invoices',{
    ref: 'Invoice',
    localField: '_id',
    foreignField: 'owner'
})

vehicleownerSchema.virtual('vehicles',{
    ref: 'Vehicle',
    localField: 'mobile',
    foreignField: 'driverid'
  })


vehicleownerSchema.pre('remove',async function(next){
    const user  = this
    await Booking.deleteMany({
        owner: user._id
    })
    await Vehicle.deleteMany({
        driverid: mobile
    })

    next()

})





const VehicleOwner = mongoose.model('Vehicleowner',vehicleownerSchema)

module.exports = VehicleOwner