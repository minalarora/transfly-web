let nam = undefined
if(nam)
{
    console.log('yes')
}
else
{
    console.log('no')
}

// require'('./src/db/dbfile')

// let data = 'transporter bdfsjkdshfksdhf'
// let  user = data.split(' ')[0]
// let token  = data.split(' ')[1]


// switch(user)
// {
//     case 'admin': {
//         console.log('admin')
//         break;
//     }
//     case 'transporter':
//         {
//             console.log('transporter')
//             break;
//         }
// }
// console.log({user,token})


// const mongoose = require('mongoose')
// const valueSchema  = mongoose.Schema({
//     id: {
//         type: String,
//         default: "Sd" ,
       
//     },
//     createdAt: { 
//         type: Date,
//          expires: '40d', 
//         default: Date.now
//      }

// }

// )

// const Value = mongoose.model('Value',valueSchema)


// const v = new Value({
//     id: 'sd'
// })

// v.save().then((a)=>{
//     console.log(a)
// }).catch((e)=>{
//     console.log(e)
// })

// /*const jwt= require('jsonwebtoken')
// const token = jwt.sign({_id: '8871748278'},'transfly',{
//     expiresIn: '60d'
// })
// console.log(token)

// const verify = jwt.verify(token,'transfly')
// console.log(verify)*/


// /*const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const bcrypt = require("bcryptjs")

// const connectionUrl = 'mongodb+srv://minal:123Password@cluster0.tvrlt.mongodb.net/test' 

// const databaseName= 'transfly-db'

// MongoClient.connect(connectionUrl,{useNewUrlParser: true, useUnifiedTopology: true},(error,client)=>{
//     if(error)
//     {
//         console.log("error")
//     }
//     else
//     {
//         console.log("success")
//         const db = client.db(databaseName)

//     /*    db.collection('vehicle-owner').find({age: 24}).toArray((error,user)=>{
//             console.log(user)
//         })

//         db.collection("vehicle-owner").upda
//        db.collection("vehicle-owner").insertOne({
//             name: "Minal Arora",
//             age: 24
//         },(error,result)=>{
//             if(error)
//             {
//                 console.log("user creation failed")
//             }
//             else
//             {
//                 console.log(result.ops)
//             }
//         })

//         db.collection('admin').insertMany([
//             {
//                 name: 'Minal Arora',
//                 age: 27
//             },
//             {
//                 name: 'sid',
//                 gender: 'm'
//             }
//         ],(error,result)=>{
//             if(error)
//             {
//                 console.log("user creation failed")
//             }
//             else
//             {
//                 console.log(result.ops)
//             }
//         })
        

//     }

    
// })

// const doWork = new Promise((resolve,rejects)=>{
//     setTimeout(()=>{
//         console.log("done")
//             resolve(123)
//     },2000)
// })

// doWork.then((result)=>{
//     console.log(result)
// })


// const bfn = async ()=>{
//     const pwd= "RED123"
//     const hashedpwd = await bcrypt.hash(pwd,8)
//     const isMatch  =  await bcrypt.compare(pwd,hashedpwd)
//     console.log(isMatch)
// }


// bfn()*/

// ///////////////
// /*const { METHODS } = require("http")
// const mongoose = require("mongoose")
// const connectionUrl = 'mongodb+srv://minal:123Password@cluster0.tvrlt.mongodb.net/transfly-db' 
// const validator = require("validator")

// mongoose.connect(connectionUrl,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })


// const VehicleOwner = mongoose.model('Vehicleowner',{
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     lastname: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     mobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
//     ,
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         validate(value)
//         {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error("Please fill valid email!")
//             }
//         }

//     },
//     password:
//     {
//         type: String,
//         required: true
//     },
//     vehicleownerid:{
//         type: Number,
//         required: true
//     },
//     status:
//     {
//         type: Number,
//         required: true,
//         default: 0 
//     },
//     accountno:
//     {
//         type: String
//     },
//     ifsc:
//     {
//         type: String
//     },
//     bankname:
//     {
//         type: String
//     },
//     city:
//     {
//         type: String,
//         required: true
//     },
//     pan:
//     {
//         type: String,
//         unique: true,
//     },
//     tds:
//     {
//         type: String,
    
//     }

// })


// const vehicle  = mongoose.model('Vehicle',{
//     number: {
//         type: String,
//         unique: true,
//         required: true,
//     },
//     rc: 
//     {
//         type: String,
//         unique: true,
//         required: true
//     },
//     vehiclename: {
//         type: String,
//         required: true
//     },
//     driverid: {
//         type: Number,
//         required: true    
//     }
// })

// const mine = mongoose.model('Mine',{
//    mineid:
//    {
//     type: Number,
//     unique: true,
//     required: true
//    },
//     name:{
//         type: String,
//         unique: true,
//         required: true
//     },
//     area:{
//         type: String,
//         required: true
//     },
//     trailer:
//     {
//         type: Boolean,
//         default: true,
//     },
//     active:
//     {
//         type: Boolean,
//         default: true,
//     },
//     tyres:
//     {
//         type: Number,
//         required: true
//     },
//     bodytype:
//     {
//         type: String,
//         enum : ['ATTACHED','NON-ATTACHED'],
//         default: 'ATTACHED'
//     },
//     loading:
//     {
//         type: [String],
//         required: true,
//         validate: [arrayLimit, 'Atleast one loading is required']
//     },
//     rate:
//     {
//         type: Number,
//         required: true
//     },
//     etl:
//     {
//         type: Number,
//         required: true,
//         validate(value)
//         {
//            if(value > 24)
//            {
//                throw new Error("Invalid Estimate Time of Loading")
//            }
//         }
//     },
//     latitude:
//     {
//         type: String,
//         required: true
//     },
//     longitude:
//     {
//         type: String,
//         required: true
//     },
//     landmark:{
//         type: String
//     }

// })

// const fieldstaff = mongoose.model('Fieldstaff',{
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     lastname: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     mobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
//     ,
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         validate(value)
//         {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error("Please fill valid email!")
//             }
//         }

//     },
//     password:
//     {
//         type: String,
//         required: true
//     },
//     vehicleownerid:{
//         type: Number,
//         required: true
//     },
//     status:
//     {
//         type: Number,
//         required: true,
//         default: 0 
//     },
//     accountno:
//     {
//         type: String
//     },
//     ifsc:
//     {
//         type: String
//     },
//     bankname:
//     {
//         type: String
//     },
//     city:
//     {
//         type: String,
//         required: true
//     },
//     pan:
//     {
//         type: String,
//         unique: true,
//         required: true
//     },
//     aadhaar:
//     {
//         type: String,
//         unique: true,
//         required: true
//     },
//     ename: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     erelation: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     emobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
// })

// const finance = mongoose.model('Finance',{
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     lastname: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     mobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
//     ,
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         validate(value)
//         {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error("Please fill valid email!")
//             }
//         }

//     },
//     password:
//     {
//         type: String,
//         required: true
//     },
//     vehicleownerid:{
//         type: Number,
//         required: true
//     },
//     status:
//     {
//         type: Number,
//         required: true,
//         default: 0 
//     },
//     accountno:
//     {
//         type: String
//     },
//     ifsc:
//     {
//         type: String
//     },
//     bankname:
//     {
//         type: String
//     },
//     city:
//     {
//         type: String,
//         required: true
//     },
//     pan:
//     {
//         type: String,
//         unique: true,
//         required: true
//     },
//     aadhaar:
//     {
//         type: String,
//         unique: true,
//         required: true
//     },
//     ename: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     erelation: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     emobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
// })

// const areamanager = mongoose.model('AreaManager',{
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     lastname: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     mobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
//     ,
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         validate(value)
//         {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error("Please fill valid email!")
//             }
//         }

//     },
//     password:
//     {
//         type: String,
//         required: true
//     },
//     vehicleownerid:{
//         type: Number,
//         required: true
//     },
//     status:
//     {
//         type: Number,
//         required: true,
//         default: 0 
//     },
//     accountno:
//     {
//         type: String
//     },
//     ifsc:
//     {
//         type: String
//     },
//     bankname:
//     {
//         type: String
//     },
//     city:
//     {
//         type: String,
//         required: true
//     },
//     pan:
//     {
//         type: String,
//         unique: true,
//         required: true
//     },
//     aadhaar:
//     {
//         type: String,
//         unique: true,
//         required: true
        
//     },
//     ename: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     erelation: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     emobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
// })

// const admin = mongoose.model('Admin',{
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     lastname: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     mobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
//     ,
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         validate(value)
//         {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error("Please fill valid email!")
//             }
//         }

//     },
//     password:
//     {
//         type: String,
//         required: true
//     },
//     vehicleownerid:{
//         type: Number,
//         required: true
//     },
//     status:
//     {
//         type: Number,
//         required: true,
//         default: 0 
//     },
//     accountno:
//     {
//         type: String
//     },
//     ifsc:
//     {
//         type: String
//     },
//     bankname:
//     {
//         type: String
//     },
//     city:
//     {
//         type: String,
//         required: true
//     },
//     pan:
//     {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     aadhaar:
//     {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     ename: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     erelation: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     emobile:{
//         type: String,
//         required: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
// })

// const transporter = mongoose.model('Transporter',{
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//         uppercase: true
//     },
//     lastname: 
//     {
//         type: String,
//         required: true ,
//         trim: true,
//         uppercase: true  
//     },
//     mobile:{
//         type: String,
//         required: true,
//         unique: true,
//         maxlength: [12,"Invalid Mobile Number"]
//     }
//     ,
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         validate(value)
//         {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error("Please fill valid email!")
//             }
//         }

//     },
//     password:
//     {
//         type: String,
//         required: true
//     },
//     status:
//     {
//         type: Number,
//         required: true,
//         default: 0 
//     },
//     gst:
//     {
//         type: String,
//         required: true,
       
//     },
//     sta:
//     {
//         type: String,
//         required: true,
//     },
//     pan:
//     {
//         type: String,
//         required: true,
//         unique: true
//     },
//     aadhaar:
//     {
//         type: String,
//         required: true,
//         unique: true
//     },
//     mininglicense: {
//         type: String,
//         required: true,
//     }
// })


// const booking  = mongoose.Schema('Booking',{
//     bookingid: {
//         type: Number,
//         required: true,
//         unique: true
//     },
//     vehicleownerid:
//     {
//         type: Number,
//         required: true
//     },
//     vehicleid:
//     {
//        type: Number     
//     },
//     mineid:
//     {
//         type: Number,
//         required: true
//     },
//     loading:
//     {
//         type: String,
//         required: true
//     },
//     status:
//     {
//         type: String,
//         enum : ['PENDING','ACTIVE'],
//         default: 'PENDING'
//     }
// })


// const ticket = mongoose.Schema("Ticket",{
//     ticketid:
//     {
//         type: Number,
//         unique: true,
//         required: true
//     },
//     userid:
//     {
//         type: Number,
//         required: true
//     },
//     category:
//     {
//         type: String,
//         required: true
//     },
//     message:
//     {
//         type: String
//     }
// }) 

// const invoice = mongoose.Schema("Invoice",{
//     invoiceid:
//     {
//         type: Number,
//         unique: true,
//         required: true
//     },
//     vehicleno:
//     {
//         type: String,
//         required: true
//     },
//     tonnage:
//     {
//         type: Number,
//         required: true
//     },
//     rate:
//     {
//         type: Number,
//         required: true
//     },
//     amount:
//     {
//         type:Number,
//         default: 0
       
//     },
//     hsd:
//     {
//         type: Number
//         ,
//         default: 0
//     },
//     cash:
//     {
//         type: Number,
//         default: 0
//     },
//     tds:
//     {
//         type: Number,
//         default: 0
//     },
//     officecharge:
//     {
//         type: Number,
//         default: 0
//     },
//     shortage:
//     {
//         type: Number
//         ,
//         default: 0
//     },
//     balanceamount:
//     {
//         type: Number,
//         default: 0
//     },
//     challantotransporter:
//     {
//         type: String,
//         default: "NA"
//     },
//     balanceamountcleared:
//     {
//         type: String,
//         default: "NA"
//     },
//     status:
//     {
//         type: String,
//         enum : ['PENDING','COMPLETED'],
//         default: 'PENDING'
//     }

// })

// function arrayLimit(val) {
//     return val.length > 0;
//   }


// /*const me = new VehicleOwner({
//     firstname: "Minal Arora",
//     lastname: "Arora",
//     mobile: "911218871748278",
//     email:"minaalarora567@gmail.com",
//     password:"Minal#123",
//     vehicleownerid:123,
//     accountno:"918871748278",
//     ifsc:"PYTM0123456",
   
// })

// me.save().then((VehicleOwner)=>{
//         console.log(VehicleOwner)
// }).
// catch((error)=>{
//     console.log(error)
// })*/

// /*const Mine = mongoose.model('user',{
//     name: {
//         type: String
//     },
//     gender: {
//         type: Number
//     }
// })

// const me = new Mine({name:'Prachi Katare', gender: 23})
// me.save().then((user)=>{
//         console.log(user)
// }).catch((error)=>{
//     console.log(error)
// })*/

