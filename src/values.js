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
const Notification = require('../src/models/notification')
let moment = require('moment-timezone')
// email.sendEmail('hey','how r u?')



const isRegisteredUser = async function(mobile)
{
  try
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
  catch(e)
  {
    return false
  }
  
}


const getVehiclesByMobile = async function(mobile,minename)
{
  try
  {
    let user  = await VehicleOwner.findOne({mobile,status:2,active:true})
    if(user)
    {
      let vehiclearray = await Vehicle.find({driverid:user.id,status:1,active:true})
      let mine  = await Mine.find({name:minename})
 
     
      let minetrailer = mine[0].trailer
      let tyres = mine[0].tyres
      let mvehiclearray = vehiclearray.filter((v)=>{
        let vehicleTyres = parseInt(v.tyres.split("-")[0].trim())
        let trailerString = " "
        
        try
        {
          trailerString = v.tyres.split("-")[1].trim()
        
        }
        catch(e)
        {

        }
        let vehicleTrailer = true
        if(vehicleTyres < 18)
        {
          if(trailerString.toUpperCase() == "TRAILOR")
          {
           
          }
          else
          {
            vehicleTrailer = false
          
          }
        }
        if(vehicleTyres > tyres)
        {
         
          return false;
        }
        else
        {
          if(minetrailer)
          {
           
            return true;
          }
          else
          {
            
            return (vehicleTrailer == minetrailer)
          }
        }
          
      })

      
      return mvehiclearray.map((vehiclearray)=>{
        return vehiclearray.number
      })
    }
    else
    {
      throw new Error("User not found")
    }
    
  }
  catch(e)
  {
  
    throw new Error("User not found")
  }
 
}

const getVehiclesByMobile2 = async function(mobile)
{
  try
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
  catch(e)
  {
  
    throw new Error("User not found")
  }
 
}

const getInvoice = async function(mobile,vehicle)
{
  try
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
           "From:-" + user.invoices[0].minename + "\n" + 
           "To:-" + user.invoices[0].loading + "\n" + 
           "Date:-" +  user.invoices[0].date + "\n" +
           "Tonnage:-" + user.invoices[0].tonnage + "\n" + 
           "Rate:-" + user.invoices[0].rate + "\n" + 
           "Amount:-" + user.invoices[0].amount + "\n" + 
           "HSD:-" + user.invoices[0].hsd + "\n" + 
           "Cash:-" + user.invoices[0].cash + "\n" + 
           "TDS:-" + user.invoices[0].tds + "\n" + 
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
  catch(e)
  {
    throw new Error("User not found")
  }
    
}


const createTicket = async function(mobile,vehicle,type)
{

  try
  {
    let v = await Vehicle.findOne({number: vehicle})
    email.sendEmail('TICKET',"vehicleowner mobile: " + mobile + "\n" + "vehicle: " + vehicle + "\n" + "driver mobile: " + v.contact + "\ntype: " + type)
    return true
  }
  catch(e)
  {

  }
    
}

const createBooking = async function(mobile,vehicle,mine,loading)
{
  try
  {
    let user  = await VehicleOwner.findOne({mobile,status:2,active:true})
  if(user)
  {

    try
    {
      let mineobj  = await Mine.findOne({name:mine})
      /**
       * 
    mineArray = mineArray.filter((mine)=>{
        for(let i = 0;i<mine.loading.length;i++)
        {
          if(mine.loading[i].loadingname == loading && mine.loading[i].active)
          {
            return true
          }
        }
        return false
    })
       * 
       */
      for(let k = 0;k<mineobj.loading.length;k++)
      {
        if((mineobj.loading[k].loadingname == loading) && (mineobj.loading[k].active == false))
        {
          return false;
        }
      }
      let vehiclearray = await Vehicle.find({driverid:user.id, status:1, active: true})
      // return vehiclearray.map((vehiclearray)=>{
      //   return vehiclearray.number
      // })

     let updatedva = vehiclearray.filter((v)=>{
        if(v.number.includes(vehicle) )
        {
          return true
        }
        else
        {
          return false
        }
      })
      if(updatedva.length > 0)
      {
        
        let v = await Vehicle.findOneAndUpdate({number: vehicle},{active: false})
        const booking  = new Booking({vehicle,mineid:mineobj.id,minename:mineobj.name,loading,owner: user.id,vehicleowner:user.name,vehicleownermobile:user.mobile,contact:v.contact})
        await booking.save()
        let text = "Your booking from " + mineobj.name + " to " + loading + " has been successfully created."
        //  Notification.createNotification(req.user.id,text,0)
        
        const notification = new Notification({user: user.id,text,type:0})
        await notification.save()
        user.firebase.forEach((token) => {
            try {
               
                sendFirebaseMessage(token, "TRANSFLY", text)

            }
            catch (e) {

            }
        })
         let m = mineobj
         let fs  = await Fieldstaff.findOne({id: mineobj.fieldstaff})
         let am = await AreaManager.findOne({id: mineobj.areamanager})
         let date = moment(new Date()).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString()
         try
         {
              sendMessageFour(fs.mobile,vehicle,date,mineobj.name,loading,v.contact)
            
              sendMessageFour(am.mobile,vehicle,date,mineobj.name,loading,v.contact)
         }
         catch(e)
         {
           
         }
        return true
      }
      else
      {
        return false
      }
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
  catch(e)
  {
    throw new Error("User not found")
  }
  
}


const getMinesByArea = async function(area,loading)
{
  try
  {
    let mineArray = await Mine.find({area,active:true})
  
    mineArray = mineArray.filter((mine)=>{
        for(let i = 0;i<mine.loading.length;i++)
        {
          if(mine.loading[i].loadingname == loading && mine.loading[i].active)
          {
            return true
          }
        }
        return false
    })
    let nameArray =  mineArray.map((mine)=>{
    
      return mine.name
    })

    
    if(nameArray.length == 0)
    {
      return []
    }
    else
    {
      return nameArray
    }
   
  }
  catch(e)
  {
    return []
    throw new Error("User not found")
  }
    

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
    
     //(res.status)
  }).catch((e)=>{
   //(e)
  }) 
  
 
}
catch(e)
{
 //(e)
}
  

  
}


const sendMessageOne =  function(number,vehicle,from,to,amount,cash)
{
/**
 * {
 "flow_id":"5ff6baa6ede4c64496062ebe",
  "recipients" : [
    {
      "mobiles":"918871748278",
      "message":"VALUE 1"
    },
    {
      "mobiles":"916265219319",
      "message":"VALUE 1"
		}
]
}*/

  const obj = {}
  obj.flow_id = "5ff6baa6ede4c64496062ebe"
  obj.recipients = [
   {
     mobiles:"91" + number,
     vehicle,
     from,
     to,
     amount,
     cash
   }
  ]

 
  
try
{
   fetch("https://api.msg91.com/api/v5/flow/",{
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "authkey":"350944Ar65hw8BuM5ff29c59P1"
    },
    body: JSON.stringify(obj)
  }).then((res)=>{
    
     //(res.status)
  }).catch((e)=>{
   //(e)
  }) 
  
 
}
catch(e)
{
 //(e)
}
  

  
}


const sendMessageTwo =  function(number,vehicle,date,from,to)
{
/**
 * {
 "flow_id":"5ff6baa6ede4c64496062ebe",
  "recipients" : [
    {
      "mobiles":"918871748278",
      "message":"VALUE 1"
    },
    {
      "mobiles":"916265219319",
      "message":"VALUE 1"
		}
]
}*/

  const obj = {}
  obj.flow_id = "6010eac0c028a46d117fa0e8"
  obj.recipients = [
   {
     mobiles:"91" + number,
     vehicle,
     date,
     from,
     to,
    
   }
  ]

 

  
try
{
   fetch("https://api.msg91.com/api/v5/flow/",{
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "authkey":"350944Ar65hw8BuM5ff29c59P1"
    },
    body: JSON.stringify(obj)
  }).then((res)=>{
    
     //(res.status)
  }).catch((e)=>{
   //(e)
  }) 
  
 
}
catch(e)
{
 //(e)
}
  

  
}


const sendMessageThree =  function(number,vehicle,date,from,to)
{
/**
 * {
 "flow_id":"5ff6baa6ede4c64496062ebe",
  "recipients" : [
    {
      "mobiles":"918871748278",
      "message":"VALUE 1"
    },
    {
      "mobiles":"916265219319",
      "message":"VALUE 1"
		}
]
}*/

  const obj = {}
  obj.flow_id = "6010eb330c7eb81f9842f8da"
  obj.recipients = [
   {
     mobiles:"91" + number,
     vehicle,
     date,
     from,
     to,
    
   }
  ]
  
  
try
{
   fetch("https://api.msg91.com/api/v5/flow/",{
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "authkey":"350944Ar65hw8BuM5ff29c59P1"
    },
    body: JSON.stringify(obj)
  }).then((res)=>{
    
     //(res.status)
  }).catch((e)=>{
   //(e)
  }) 
  
 
}
catch(e)
{
 //(e)
}
  

  
}

const sendMessageFour =  function(number,vehicle,date,from,to,driver)
{
/**
 * {
 "flow_id":"5ff6baa6ede4c64496062ebe",
  "recipients" : [
    {
      "mobiles":"918871748278",
      "message":"VALUE 1"
    },
    {
      "mobiles":"916265219319",
      "message":"VALUE 1"
		}
]
}*/

  const obj = {}
  obj.flow_id = "601a65f9a9dbb953a96b9927"
  obj.recipients = [
   {
     mobiles:"91" + number,
     vehicle,
     date,
     from,
     to,
     driver
    
   }
  ]



  
try
{
   fetch("https://api.msg91.com/api/v5/flow/",{
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "authkey":"350944Ar65hw8BuM5ff29c59P1"
    },
    body: JSON.stringify(obj)
  }).then((res)=>{
    
     //(res.status)
  }).catch((e)=>{
   //(e)
  }) 
  
 
}
catch(e)
{
 //(e)
}
  

  
}

const sendMessageDownload =  function(number)
{
/**
 * {
 "flow_id":"5ff6baa6ede4c64496062ebe",
  "recipients" : [
    {
      "mobiles":"918871748278",
      "message":"VALUE 1"
    },
    {
      "mobiles":"916265219319",
      "message":"VALUE 1"
		}
]
}*/

  const obj = {}
  obj.flow_id = "60363bd5f45873278a1d6c55"
  obj.recipients = [
   {
      mobiles:"91" + number,
     link: "https://play.google.com/store/apps/details?id=com.truck.transfly"
    
   }
  ]



  
try
{
   fetch("https://api.msg91.com/api/v5/flow/",{
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "authkey":"350944Ar65hw8BuM5ff29c59P1"
    },
    body: JSON.stringify(obj)
  }).then((res)=>{
    
     //(res.status)
  }).catch((e)=>{
   //(e)
  }) 
  
 
}
catch(e)
{
 //(e)
}
  

  
}









module.exports = {
  isRegisteredUser,
  createBooking,
  createTicket,
  getInvoice,
  getVehiclesByMobile,
  getVehiclesByMobile2,
  getMinesByArea,
  sendFirebaseMessage,
  sendMessageOne,
  sendMessageTwo,
  sendMessageThree,
  sendMessageFour,
  sendMessageDownload


}