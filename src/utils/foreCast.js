
const request=require('request')

const chalk=require('chalk')

const foreCast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d59800cb656d9ff535448e7552c32a07/' + longitude + ',' + latitude+'?units=si'
  
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback('Unable to connect to forecast! ', undefined)
      } else if (body.error) {
        callback('Unable to Find the Location! ', undefined)
      } else {
        callback(undefined, {
          data:body.daily.data[0].summary+' It is currently '+ body.currently.temperature+' degrees out.'+' There is '+ body.currently.precipProbability+' % chance of rain.'
        })
        
      } 
  
  
    })
  }
  

  module.exports=foreCast