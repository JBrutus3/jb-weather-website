const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/c2993abe412adf65073706718d9a947f/${latitude},${longitude}?`;

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!');
            return;
        }

        if (body.error) {
            callback('Unable to find location.');
            return;
        }

        const { currently, daily } = body;
        const { temperature, precipProbability } = currently;
        const { data: dailyData } = daily;

       callback(undefined, `${dailyData[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
    });
};

module.exports = forecast;