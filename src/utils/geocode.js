const request = require("postman-request");

const geocode = (address, callback) => {
    const uri = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZW1pbC1zIiwiYSI6ImNrYXV2cmJnNjB3NWwyeW8zeHhrMGZmbTIifQ.jBL-FZRXydKwZMppbmSCGQ&limit=1";
    request({ uri, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the Geolocation service!", undefined);
        } else if (body.message || body.features.length === 0) {
            callback("Unable to find the location", undefined);
        } else { 
            const data = body.features[0];
            callback(undefined, { location: data.place_name, coordinates: { latitude: data.center[1], longitude: data.center[0] } });
        }
    });
};

module.exports = geocode;
