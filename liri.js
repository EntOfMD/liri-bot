require('dotenv').config();

var Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');

const keys = require('./config/keys');
const spotify = new Spotify(keys.spotify);

var Args = process.argv;
var searchStr = '';

for (var i = 3; i < Args.length; i++) {
    if (i > 3 && i < Args.length) {
        searchStr = `${searchStr} ${Args[i]}`;
    } else {
        searchStr += Args[i];
    }
}
console.log(Args);
console.log(searchStr);
function concertThis(artist) {
    let qURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    axios
        .get(qURL)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            throw err;
        });
}

switch (Args[2]) {
    case 'concert-this':
        concertThis(searchStr);
        break;
    case 'spotify-this-song':
        break;
    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
}
