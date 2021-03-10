//declare gameplay variables
var wins = 0;
var losses = 0;
var wrongGuessesLeft = 6;
var wordDisplay = [];
var guessed = [];

//store variables to adjust hangman picture
var hangman0Image = document.getElementById("hangman0");
var hangman1Image = document.getElementById("hangman1");
var hangman2Image = document.getElementById("hangman2");
var hangman3Image = document.getElementById("hangman3");
var hangman4Image = document.getElementById("hangman4");
var hangman5Image = document.getElementById("hangman5");

//array of imdb top 250 movies
var movies = ["shawshank redemption", "godfather", "godfather ii", "dark knight", "twelve angry men", "schindler's list", "return of the king", "pulp fiction", "the good the bad and the ugly", "fellowship of the ring", "fight club", "forrest gump", "inception", "two towers", "empire strikes back", "matrix", "goodfellas", "one flew over the cuckoos nest", "seven samurai", "seven", "life is beautiful", "city of god", "silence of the lambs", "its a wonderful life", "a new hope", "saving private ryan", "green mile", "spirited away", "interstellar", "parasite", "leon the professional", "hara kiri", "usual suspects", "lion king", "pianist", "back to the future", "judgment day", "american history x", "modern times", "gladiator", "psycho", "departed", "city lights", "intouchables", "whiplash", "grave of the fireflies", "prestige", "once upon a time in the west", "casablanca", "cinemna paradiso", "rear window", "alien", "apocalypse now", "memento", "great dictator", "indiana jones and the raiders of the lost ark", "django unchained", "lives of others", "hamilton", "paths of glory", "joker", "wall e", "shining", "infinity war", "sunset blvd", "witness for the prosecution", "oldboy", "into the spider verse", "princess mononoke", "dr strangelove or how i learned to stop worrying and love the bomb", "dark knight rises", "once upon a time in america", "your name", "aliens", "coco", "endgame", "capernaum", "american beauty", "braveheart", "das boot", "high and low", "toy story", "three idiots", "amadeus", "inglourious basterds", "good will hunting", "return of the jedi", "like stars on earth", "reservoir dogs", "a space odyssey", "requiem for a dream", "hunt", "vertigo", "m", "eternal sunshine of the spotless mind", "citizen kane", "dangal", "singin in the rain", "bicycle theives", "full metal jacket", "kid", "come and see", "snatch", "north by northwest", "ikiru", "a clockwork orange", "scarface", "nineteen seventeen", "taxi driver", "incendies", "a separation", "toy story three", "lawrence of arabia", "sting", "amelie", "metropolis", "apartment", "for a few dollars more", "double indemnity", "to kill a mockingbird", "up", "indiana jones and the last crusade", "heat", "la confidential", "green book", "die hard", "monty python and the holy grail", "batman begins", "yojimnbo", "rashomon", "downfall", "children of heaven", "unforgiven", "ran", "some like it hot", "howls moving castle", "all about eve", "casino", "a beautiful mind", "wolf of wall street", "great escape", "pans labyrinth", "raging bull", "treasure of the sierra madre", "dial m for murder", "three billboards outside ebbing missouri", "shutter island", "gold rush", "chinatown", "my father and my son", "no country for old men", "v for vendetta", "inside out", "elephant man", "thing", "seventh seal", "warrior", "sixth sense", "jurassic park", "klaus", "trainspotting", "truman show", "gone with the wind", "finding", "stalker", "wild strawberries", "kill bill volume one", "blade runner", "memories of murder", "bridge on the river kwai", "fargo", "room", "wild tales", "gran torino", "tokyo story", "third man", "on the waterfront", "deer hunter", "in the name of the father", "mary and max", "grand budapest hotel", "before sunrise", "gone girl", "catch me if you can", "hacksaw ridge", "prisonsers", "persona", "andhadun", "sherlock junior", "anand", "ford v ferrari", "twelve years a slave", "bandit", "mr smith goes to washington", "fury road", "dead poets society", "million dollar baby", "stand by me", "network", "harry potter and the deathly hallows part two", "ben hur", "hachi a dogs tale", "cool hand luke", "handmaiden", "logan", "platoon", "into the wild", "rush", "soul", "wages of fear", "monty pythons life of brian", "la haine", "the four hundred blows", "passion of joan of arc", "spotlight", "hotel rwanda", "amores perros", "gangs of wasseypur", "rocky", "monsters inc", "andrei rublev", "nausicaa of the valley of the wind", "rebecca", "time of the gypsies", "before sunset", "rififi", "in the mood for love", "rang de basanti", "drishyam", "paris texas", "portrait of a lady on fire", "it happened one night", "invisible guest", "drishyam", "a silent voice the movie", "battle of algiers", "tangerines", "help"];

//randomly select movies, assign to variable for user to guess
var movie = movies[Math.floor(Math.random() * movies.length)];
console.log(movie);

//variables to html
var wordDisplayP = document.getElementById("wordDisplay");
var winsP = document.getElementById("wins");
var lossesP = document.getElementById("losses");
var gallowsDiv = document.getElementById("gallows");
var guessedP = document.getElementById("guessed");

//display blanks equal to number of characters in title, include spaces
for (var i = 0; i < movie.length; i++) {
    if (movie[i] === " ") {
        wordDisplay.push(" ");
    }
    else {
        wordDisplay.push("_");
    }
}

wordDisplayP.textContent = wordDisplay.join("\xa0");

//display hangman image
if (wrongGuessesLeft === 6) {
    gallowsDiv.appendChild(hangman0Image);
}


//respond to user letter guess
document.onkeyup = function (event) {
    var userGuess = event.key;
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    console.log(userGuess);
    if (alphabet.includes(userGuess)) {


        //check if letter guess is in movie title; update display if it is
        if (movie.includes(userGuess)) {

            for (var i = 0; i < movie.length; i++) {
                if (movie[i] === userGuess) {
                    wordDisplay[i] = userGuess;
                    wordDisplayP.textContent = wordDisplay.join("\xa0");

                    //if there are no letters left to be guessed, the user wins
                    if (!wordDisplay.includes("_")) {
                        wins++;
                        winsP.textContent = "Wins: " + wins;
                        newWord();
                    }
                }
            }

        }


        //decrement wrong guesses left, add wrong guess to array of guessed letter if letter guess is not in movie title
        else if ((!movie.includes(userGuess)) && (!guessed.includes(userGuess))) {
            wrongGuessesLeft--;
            console.log(wrongGuessesLeft);

            if (!guessed.includes(userGuess)) {
                guessed.push(userGuess);
                console.log(guessed);
                guessedP.textContent = guessed.join("\xa0");
            }

            if (wrongGuessesLeft === 5) {
                gallowsDiv.removeChild(hangman0Image)
                gallowsDiv.appendChild(hangman1Image);
            }

            if (wrongGuessesLeft === 4) {
                gallowsDiv.removeChild(hangman1Image);
                gallowsDiv.appendChild(hangman2Image);
            }

            if (wrongGuessesLeft === 3) {
                gallowsDiv.removeChild(hangman2Image);
                gallowsDiv.appendChild(hangman3Image);
            }

            if (wrongGuessesLeft === 2) {
                gallowsDiv.removeChild(hangman3Image);
                gallowsDiv.appendChild(hangman4Image);
            }

            if (wrongGuessesLeft === 1) {
                gallowsDiv.removeChild(hangman4Image);
                gallowsDiv.appendChild(hangman5Image);
            }

            if (wrongGuessesLeft === 0) {
                losses++;
                lossesP.textContent = "Losses: " + losses;
                newWord();

            }
        }


    }
}

//new word when user wins or loses a game
function newWord() {

    //reset wrong guesses remaining,
    wrongGuessesLeft = 6;

    //reset movie user is guessing
    movie = movies[Math.floor(Math.random() * movies.length)];
    console.log(movie);

    //reset word display and letters guessed
    wordDisplay = [];
    guessed = [];

    for (var i = 0; i < movie.length; i++) {

        if (movie[i] === " ") {
            wordDisplay.push(" ");
        }
        else {
            wordDisplay.push("_");
        }
    }
    wordDisplayP.textContent = wordDisplay.join("\xa0");
    guessedP.textContent = guessed.join("\xa0");

    //reset hangman image
    gallowsDiv.removeChild(gallowsDiv.firstChild);
    gallowsDiv.appendChild(hangman0Image);

} //end newWord()
