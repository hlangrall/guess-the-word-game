// unordered list where player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
// button with text "Guess!"
const guessButton = document.querySelector(".guess");
// text input where player will guess a letter
const letterInput = document.querySelector("#letter");
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

const wordSymbol = function (word) {
    const wordSymbolLetters = [];
    for (const letter of word) {
        console.log(letter);
        wordSymbolLetters.push("●")
    }
    wordInProgress.innerText = wordSymbolLetters.join("");
};

wordSymbol(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});