const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=e46ce88f01293fa5ff1745adb1688934&query=${latitude},${longitude}&units=f`
    request({url,json:true},(error,response)=>{
        if(error){
            callback('no internet connection',undefined);
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,'description: '+response.body.current.weather_descriptions[0]+',temp: '+response.body.current.temperature)
            
        }
    })
}

module.exports= forecast;