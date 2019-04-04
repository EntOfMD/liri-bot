require('dotenv').config();
const spotify = new Spotify(keys.spotify);
const keys = require('./config/keys');

const axios = require('axios');
const moment = require('moment');

var Args = process.argv;
var searchStr = '';

for (var i = 2; i < Args.length; i++) {
    if (i > 2 && i < Args.length) {
        searchStr = searchStr + '+' + Args[i];
    } else {
        searchStr += Args[i];
    }
}
