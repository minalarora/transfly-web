
var http = require("https");

let otp = [1234,2313,2334,9876,7634,8786,7934,1213,3423,7772,9861,2578,7465,0981,1200,1209,1923]
function between() {  
  let min = 0
  let max = otp.length - 1
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

const sendLoginOtp = async function(mobile)
{
 
    try
    {
      let apiKey = "apikey=" + encodeURIComponent("6sd+/zjlFsk-3sImebRHUKqPjzHbInlLLHgoUzy9kh");
			let message = "&message=" + encodeURIComponent(otp[between()] +" is your confirmation OTP. Please do not share your OTP and confidential info with anyone. Transfly");
			let sender = "&sender=" + encodeURIComponent("TFIKJR");
			let numbers = "&numbers=" + encodeURIComponent("91" + mobile);

      let data = "/send/?" + apiKey + numbers + message + sender;

             var options = {
          "method": "GET",
          "hostname": "api.textlocal.in",
          "port": null,
          "path": data,
          "headers": {
            "content-type": "application/json"
          }
        };

        
        var req = http.request(options, function (res) {
          var chunks = [];
        console.log(res)
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString())
            return body.toString();
          });
        });
        
        req.write("{}");
        req.end();
    }
    catch(e)
    {

    }
    
}


const sendOtherOtp = async function(mobile)
{
  try
  {
    let apiKey = "apikey=" + encodeURIComponent("6sd+/zjlFsk-3sImebRHUKqPjzHbInlLLHgoUzy9kh");
    let message = "&message=" + encodeURIComponent("We have sent the OTP to your registered mobile number " + otp[between()] +". TransFly");
    let sender = "&sender=" + encodeURIComponent("TFIKJR");
    let numbers = "&numbers=" + encodeURIComponent("91" + mobile);

    let data = "/send/?" + apiKey + numbers + message + sender;

           var options = {
        "method": "GET",
        "hostname": "api.textlocal.in",
        "port": null,
        "path": data,
        "headers": {
          "content-type": "application/json"
        }
      };

      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          return body.toString();
        });
      });
      
      req.write("{}");
      req.end();
  }
  catch(e)
  {

  }
}


const verifyOtp =  function(mobile,o,response)
{
    try
    {
     
      if(otp.includes(o))
      {
        response.status(200).send("");
      }
      else
      {
        response.status(400).send("");
      }
    }
    catch(e)
    {

    }
}


const retryOtp = function(mobile)
{
  try
  {
    let apiKey = "apikey=" + encodeURIComponent("6sd+/zjlFsk-3sImebRHUKqPjzHbInlLLHgoUzy9kh");
    let message = "&message=" + encodeURIComponent(otp[between()] +" is your confirmation OTP. Please do not share your OTP and confidential info with anyone. Transfly");
    let sender = "&sender=" + encodeURIComponent("TFIKJR");
    let numbers = "&numbers=" + encodeURIComponent("91" + mobile);

    let data = "/send/?" + apiKey + numbers + message + sender;

           var options = {
        "method": "GET",
        "hostname": "api.textlocal.in",
        "port": null,
        "path": data,
        "headers": {
          "content-type": "application/json"
        }
      };

      
      var req = http.request(options, function (res) {
        var chunks = [];
      console.log(res)
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString())
          return body.toString();
        });
      });
      
      req.write("{}");
      req.end();
  }
  catch(e)
  {

  }

}


module.exports = {
    sendLoginOtp,
    sendOtherOtp,
    verifyOtp,
    retryOtp
}
 
//6043361a8f2bab509867ee8b
//604335237a221d7aa90bc48d