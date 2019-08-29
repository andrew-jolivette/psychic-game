// global variables
var wins = 0;
var losses = 0;
var guesses = 10;
var alphaRand = 0;

// alphabet is entered as a string and converts it to an array
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var guessMade = [];

// initial output values to screen
function scoreBoard() {
  document.querySelector("#wins").innerHTML = `Wins: ${wins}`;
  document.querySelector("#losses").innerHTML = `Losses: ${losses}`;
  document.querySelector("#guess-remaining").innerHTML = `Guesses Remaining: ${guesses}`;
  document.querySelector('#guess-made').innerHTML = `Your guesses: ${guessMade.toString()}`;
}

scoreBoard();

// chooses a random letter from the alphabet array
function pick() {
  alphaRand = alphabet[
    Math.floor(Math.random() * alphabet.length)
  ];
  console.log('picked letter: ' + alphaRand);
}

pick();

document.onkeyup = function(event) {

  var playerInput = event.key.toLowerCase();
  console.log(playerInput);

  // checks to make sure playerInput is a-z
  var validKey = alphabet.includes(playerInput);
  console.log(validKey);

  if (validKey && playerInput === alphaRand) {
    alert("Drats you guessed it!");
    wins++;
    document.querySelector("#wins").innerHTML = `Wins: ${wins}`;
    pick();
  } else if (!validKey) {
    alert('Invalid Key Input');
  } else {
    guesses--;
    //push guess to guessMade array
    document.querySelector("#guess-remaining").innerHTML = `Guesses Remaining: ${guesses}`;
    document.querySelector('#guess-made').innerHTML = `Your guesses: ${guessMade.toString()}`;
  }
  if (guesses === 0) {
    alert(`Fooled you! I picked "${alphaRand}". Refocus your mind and try again!`)
    losses++;
    document.querySelector("#losses").innerHTML = `Losses: ${losses}`;
    guesses = 10;
    document.querySelector("#guess-remaining").innerHTML = `Guesses Remaining: ${guesses}`;
    pick();
  }
  if (wins === 3) {
    if (confirm('You ARE psychic, wow! Would you like to play again?')) {
      wins = 0;
      losses = 0;
      guesses = 10;
      guessMade = [];
      scoreBoard();
    } else {
      alert("I knew psychics were fake...");
      return;
    }
  }
  if (losses === 3) {
    if (confirm('Nice try, friend. Would you like a rematch?')) {
      wins = 0;
      losses = 0;
      guesses = 10;
      guessMade = [];
      scoreBoard();
    } else {
      alert("I'll get you next time...");
      return;
    }
  }
}