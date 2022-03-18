// Variables Declared

// Shows message about guesses
const message = document.querySelector(".message");
// Shows word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// Shows remaining Guesses
const remainingGuesses = document.querySelector(".remaining");
// Displays span with number of guesses left
const remainingGuessNum = document.querySelector(".remaining span");
// Players guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
// Players input letter to guess
const letterInput = document.querySelector(".letter");
// Player Button to guess letters
const guessBtn = document.querySelector(".guess");
// Play again Button
const playAgainBtn = document.querySelector(".play-again");

// Word to be guessed by player
const word = "magnolia";

// Display placeholder
const wordPlaceholder = function (word) {
  const letterPlaceholder = [];
  for (const letter of word) {
    // console.log(letter);
    letterPlaceholder.push("●");
  }
  wordInProgress.innerText = letterPlaceholder.join("");
};
wordPlaceholder(word);

// Guess Button
guessBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let letterGuessed = letterInput.value;
  console.log(letterGuessed);
  letterInput.value = "";
});
