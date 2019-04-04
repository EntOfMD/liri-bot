require('dotenv').config();
var keys = require('./config/keys');
var spotify = new Spotify(keys.spotify);

var Args = process.argv;

var searchStr = '';
for (var i = 2; i < Args.length; i++) {
    if (i > 2 && i < Args.length) {
        searchStr = searchStr + '+' + Args[i];
    } else {
        searchStr += Args[i];
    }
}
