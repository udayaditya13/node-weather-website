const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/38bc01284794b054587eaf64e0fb66de/' + encodeURIComponent(lat) +', ' + encodeURIComponent(long) +'?units=si'

    request({ url, json : true}, (error, {body}) => {
        if(error){
            callback('Cannot reach weather services', undefined)
        }else if(body.error){
            callback('Incorrect Coordinates', undefined)
        }else{
            const curr = body.currently
            callback(undefined, body.daily.data[0].summary + ' it is currently ' + curr.temperature + ' degrees. there is ' + curr.precipProbability + ' chance of rain')
        }
    })
}

module.exports = forecast