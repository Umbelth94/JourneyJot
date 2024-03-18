require("dotenv").config();
var weather = require("weather-js");

// Options:
// search:     location name or zipcode
// degreeType: F or C

//Make the search an input, possibly middleware to convert it into a zipcode
// weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
//   if(err) console.log(err);

//   console.log(JSON.stringify(result, null, 2));
// });
async function response(city, state) {
    weather.find(
        { search: `${city}, ${{ state }}`, degreeType: "F" },
        function (err, result) {
            if (err) console.log(err);

            console.log(JSON.stringify(result, null, 2));
        },
    );
}

module.exports = { response };
