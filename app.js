const express = require("express")
const https = require('https')
const helmet = require('helmet')
const compression = require('compression')
const path = require('path')
const ejs = require('ejs')
const app = express()
const fs = require('fs')

//  const privateKey = fs.readFileSync('/etc/letsencrypt/live/transflyhome.club/privkey.pem','utf8')
//  const certificate = fs.readFileSync('/etc/letsencrypt/live/transflyhome.club/cert.pem','utf8')
//  const ca = fs.readFileSync('/etc/letsencrypt/live/transflyhome.club/chain.pem','utf8')

//  var https_options = {
//     key: fs.readFileSync("transflyhome.club.key"),
//     cert: fs.readFileSync("transflyhome.club.csr")
// };


var session = require('express-session');
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000
require("./src/db/dbfile")
//require("./src/telegrambot")

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
const Transporterrequest = require('./src/routers/transporterrequest')
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
const Notificationtransporter = require('./src/routers/notificationtransporter')

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

const Local = require('./src/routers/local')
const Otp = require('./src/routers/otp')
const BackOffice = require('./src/routers/backoffice')



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
app.use(express.static('uploads'))


//app.use(bodyparser.json());

// for parsing application/xwww-
app.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyparser.json({limit: '50mb'}));
//app.use(express.json({limit: '50mb'}));

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
app.use(Transporterrequest)
app.use(Vehicle)
app.use(VehicleOwner)
app.use(Rating)
app.use(Reward)
app.use(Referral)
app.use(Banner)
app.use(Resale)
app.use(Loading)
app.use(Notification)
app.use(Notificationtransporter)
app.use(Local)
app.use(Otp)
app.use(BackOffice)

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



// https.createServer(https_options,app).listen(port, () => {
//    ("server is up on port", port)
// })

app.listen(port,()=>{
    ("server is up on port", port)
})





