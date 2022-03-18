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
const guessedLettersEl = document.querySelector(".guessed-letters");
// Players input letter to guess
const letterInput = document.querySelector(".letter");
// Player Button to guess letters
const guessBtn = document.querySelector(".guess");
// Play again Button
const playAgainBtn = document.querySelector(".play-again");

// Word to be guessed by player
const word = "magnolia";

// Stores all letters player guesses
const guessedLetters = [];

// Display placeholder
const wordPlaceholder = function (word) {
  const letterPlaceholder = [];
  for (const letter of word) {
    console.log(letter);
    letterPlaceholder.push("●");
  }
  wordInProgress.innerText = letterPlaceholder.join("");
};
wordPlaceholder(word);

// Guess Button
guessBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Clear message of all text
  message.innerText = "";

  // stores what was entered in the input
  let guess = letterInput.value;
  // console.log(guess);

  // Validates player Input
  const guessValue = playerInput(guess);
  if (guessValue) {
    makeGuess(guess);
  }

  // Clears the input box
  letterInput.value = "";
  console.log(guessValue);
});

// Validate Players input
const playerInput = function (input) {
  const acceptedLetters = /[a-zA-Z]/;
  if (input.length === 0) {
    // Checks if input is empty
    message.innerText = "Please enter a letter to guess";
  } else if (input.length > 1) {
    // checks if more than one letter in input
    message.innerText = "Please guess one letter at a time";
  } else if (!input.match(acceptedLetters)) {
    // Checks if is only a letter
    message.innerText = "Please only guess letters from A to Z";
  } else {
    // if is only one letter it passes
    return input;
  }
};

const makeGuess = function (guess) {
  // changes guess to uppercase
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    // Checks for repeated guesses
    message.innerText = "You already guessed that letter. Please try again :)";
  } else {
    // If not a repeat it passes
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
