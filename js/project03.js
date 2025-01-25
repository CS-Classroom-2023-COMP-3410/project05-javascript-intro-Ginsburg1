/******************************************
 * MEMORY MATCHING GAME
 * Author: Your Name
 * File: project03.js
 ******************************************/

// 1. Create an array of symbols or images for our cards.
//    Each symbol must appear exactly twice.
const cardSymbols = ["🐶", "🐶", "🐱", "🐱", "🐰", "🐰", "🐸", "🐸",
    "🐵", "🐵", "🐷", "🐷", "🐭", "🐭", "🐨", "🐨"];

// DOM elements for easy reference
let deck = document.getElementById("card-deck");
let movesDisplay = document.querySelector(".moves");
let timerDisplay = document.querySelector(".timer");
let restartButton = document.getElementById("restart");

// Variables to track game state
let moves = 0;
let matchedPairs = 0;
let firstCard, secondCard;
let lockBoard = false; // prevents flipping more than two cards
let timer;            // interval for the game timer
let totalSeconds = 0; // track total elapsed time

/******************************************
* 2. Shuffle function: Fisher-Yates (Durstenfeld) Shuffle
******************************************/
function shuffle(array) {
let currentIndex = array.length, temporaryValue, randomIndex;

// While there remain elements to shuffle...
while (currentIndex !== 0) {
// Pick a remaining element...
randomIndex = Math.floor(Math.random() * currentIndex);
currentIndex -= 1;
// And swap it with the current element.
temporaryValue = array[currentIndex];
array[currentIndex] = array[randomIndex];
array[randomIndex] = temporaryValue;
}

return array;
}

/******************************************
* 3. Initialize / Start a New Game
******************************************/
function initGame() {
// 1. Reset game-specific variables
moves = 0;
matchedPairs = 0;
totalSeconds = 0;
movesDisplay.textContent = moves;
timerDisplay.textContent = "0:00";

// 2. Clear any existing timer
clearInterval(timer);

// 3. Shuffle the card symbols array
let shuffledSymbols = shuffle([...cardSymbols]); // Use a copy of cardSymbols

// 4. Generate the cards in the DOM
deck.innerHTML = ""; // Clear old cards
shuffledSymbols.forEach(symbol => {
// Create the card element
const card = document.createElement("div");
card.classList.add("card");
card.innerHTML = `
<div class="front-face">${symbol}</div>
<div class="back-face"></div>
`;

// Add click event to flip cards
card.addEventListener("click", flipCard);

// Append card to the deck
deck.appendChild(card);
});

// 5. Start the timer (only when the first card is flipped)
startTimerOnFirstClick();
}

/******************************************
* 4. Start Timer on First Click
******************************************/
function startTimerOnFirstClick() {
// We add a listener for the first flip to start the timer once
let firstClick = true;

deck.addEventListener("click", function startTimerHandler(event) {
const target = event.target;
if (
target.classList.contains("card") &&
!target.classList.contains("flip") &&
!target.classList.contains("matched") &&
firstClick
) {
firstClick = false;
// Start the timer
timer = setInterval(() => {
totalSeconds++;
updateTimerDisplay();
}, 1000);

// Remove this event listener after the first flip
deck.removeEventListener("click", startTimerHandler);
}
});
}

/******************************************
* 5. Update Timer Display
******************************************/
function updateTimerDisplay() {
// Convert totalSeconds into MM:SS
let minutes = Math.floor(totalSeconds / 60);
let seconds = totalSeconds % 60;
// Format seconds to always have at least 2 digits
let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
timerDisplay.textContent = `${minutes}:${formattedSeconds}`;
}

/******************************************
* 6. Flip Card
******************************************/
function flipCard() {
// If the board is locked, ignore clicks
if (lockBoard) return;
// If this card is already flipped or matched, ignore
if (this.classList.contains("flip") || this.classList.contains("matched")) return;

// Flip the card
this.classList.add("flip");

// Check if it's the first or second card
if (!firstCard) {
firstCard = this;
return;
}

secondCard = this;
// Increase move count every time two cards are flipped
moves++;
movesDisplay.textContent = moves;

// Check for a match
checkForMatch();
}

/******************************************
* 7. Check for Match
******************************************/
function checkForMatch() {
// Compare the innerHTML (front face) of both flipped cards
let firstSymbol = firstCard.querySelector(".front-face").textContent;
let secondSymbol = secondCard.querySelector(".front-face").textContent;

if (firstSymbol === secondSymbol) {
// It's a match
firstCard.classList.add("matched");
secondCard.classList.add("matched");

matchedPairs += 1;
resetFlippedCards();

// Check if the game is won
if (matchedPairs === cardSymbols.length / 2) {
gameWon();
}
} else {
// Not a match, lock the board temporarily
lockBoard = true;
setTimeout(() => {
firstCard.classList.remove("flip");
secondCard.classList.remove("flip");
resetFlippedCards();
}, 1000);
}
}

/******************************************
* 8. Reset Flipped Cards
******************************************/
function resetFlippedCards() {
[firstCard, secondCard] = [null, null];
lockBoard = false;
}

/******************************************
* 9. When Game is Won
******************************************/
function gameWon() {
// Stop the timer
clearInterval(timer);
// Simple alert to show results
setTimeout(() => {
alert(`Congratulations! You won!\nMoves: ${moves}\nTime: ${timerDisplay.textContent}`);
}, 500);
}

/******************************************
* 10. Restart Button
******************************************/
restartButton.addEventListener("click", function() {
initGame();
});

// Initialize the game when the page loads
initGame();
