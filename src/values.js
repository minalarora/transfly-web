const Admin = require('./models/admin')
const AreaManager = require('./models/areamanager')
const Booking = require('./models/booking')
const Fieldstaff = require('./models/fieldstaff')
const Finance = require('./models/finance')
const Invoice = require('./models/invoice')
const Mine = require('./models/mine')
const Ticket = require('./models/ticket')
const Transporter = require('./models/transporter')
const Vehicle = require('./models/vehicle')
const VehicleOwner = require("./models/vehicleowner")
const Rating = require('./models/rating')
const Reward = require('./models/reward')
const Referral = require('./models/referral')
const Banner = require('./models/banner')
const Resale = require('./models/resale')
const mine = require('./models/mine')
const fetch = require("node-fetch")
const email= require('../src/email')
// email.sendEmail('hey','how r u?')



const isRegisteredUser = async function(mobile)
{
  let user  =  await VehicleOwner.findOne({mobile,status:2,active:true})
  if(user)
  {
    return true
  }
  else
  {
    return false
  }
}


const getVehiclesByMobile = async function(mobile)
{
  let user  = await VehicleOwner.findOne({mobile,status:2,active:true})
  if(user)
  {
    let vehiclearray = await Vehicle.find({driverid:user.id})
    return vehiclearray.map((vehiclearray)=>{
      return vehiclearray.number
    })
  }
  else
  {
    throw new Error("User not found")
  }
  
}

const getInvoice = async function(mobile,vehicle)
{
    let user  = await VehicleOwner.findOne({mobile,status:2,active:true})
    if(user)
    {
      await user.populate({
        path: 'invoices',
        match:
        {
          vehicle   
        }
        ,options:{
            limit: 1,
            sort: {
                createdAt: -1
            }
        }
    }).execPopulate()

    return "Invoice details:-\n" + 
           "Invoice ID:-" + user.invoices[0].id + "\n" + 
           "Vehicle:-" + user.invoices[0].vehicle + "\n" + 
           "VehicleOwner:-" + user.invoices[0].vehicleowner + "\n" + 
           "Mine:-" + user.invoices[0].minename + "\n" + 
           "Loading:-" + user.invoices[0].loading + "\n" + 
           "Tonnage:-" + user.invoices[0].tonnage + "\n" + 
           "Rate:-" + user.invoices[0].rate + "\n" + 
           "HSD:-" + user.invoices[0].hsd + "\n" + 
           "Cash:-" + user.invoices[0].cash + "\n" + 
           "Amount:-" + user.invoices[0].amount + "\n" + 
           "OfficeCharge:-" + user.invoices[0].officecharge + "\n" + 
           "Shortage:-" + user.invoices[0].shortage + "\n" + 
           "BalanceAmount:-" + user.invoices[0].balanceamount + "\n" + 
           "Status:-" + user.invoices[0].status + "\n" 

    }
    else
    {
      throw new Error("User not found")
    }
}


const createTicket = async function(mobile,vehicle,type)
{
    email.sendEmail('TICKET',"mobile: " + mobile + "\n" + "vehicle: " + vehicle + "\n" + "type: " + type)
    return true
}

const createBooking = async function(mobile,vehicle,mine,loading)
{
  let user  = await VehicleOwner.findOne({mobile,status:2,active:true})
  if(user)
  {

    try
    {
      let mineobj  = await Mine.findOne({name:mine})
        const booking  = new Booking({vehicle,mineid:mineobj.id,minename:mineobj.name,loading,owner: user.id,vehicleowner:user.name,vehicleownermobile:user.mobile})
        await booking.save()
        await Vehicle.findOneAndUpdate({number: vehicle},{active: false})
        return true
    }
    catch(e)
    {
        return false
    }
        
  }
  else
  {
    throw new Error("User not found") 
  }
}


const getMinesByArea = async function(area)
{
    let mineArray = await Mine.find({area,active:true })
    return mineArray.map((mine)=>{
      return mine.name
    })

}


const sendFirebaseMessage =  function(token,title,message)
{
//   {
//     "to": "dZetVzzWRbeZAIM3XkZoHE:APA91bFIR-m52RlPaE0mG2soWJCOPuVTYftZqc6LF_vuotByfAtizznyfvtkM2l_ie2X9-8ecJHXP6VSSwq1gwpNq5nDL22vvod2GD3My5R-4MVpOyyJ2B_DIjawFMGdUzWrqvj1_1w_",
//     "notification": {
//       "title": "Shani so jaate hain",
//       "body": "good night",
//       "mutable_content": true
//       }
// }

  const obj = {}
  obj.to = token
  obj.notification = {}
  obj.notification.title = title
  obj.notification.body = message
  obj.notification["mutable_content"] = true
  
try
{
   fetch("https://fcm.googleapis.com/fcm/send",{
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "Authorization":"key=AAAAVbPt_qI:APA91bG0No1HJJBMFhq4lYPe76XOBOqFa54raGaxd-kLFS9x7lWC7C7dq14CZYiziU8b686-Jk0pJFkVR3xP6cVhsFSAFkT7auTe0F9RLg4IzOf6R0FlPscrAy0MYY320VN3UudV8uBr"
    },
    body: JSON.stringify(obj)
  }).then((res)=>{
    
      console.log(res.status)
  }).catch((e)=>{
    console.log(e)
  }) 
  
 
}
catch(e)
{
  console.log(e)
}
  

  
}


module.exports = {
  isRegisteredUser,
  createBooking,
  createTicket,
  getInvoice,
  getVehiclesByMobile,
  getMinesByArea,
  sendFirebaseMessage
}