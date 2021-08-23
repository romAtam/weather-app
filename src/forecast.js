const request =require("request");

const forecast=(latitude,longitude,callback) => {
    url=`http://api.weatherstack.com/current?access_key=5797582b8fd2fbeed673d6aea06f223a&query=${latitude},${longitude}`
    request({url,json:true},(err,response) => {
if(err){
    callback("unable to connect to server",undefined)
}
else if(response.body.error) {
callback("unable to find location",undefined)
}
else{
callback(undefined,response.body.current)
}

    })
}
module.exports =forecast;