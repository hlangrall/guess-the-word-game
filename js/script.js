// unordered list where player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// button with text "Guess!"
const guessButton = document.querySelector(".guess");
// text input where player will guess a letter
const letterInput = document.querySelector(".letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where the remaining guesses will display
const remaining = document.querySelector(".remaining");
// span inside the paragraph where the remaining guess will display
const span = document.querySelector(".remaining span");
// empty paragraph where messages appear when the player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
// starting word to test out the game until fetch from hosted file
const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  //empty message paragraph
  message.innerText = "";
  // let's grab what was entered in the input
  const guess = letterInput.value;

  const goodGuess = inputCheck(guess);
  //console.log(goodGuess);
  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

const inputCheck = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter!";
  } else if (input.length > 1) {
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that one, try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
