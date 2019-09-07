const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamJydXR1cyIsImEiOiJjanprZXpjZHMwazQ2M25wZzRuMHloamJ4In0.aXDY0e8ACiLWNTwdPuqwag&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!');
            return;
        }

        if (body.features.length === 0) {
            callback('No matching results');
            return;
        }

        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];

        callback(undefined, { latitude, longitude, location: body.features[0].place_name });
    });
};

module.exports = geocode;