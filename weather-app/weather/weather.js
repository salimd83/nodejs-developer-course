const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/4d81c52c29ad670d3ed12795f77857d0/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: toCelcius(body.currently.temperature, 4),
                feels: toCelcius(body.currently.apparentTemperature, 5)
            })
        } else {
            if (error) {
                callback('Unable to connect to Forecast.io server')
            } else if (body === "Forbidden\n") {
                callback('Wrong API');
            } else if (body.code === 400) {
                callback(body.error);
            } else {
                callback('Unable to fetch weather.')
            }
        }
    })
}

function toCelcius(fah, pres) {
    return ((fah -32) * 5 / 9).toPrecision(pres);
}

module.exports.getWeather = getWeather;