const request = require("request")

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=afd1d062b6dbf17543bdf1a48c49b037&query='+latitude+','+longitude+'&units=f'

    request({ url, json: true},(error, { body })=>{
        if(error){
            callback("Unable to connect to the weather service!", undefined)
        } else if(body.error){
            callback("unable to find location", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+" ,It is currently "+body.current.temperature+" degrees out, It feels like "+body.current.feelslike+" degree out. There is "+body.current.precip+"% chance of rain"
            )
        }
    })
}

module.exports = forecast