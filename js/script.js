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
let word = "magnolia";

// Stores all letters player guesses
const guessedLetters = [];

// Counts players remaining guesses
let remainingGuessesCount = 8;

// Fetches words from API
const getWord = async function () {
  const showWord = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await showWord.text();
  // console.log(words);
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  wordPlaceholder(word);
};

// Starts Game with word ready
getWord();

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
    displayLetters();
    updateGuessedWord(guessedLetters);
    countRemainingGuesses(guess);
  }
};

const displayLetters = function () {
  guessedLettersEl.innerHTML = "";

  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersEl.append(li);
  }
};

const updateGuessedWord = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  // console.log(wordArray);
  const showWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      showWord.push(letter.toUpperCase());
    } else {
      showWord.push("●");
    }
  }
  wordInProgress.innerText = showWord.join("");
  console.log(showWord);
  checkPlayerWon();
};

const countRemainingGuesses = function (guess) {
  const wordToUpper = word.toUpperCase();
  if (!wordToUpper.includes(guess)) {
    message.innerText = `Sorry the word does not contain ${guess}`;
    remainingGuessesCount -= 1;
  } else {
    message.innerText = `Nice! The word has the letter ${guess}`;
  }

  if (remainingGuessesCount === 0) {
    message.innerHTML = `Game Over :( The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuessesCount === 1) {
    remainingGuessNum.innerText = `${remainingGuessesCount} guess`;
  } else {
    remainingGuessNum.innerText = `${remainingGuessesCount} guesses`;
  }
};

const checkPlayerWon = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
