const express = require("express")
const helmet = require('helmet')
const compression = require('compression')
const path = require('path')
const ejs = require('ejs')
const app = express()
var session = require('express-session');
const bodyparser = require('body-parser')
const port = process.env.PORT || 8080
require("./src/db/dbfile")

const Admin = require('./src/routers/admin')
const AreaManager = require('./src/routers/areamanager')
const Booking = require('./src/routers/booking')
const Fieldstaff = require('./src/routers/fieldstaff')
const Finance = require('./src/routers/finance')
const Invoice = require('./src/routers/invoice')
const Mine = require('./src/routers/mine')
const Ticket = require('./src/routers/ticket')
const Transporter = require('./src/routers/transporter')
const Vehicle = require('./src/routers/vehicle')
const VehicleOwner = require("./src/routers/vehicleowner")
const Rating = require('./src/routers/rating')
const Utils = require('./src/routers/utils')

const WebAdmin = require('./src/routers/webadmin')
const WebAreaManager = require('./src/routers/webareamanager')
const WebFieldStaff = require('./src/routers/webfieldstaff')
const WebFinance = require('./src/routers/webfinance')
const WebInvoice = require('./src/routers/webinvoice')
const WebLogin = require('./src/routers/weblogin')
const WebMine = require('./src/routers/webmine')
const WebResale = require('./src/routers/webresale')
const WebRewardReferral = require('./src/routers/webrewardreferral')
const WebTransporter = require('./src/routers/webtransporter')
const WebVehicleOwner = require('./src/routers/webvehicleowner')




const viewsPath = path.join(__dirname, './src/views')
app.set('view engine', 'ejs')
app.set('views', viewsPath)
// session 
app.use(session({ secret: 'secret', saveUninitialized: true, resave: true }));


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


const publicPath = path.join(__dirname, './src/public')
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
app.use(Rating)
app.use(Utils)

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



app.listen(port, () => {
    console.log("server is up on port", port)
})