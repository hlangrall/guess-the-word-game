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

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const wordRequest = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await wordRequest.text();
  const wordArray = words.split("\n");
  randomWord = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomWord].trim();
  placeholder(word);
};

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";

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
    message.innerText = "One letter at a time, please.";
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
    showGuessedLetters();
    remainingGuessCount(letter);
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerHTML = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkWon();
};

const remainingGuessCount = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = "Nope, try again";
    remainingGuesses -= 1;
  } else {
    message.innerText = "Good guess!";
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over, the word was <span class="highlight">${word}</span>`;
    span.innerText = `${remainingGuesses} guesses`;
  } else if (remainingGuesses === 1) {
    span.innerText = `${remainingGuesses} guess`;
  } else {
    span.innerText = `${remainingGuesses} guesses`;
  }
};

const checkWon = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word!</p>`;
  }
};
