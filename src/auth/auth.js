const jwt=require("jsonwebtoken")
const Admin = require("../models/admin")
const AreaManager = require("../models/areamanager")
const  Fieldstaff = require("../models/fieldstaff")
const Finance = require('../models/finance')
const Transporter = require('../models/transporter')
const VehicleOwner = require('../models/vehicleowner')


const auth=async (req,res,next)=>{
    try
    {
        const data=req.header('Authorization')
        const usertype = data.split(':')[0]
        const token  = data.split(':')[1]
        const decoded=jwt.verify(token,'transfly')
        // console.log('running')
        switch(usertype)
        {
            case 'admin': {
            
                const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
                if(!admin)
                {
                    throw new Error("Authentication Failed!")
                }
                req.user=admin
                req.token=token
                console.log('dsfds')
                next()
                break;
            }

            case 'areamanager':{
                const areamanager=await AreaManager.findOne({mobile:decoded._id,"tokens.token" : token})
                if(!areamanager)
                {
                    throw new Error("Authentication Failed!")
                }
                req.user=areamanager
                req.token=token
                next()
                break;
               
            }

            case 'fieldstaff':{
                const fieldstaff=await Fieldstaff.findOne({mobile:decoded._id,"tokens.token" : token})
                if(!fieldstaff)
                {
                    throw new Error("Authentication Failed!")
                }
                req.user=fieldstaff
                req.token=token
                next()
                break;
              
            }

            case 'finance':{
                const finance=await Finance.findOne({mobile:decoded._id,"tokens.token" : token})
                if(!finance)
                {
                    throw new Error("Authentication Failed!")
                }
                req.user=finance
                req.token=token
                next()
                break;
            }

            case 'transporter':{
                const transporter=await Transporter.findOne({mobile:decoded._id,"tokens.token" : token})
                if(!transporter)
                {
                    throw new Error("Authentication Failed!")
                }
                req.user=transporter
                req.token=token
                next()
                break;
            
            }

            case 'vehicleowner':{
                const vehicleowner=await VehicleOwner.findOne({mobile:decoded._id,"tokens.token" : token})
                if(!vehicleowner)
                {
                    throw new Error("Authentication Failed!")
                }
                req.user=vehicleowner
                req.token=token
                next()
                break;
            }

            default:{
                throw new Error("Authentication Failed!")
            }
        }

      
    }
    catch(error)
    {
        res.status(400).send(error)
    }
    
}

module.exports = auth