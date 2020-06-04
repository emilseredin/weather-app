const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const uri = "http://api.weatherstack.com/current?access_key=6126b4a81b4dae7d5ad44d2f864eaac0&query=" + latitude + "," + longitude;

    request({ uri, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather service!", undefined);
        } else if(body.error) {
            callback("Unable to find the location!", undefined);
        } else {
            const data = body.current;
            callback(undefined, { temperature: data.temperature, feelslike: data.feelslike });
        }
    });
};

module.exports = forecast;
