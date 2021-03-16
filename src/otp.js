
var http = require("https");



const sendLoginOtp = async function(mobile)
{
 
    try
    {
      let apiKey = "apikey=" + encodeURIComponent("6sd+/zjlFsk-3sImebRHUKqPjzHbInlLLHgoUzy9kh");
			let message = "&message=" + encodeURIComponent("1234 is your confirmation OTP. Please do not share your OTP and confidential info with anyone. Transfly");
			let sender = "&sender=" + encodeURIComponent("TFIKJR");
			let numbers = "&numbers=" + encodeURIComponent("91" + mobile);

      let data = "/send/?" + apiKey + numbers + message + sender;

             var options = {
          "method": "GET",
          "hostname": "https://api.textlocal.in",
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


const sendOtherOtp = async function(mobile)
{
  try
  {
    let apiKey = "apikey=" + encodeURIComponent("6sd+/zjlFsk-3sImebRHUKqPjzHbInlLLHgoUzy9kh");
    let message = "&message=" + encodeURIComponent("We have sent the OTP to your registered mobile number 5678. TransFly");
    let sender = "&sender=" + encodeURIComponent("TFIKJR");
    let numbers = "&numbers=" + encodeURIComponent("91" + mobile);

    let data = "/send/?" + apiKey + numbers + message + sender;

           var options = {
        "method": "GET",
        "hostname": "https://api.textlocal.in",
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


const verifyOtp =  function(mobile,otp,response)
{
    try
    {
     
var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v5/otp/verify?authkey=350944Ar65hw8BuM5ff29c59P1&mobile=91" + mobile +"&otp=" + otp,
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
   // console.log(body.toString())
    if(JSON.parse(body.toString()).type == "success")
    {
        response.status(200).send(body.toString());
    }
    else
    {
        response.status(400).send(body.toString());
    }
   
  });
});

req.end();
    }
    catch(e)
    {

    }
}


const retryOtp = function(mobile)
{
    try
    {
        

var options = {
  "method": "POST",
  "hostname": "api.msg91.com",
  "port": null,
  "path": "/api/v5/otp/retry?authkey=350944Ar65hw8BuM5ff29c59P1&retrytype=text&mobile=91" + mobile,
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
  //  console.log(body.toString());
  });
});

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