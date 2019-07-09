require('dotenv').config(); //this is for .env file
const stdin = process.stdin; //this is to get user input OPTIONAL
stdin.setEncoding('utf-8'); //this sets user input to utf-8 OPTIONAL

const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

const keys = require('./config/keys');
const spotify = new Spotify(keys.spotify);

var Args = process.argv; //this is to access the arguments passed down from the console
var searchStr = ''; //this is what the user searched for

//this grabs everything after 'node fileName'. ex: 'node filename this song has space' it'll store 'this song has space'
for (var i = 3; i < Args.length; i++) {
  if (i > 3 && i < Args.length) {
    searchStr = `${searchStr} ${Args[i]}`;
  } else {
    searchStr += Args[i];
  }
}
//a template for the logger to use
var logLine;
if (
  Args[2] === 'concert-this' ||
  Args[2] === 'spotify-this-song' ||
  Args[2] === 'movie-this' ||
  Args[2] === 'do-what-it-says'
) {
  logLine = `${moment().format('MMMM Do YYYY, h:mm:ss a')}: User used ${
    Args[2]
  } to search ${searchStr == '' ? 'default search parameters' : searchStr}\n`;
} else if (Args[2] === 'help') {
  logLine = `${moment().format('MMMM Do YYYY, h:mm:ss a')}: User used ${
    Args[2]
  } to look for commands\n`;
} else {
  logLine = `${moment().format(
    'MMMM Do YYYY, h:mm:ss a'
  )}: User did not enter a valid command.\n`;
}

//are we supposed to just log the commands or use a middleware like morgan?
fs.appendFile('log.txt', logLine, err => {
  if (err) throw err;
});

//a template for setTimeout
function delay(msg, time) {
  setTimeout(() => {
    console.log(msg);
  }, time);
}
//S.A.M does it's computing here for concert-this
function concertSAM(info) {
  console.log(
    `Hi! My name is S.A.M (Super Automated Machine) and I'll be helping you today.`
  );
  delay(
    `${
      info.length == 1
        ? ''
        : `There are ${info.length} results. How many would you like to see?`
    }`,
    200
  );

  if (info.length > 1) {
    //uses process.stdin to take input from users and play with it
    stdin.on('data', chunk => {
      var input = chunk.trim();

      if (input <= info.length) {
        for (i = 0; i < input; i++) {
          console.log(`
                            Result #${i + 1}
                            +-+-+-+-+`);
          console.log(
            `S.A.M: Venue name is ${info[i].venue.name}. It'll be in ${
              info[i].venue.city
            }, ${info[i].venue.region}. The event is going to be on ${moment(
              info[i].datetime
            ).format('L')}`
          );
        }
      } else {
        console.log(`S.A.M: There are only ${info.length} choices..`);
      }
      process.exit();
    });
  } else {
    for (i = 0; i < info.length; i++) {
      console.log(`
                        Result #${i + 1}
                        +-+-+-+-+`);
      console.log(
        `S.A.M: Venue name is ${info[i].venue.name}. It'll be in ${
          info[i].venue.city
        }, ${info[i].venue.region}. The event is going to be on ${moment(
          info[i].datetime
        ).format('L')}`
      );
    }
  }
}

function movieSAM(info) {
  console.log(
    `Hi! My name is S.A.M (Super Automated Machine) and I'll be helping you today.`
  );

  setTimeout(() => {
    console.log(`
        S.A.M:
        Found results for ${info.Title}, which was released in ${
      info.Year
    }. IMDB rated it ${info.imdbRating}/10, while Rotten Tomatoes rated it ${
      info.Ratings[1].Value
    }. ${info.Title} was released to ${info.Country}, and offers in ${
      info.Language.length > 1 ? 'mutiple languages' : 'one language'
    }, them being ${info.Language}. A summery for ${info.Title} is ${
      info.Plot
    } The movie has many great actors and actresses, such as ${info.Actors}.
        `);
  }, 200);
}

function spotifySAM(info) {
  console.log(
    `\nHi! My name is S.A.M (Super Automated Machine) and I'll be helping you today.`
  );

  console.log(`
  S.A.M:
  +-+-+-+-+

  Artist: ${info.tracks.items[0].album.artists[0].name}
  Song Name: ${info.tracks.items[0].name}
  Preview Link: ${info.tracks.items[0].album.external_urls.spotify}
  Album Name: ${info.tracks.items[0].album.name}
  `);
}

function lil_biach() {
  fs.readFile('random.txt', 'utf8', (err, string) => {
    if (err) throw err;

    let stringArr = string.split(',');
    let command = stringArr[0];
    let search = stringArr[1];

    switch (command) {
      case 'concert-this':
        concertThis(search);
        break;
      case 'spotify-this-song':
        spotifyThis(search);
        break;
      case 'movie-this':
        movieThis(search);
        break;
      default:
        console.log(`S.A.M: CAN'T READ A COMMAND`);
        break;
    }
  });
}
//concert-this' brings data from API and passes to S.A.M.
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

function movieThis(movie) {
  let qURL = `https://www.omdbapi.com/?t=${movie}&apikey=trilogy&plot=short&r=json`;

  axios.get(qURL).then(res => {
    let info = res.data;

    movieSAM(info);
  });
}

function spotifyThis(song) {
  spotify
    .search({
      type: 'track',
      query: song,
      limit: 1
    })
    .then(res => {
      spotifySAM(res);
    })
    .catch(err => {
      throw err;
    });
}

function displayHelp() {
  console.log(`
  Available commands:
  * concert-this      | artist name
  * movie-this        | movie name 
  * spotify-this-song | song name
  * do-what-it-says   | does what the file 'random.txt' says
  `);
}

//decides where to direct S.A.M.
switch (Args[2]) {
  case 'concert-this':
    if (Args[3]) {
      concertThis(searchStr);
    } else {
      console.warn('No band was specified, searching for Rise Against');
      concertThis('Rise Against');
    }
    break;
  case 'spotify-this-song':
    if (Args[3]) {
      spotifyThis(searchStr);
    } else {
      spotifyThis('Voodoo');
    }
    break;
  case 'movie-this':
    if (Args[3]) {
      movieThis(searchStr);
    } else {
      movieThis('Trainspotting');
    }
    break;
  case 'do-what-it-says':
    lil_biach();
    break;
  case 'help':
    displayHelp();
    break;
  default:
    console.log(
      `Not a valid option. Try again with 'concert-this', 'spotify-this-song','movie-this', or 'do-what-it-says'! or 'help'`
    );
    break;
}
