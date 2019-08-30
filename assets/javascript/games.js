// global variables
var wins = 0;
var losses = 0;
var guesses = 10;
var alphaRand = 0;
var hintsGiven = 0;

// alphabet is entered as a string and converts it to an array
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var guessMade = [];

// initial output values to screen
function scoreBoard() {
  var guessMadeString = guessMade.join(', '); //adding commas

  document.querySelector("#wins").innerHTML = `Wins: ${wins}`;
  document.querySelector("#losses").innerHTML = `Losses: ${losses}`;
  document.querySelector("#guess-remaining").innerHTML = `Guesses Remaining: ${guesses}`;
  document.querySelector('#guess-made').innerHTML = `Your guesses: ${guessMadeString.toString()}`;
}

scoreBoard();

// chooses a random letter from the alphabet array
function pick() {
  alphaRand = alphabet[
    Math.floor(Math.random() * alphabet.length)
  ];
  console.log('picked letter: ' + alphaRand);
}

function resetGame() {
  wins = 0;
  losses = 0;
  guesses = 10;
  guessMade = [];
  hintsGiven = 0;
  document.querySelector('#hint1').innerHTML = '';
  document.querySelector('#hint2').innerHTML = '';
}

function hint1() {
  if (alphabet.indexOf(alphaRand) < 13) {
    document.querySelector('#hint1').innerHTML = 
      'Hint 1: The letter I picked is in the first half of the alphabet!';
  } else if (alphabet.indexOf(alphaRand) >= 13) {
    document.querySelector('#hint1').innerHTML = 
    'Hint 1: The letter I picked is in the second half of the alphabet!';
  }
  
}

function hint2() {
  var vowls = ['a', 'e', 'i', 'o', 'u']
  if (vowls.includes(alphaRand)) {
    document.querySelector('#hint2').innerHTML = 
      'Hint 2: The letter I picked is a vowl.';
      console.log('vowl')
  } else {
    document.querySelector('#hint2').innerHTML = 
      'Hint 2: The letter I picked is a consonant.';
      console.log('consonant')
  }
}
function hints() {
  if (hintsGiven === 0) {
    hint1();
    hintsGiven++;
  } else if (hintsGiven === 1) {
    hint2();
    hintsGiven++;
  } else {
    alert("Hey buddy, I think I've given you enough hints!")
  }
}

pick();

document.onkeyup = function(event) {

  var playerInput = event.key.toLowerCase();
  console.log(playerInput);

  // checks to make sure playerInput is a-z
  var validKey = alphabet.includes(playerInput);
  console.log(validKey);
  var guessedBefore = guessMade.includes(playerInput);

  if (validKey && playerInput === alphaRand & !guessedBefore) {
    alert("Drats you guessed it! I'm going to pick another letter...");
    wins++;
    guessMade = [];
    scoreBoard();
    pick();
  } else if (!validKey) {
    alert('Invalid Key Input');
  } else if(guessedBefore) {
    alert(`You already guessed ${playerInput}. Try another letter.`)
  } else {
    guesses--;
    guessMade.push(playerInput);
    scoreBoard();
  }
  if (guesses === 0) {
    scoreBoard();
    alert(`Fooled you! I picked "${alphaRand}". Refocus your mind and try again!`)
    losses++;
    guesses = 10;
    guessMade = [];
    scoreBoard();
    pick();
  }
  if (wins === 10) {
    scoreBoard();
    if (confirm('You ARE psychic, wow! Would you like to play again?')) {
      resetGame();
      scoreBoard();
    } else {
      alert("I knew psychics were fake...");
      return;
    }
  }
  if (losses === 10) {
    if (confirm('Nice try, friend. Would you like a rematch?')) {
      resetGame();
      scoreBoard();
    } else {
      alert("I'll get you next time...");
      return;
    }
  }
}