# LIRI Bot

_A **L**anguage **I**nterpretation and **R**ecognition **I**nterface tool_ - LIRI will help you search for movies, music, and concerts! S.A.M will log the inputs as well as searches into an external file.

#### Meet _S.A.M_!

LIRI Bot is integrated with custom made **S**uper **A**utomated **M**achine\*. While LIRI takes in the information User types in, S.A.M. does the computing and displays the information.

###### \*S.A.M is still experimental, your mileage may vary!

## How to use LIRI/S.A.M?

---

1. **MAKE SURE YOU HAVE NODE/NPM INSTALLED!**
1. Clone the repo and navigate to the root folder of repo
1. Type `npm install` in console
1. `node liri` is the starting sequence.
    1. type the arguments in a single line
    1. > ex: `node liri spotify-this-song Your Song Goes Here`
1. For `do-what-it-says`, MAKE SURE TO ADD A COMMAND INSIDE 'random.txt'
    1. > ex: spotify-this-song,wake me up

## LIRI Commands

---

| Commands            | What it does                                                                                     | example                          |
| ------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------- |
| `spotify-this-song` | Uses Spotify API and search the supplied song                                                    | `spotify-this-song waking lions` |
| `movie-this`        | Uses OMDB API and search the supplied movie by title                                             | `movie-this trainspotting`       |
| `concert-this`      | Uses Bands In Town API to search for supplied band. S.A.M will ask your input for display amount | `concert-this rise against`      |
| `do-what-it-says`   | specify a command inside `random.txt`, along with a value                                        | `node liri do-what-it-says`      |

---

### [Click here to see a demo video](https://ashell.me/assets/node-liri.mp4)

---

## Made by [Ashell F\_ | EntOfMD](https://github.com/EntOfMD) with &heartsuit;
