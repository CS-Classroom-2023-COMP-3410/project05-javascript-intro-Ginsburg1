const textDisplay = document.getElementById('text-display');
const inputArea = document.getElementById('input-area');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const difficultySelect = document.getElementById('difficulty');
const results = document.getElementById('results');

let targetText = '';
let startTime;
let timer;

const easyTexts = [
    "Hello world. This is a simple typing test. Have fun typing!",
    "JavaScript is fun. It is a versatile language. Keep practicing!",
    "Coding is great. It allows you to create amazing things. Enjoy coding!"
];

const mediumTexts = [
    "Practice makes perfect. Keep calm and code on. You will improve over time.",
    "Debugging is fun. It helps you understand your code better. Keep debugging!",
    "Consistency is key. Practice regularly. You will see progress."
];

const hardTexts = [
    "Synchronize your watches. Asynchronous programming can be tricky. Stay focused and practice.",
    "Event-driven architecture is powerful. It allows for responsive applications. Keep learning and experimenting.",
    "Concurrency is challenging. It requires careful planning. Keep working on it and you will master it."
];

function getRandomText(difficulty) {
    if (difficulty === 'easy') {
        return easyTexts[Math.floor(Math.random() * easyTexts.length)];
    } else if (difficulty === 'medium') {
        return mediumTexts[Math.floor(Math.random() * mediumTexts.length)];
    } else {
        return hardTexts[Math.floor(Math.random() * hardTexts.length)];
    }
}

function highlightText() {
    const typedText = inputArea.value;
    let highlightedText = '';
    for (let i = 0; i < targetText.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === targetText[i]) {
                highlightedText += `<span>${targetText[i]}</span>`;
            } else {
                highlightedText += `<span style="color: red;">${targetText[i]}</span>`;
            }
        } else {
            highlightedText += `<span>${targetText[i]}</span>`;
        }
    }
    textDisplay.innerHTML = highlightedText;
}

function startTypingTest() {
    const difficulty = difficultySelect.value;
    targetText = getRandomText(difficulty);
    textDisplay.innerText = targetText;
    inputArea.value = '';
    inputArea.disabled = false;
    inputArea.focus();
    startTime = new Date();
    timer = setInterval(updateResults, 100);
    inputArea.addEventListener('input', highlightText);
}

function updateResults() {
    const currentTime = new Date();
    const timeElapsed = (currentTime - startTime) / 1000; // in seconds
    const typedText = inputArea.value;
    const correctChars = typedText.split('').filter((char, index) => char === targetText[index]).length;
    const accuracy = (correctChars / targetText.length) * 100;
    const wordsPerMinute = (typedText.split(' ').length / timeElapsed) * 60;

    results.innerHTML = `
        <p>Time: ${timeElapsed.toFixed(2)} seconds</p>
        <p>Accuracy: ${accuracy.toFixed(2)}%</p>
        <p>Words per minute: ${wordsPerMinute.toFixed(2)}</p>
    `;

    if (typedText === targetText) {
        clearInterval(timer);
        inputArea.disabled = true;
        results.innerHTML += '<p>Test Completed!</p>';
    }
}

startButton.addEventListener('click', startTypingTest);

restartButton.addEventListener('click', () => {
    clearInterval(timer);
    textDisplay.innerText = '';
    inputArea.value = '';
    inputArea.disabled = true;
    results.innerHTML = '';
    inputArea.removeEventListener('input', highlightText);
});
