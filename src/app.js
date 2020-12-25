const express  = require("express")
const helmet=  require('helmet')
const compression = require('compression')
const path = require('path')
const ejs = require('ejs')
const app = express()
const bodyparser = require('body-parser')
const port  = process.env.PORT || 3000
require("./db/dbfile")

const Admin  = require('./routers/admin')
const AreaManager = require('./routers/areamanager')
const Booking = require('./routers/booking')
const Fieldstaff = require('./routers/fieldstaff')
const Finance = require('./routers/finance')
const Invoice  = require('./routers/invoice')
const Mine =  require('./routers/mine')
const Ticket =  require('./routers/ticket')
const Transporter = require('./routers/transporter')
const Vehicle = require('./routers/vehicle')
const VehicleOwner = require("./routers/vehicleowner")
const WebAdmin = require('./routers/webadmin')
const WebAreaManager  = require('./routers/webareamanager')
const WebFieldStaff =  require('./routers/webfieldstaff')
const WebFinance  =  require('./routers/webfinance')
const WebInvoice  =  require('./routers/webinvoice')
const WebLogin  =  require('./routers/weblogin')
const WebMine = require('./routers/webmine')
const WebResale =  require('./routers/webresale')
const WebRewardReferral = require('./routers/webrewardreferral')
const WebTransporter  =  require('./routers/webtransporter')
const WebVehicleOwner  =  require('./routers/webvehicleowner')



const viewsPath = path.join(__dirname,'./views')
app.set('view engine','ejs')
app.set('views',viewsPath)

/*app.use((req,res,next)=>{
    /*  if(req.method == 'GET')
      {
          res.send('GET REQUEST ARE DISABLED')
      }
      else
      {
          next()
      }*/
  
      /*res.status(400).send('site is currently down')
  })*/

//  const partialsPath  = path.join(__dirname,'./partials')
//  ejs.registerPartials(partialsPath)


const publicPath = path.join(__dirname,'./public')
app.use(express.static(publicPath))





 app.use(bodyparser.json()); 

// for parsing application/xwww-
app.use(bodyparser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(express.static('public'));

app.use(WebAdmin)
app.use(WebAreaManager)
app.use(WebFieldStaff)
app.use(WebFinance)
app.use(WebInvoice)
app.use(WebLogin)
app.use(WebMine)
app.use(WebResale)
app.use(WebRewardReferral)
app.use(WebTransporter)
app.use(WebVehicleOwner)


app.use(express.json())

app.use(Admin)
app.use(AreaManager)
app.use(Booking)
app.use(Fieldstaff)
app.use(Finance)
app.use(Invoice)
app.use(Mine)
app.use(Ticket)
app.use(Transporter)
app.use(Vehicle)
app.use(VehicleOwner)

app.use(helmet())
app.use(compression())





/*
const updateMobileAndCount = async(id,mobile)=>{
const user = await User.findByIdAndUpdate()
const count = await User.countDocuments()
return count
}.then(count){

}
.catch(e)
*/



app.listen(port,()=>{
    console.log("server is up on port", port)
})