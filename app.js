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
require("./src/telegrambot")

var CronJob = require('cron').CronJob

// 


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
const Reward = require('./src/routers/reward')
const Referral = require('./src/routers/referral')
const Banner = require('./src/routers/banner')
const Resale = require('./src/routers/resale')
const Loading = require('./src/routers/loading')
const Notification = require('./src/routers/notification')

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
const WebVehicle = require('./src/routers/webvehicle')


var fs = require('fs');
var dir = path.join(__dirname, 'public');
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

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
app.use(WebVehicle)


app.use(express.json())

app.use(Utils)
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
app.use(Reward)
app.use(Referral)
app.use(Banner)
app.use(Resale)
app.use(Loading)
app.use(Notification)

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

const MineModel = require('./src/models/mine')
const job = new CronJob('00 30 18 * * *', async function() {
	// const d = new Date();
    ////('Midnight:', d);
    let conditions = {};
    let update = {
        $set : {
       active: true
      }
    };
    let options = { multi: true, upsert: true };
    MineModel.updateMany(conditions,update,options,(err,doc)=>{
        if(doc)
        {

            
        }
        else
        {
            
        }

    })
    
}, null,true,'UTC');

if(!job.running)
{
job.start();
}


// MineModel.findOne({id: 9249621}).then((mine)=>{
    
//     let md = new Date(mine.createdAt)  
//    //(md.getDate() + "/" + md.getMonth())  
// })
// let timestamp = Date.now()
// let d = new Date(timestamp)
////(d.getDate()+
// "/" + d.getMonth())


//23.22711425650364, 77.45051007284236
//22.73911121759402, 75.87825608143429
// function distance(lat1, lon1, lat2, lon2, unit) {
// 	if ((lat1 == lat2) && (lon1 == lon2)) {
// 		return 0;
// 	}
// 	else {
// 		var radlat1 = Math.PI * lat1/180;
// 		var radlat2 = Math.PI * lat2/180;
// 		var theta = lon1-lon2;
// 		var radtheta = Math.PI * theta/180;
// 		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
// 		if (dist > 1) {
// 			dist = 1;
// 		}
// 		dist = Math.acos(dist);
// 		dist = dist * 180/Math.PI;
// 		dist = dist * 60 * 1.1515;
// 		if (unit=="K") { dist = dist * 1.609344 }
// 		if (unit=="N") { dist = dist * 0.8684 }
// 		return dist;
// 	}
// }


////.log(distance(23.22711425650364, 77.45051007284236,22.73911121759402, 75.87825608143429,'K'))



app.listen(port, () => {
   //("server is up on port", port)
})




let englisharr = ["Please enter last four digits of your registered vehicle",
"Please select the vehicle number for this Loading",
"Please select your vehicle number from the list",
"Please select your vehicle number",
"Press 0 to speak to our customer care representative",
"Press 1 for English",
"Press 1 for New Loading",
"Press 1 for Vizag Loading",
"Press 1 to book your loading from Balaji Crusher",
"Press 1 to book your loading from KP Mines or Thakurani Mines",
"Press 1 to book your loading from MGM Mines",
"Press 1 to book your loading from NE Mines",
"Press 1 to book your loading from RP Sahu Mines",
"Press 1 to enter vehicle number for which assistance is required",
"Press 1 to enter vehicle number for which Challan info is required",
"Press 1 to enter vehicle number for which Loading is required",
"Press 1 to Load from Joda",
"Press 1 to raise a ticket for vehicle breakdown assistance",
"Press 2 for Gopalpur Loading",
"Press 2 to book your loading from Kalinga Plant",
"Press 2 to book your loading from KMC Mines",
"Press 2 to book your loading from MDH mines",
"Press 2 to book your loading from SN Mohanty mines",
"Press 2 to generate list from the Database",
"Press 2 to know information on last challan cleared status",
"Press 2 to Load from Badbil",
"Press 2 to raise a ticket for vehicle accident assistance",
"Press 3 for On-Road Assistance",
"Press 3 for Paradip Loading",
"Press 3 to book your loading from AMTC mines",
"Press 3 to book your loading from Essar Plant",
"Press 3 to book your loading from KJS Ahluwalia mines",
"Press 3 to book your loading from KN Ram mines",
"Press 3 to Load from Rugudi",
"Press 3 to raise a ticket for any other onroad assistance",
"Press 4 for Haldia Loading",
"Press 4 to book your loading from D-top mines",
"Press 4 to book your loading from Geetarani mines",
"Press 4 to Load from Koida",
"Press 5 for Raigarh Loading",
"Press 5 to book your loading from JN Pattnaik Mines",
"Press 5 to Load from Jamda",
"Press 6 for Raipur Loading",
"Press 6 to book your loading from Essel Minings",
"Press 7 to book your loading from PTA mines",
"Press 8 to go to Previous Menu",
"Press 9 to go back to main menu",
"Sorry, the number is not registered. Please register on our app or speak to customer care",
"Thank you, information has been sent to your registred mobile number",
"Thank you, our emergency response team will soon get in touch with you",
"Thank you, please hold on while we get the list of your registred vehicles",
"Thank you, your booking has been received",
"The mentioned number did not match",
"Please type your registered mobile number",
"Select the following options",
"Please select a valid option",
"BARBIL",
"JAMDA",
"JODA",
"KOIRA",
"RUGUDI",
"KP MINES",
"KALINGA PLANT",
"KN RAM MINES",
"BALAJI CRUSHER",
"MGM",
"KMC MINES",
"ESSAR PLANT",
"NE MINES",
"NE Mines ORAGHAT",
"SN MOHANTY",
"AMTC/JSW",
"GEETARANI",
"JN PATTNAIK MINES",
"ESSEL MININGS",
"PTA MINES",
"RP SAHU",
"MDH",
"KJS AHLUWALIA",
"D-TOP",
"VIZAG",
"PARADIP",
"GOPALPUR",
"RAIGARH",
"RAIPUR",
"HALDIA",
"Vehicle Breakdown",
"Vehicle Accident",
"Other On-Road Support",
"Loading Problem",
]

// for(let i = 0;i< englisharr.length;i++)
// {
//     console.log(i,englisharr[i])
// }

console.log(false == false)