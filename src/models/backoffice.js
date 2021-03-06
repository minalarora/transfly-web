const validator = require("validator")
const mongoose = require('mongoose')
const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 5)



const backofficeSchema  = mongoose.Schema({

    id:
    {
        type: String,
        unique: true,
     default: () => {
        return "BO" + nanoid()
        }
    },

    
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    password:
    {
        type: String,
        required: true
    }
})






backofficeSchema.statics.findByMobile = async (id,password)=>{
    const backoffice  = await BackOffice.findOne({id,password})
    if(!backoffice)
    {
        throw new Error('unable to login')
    }
    else
    {
        return backoffice
    }
}



backofficeSchema.methods.toJSON = function()
{
    const user = this
    const userobject = user.toObject()
    return userobject
}





const BackOffice = mongoose.model('BackOffice',backofficeSchema)

module.exports = BackOffice