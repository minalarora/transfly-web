const mongoose =  require('mongoose')

const bookingSchema  = mongoose.Schema({
    id: {
        type: Number,
        default: 0 
    },
    vehicleownerid:
    {
        type: Number,
        required: true
    },
    vehicleid:
    {
       type: Number     
    },
    mineid:
    {
        type: Number,
        required: true
    },
    loading:
    {
        type: String,
        required: true
    },
    status:
    {
        type: String,
        enum : ['PENDING','ACTIVE'],
        default: 'PENDING'
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vehicleowner'
    }
},{
    timestamps: true
})



const Booking  = mongoose.model('Booking',bookingSchema)

module.exports = Booking