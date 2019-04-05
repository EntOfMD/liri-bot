require('dotenv').config();
const stdin = process.stdin;
stdin.setEncoding('utf-8');

const Spotify = require('node-spotify-api');
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

function delay(msg, time) {
    setTimeout(() => {
        console.log(msg);
    }, time);
}
function concertSAM(info) {
    console.log(
        `Hi! My name is S.A.M (Super Automated Machine) and I'll be helping you today.`
    );
    delay(
        `There are ${info.length} results. How many would you like to see?`,
        800
    );
    stdin.on('data', chunk => {
        var input = chunk.trim();
        if (input < info.length) {
            for (i = 0; i < input; i++) {
                console.log(`
                            Result #${i + 1}
                            +-+-+-+-+`);
                console.log(
                    `S.A.M: Venue name is ${info[i].venue.name}. It'll be in ${
                        info[i].venue.city
                    }, ${
                        info[i].venue.region
                    }. The event is going to be on ${moment(
                        info[i].datetime
                    ).format('L')}`
                );
            }
        } else {
            console.log(`S.A.M: There are only ${info.length} choices..`);
        }
        process.exit();
    });
}

function concertThis(artist) {
    let qURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    axios
        .get(qURL)
        .then(res => {
            let info = res.data;
            concertSAM(info);
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
