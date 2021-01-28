let moment = require('moment-timezone')

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

const date = new Date()
let newdate = convertTZ(date, "asia/kolkata") 
let momObj = moment(new Date()).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss").toString()
//.log(momObj.toString());
//.log(new Date(momObj.toString()));

// let arr = [1,2,3]
// let arr2 = arr.map((a=>{
//     return a*a
// }))
////(arr)
////(arr2)