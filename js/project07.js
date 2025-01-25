let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = null;
let memory = 0;

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function computeSquareRoot() {
    if (currentOperand === '') return;
    currentOperand = Math.sqrt(parseFloat(currentOperand));
    updateDisplay();
}

function computePercentage() {
    if (currentOperand === '') return;
    currentOperand = parseFloat(currentOperand) / 100;
    updateDisplay();
}

function memoryRecall() {
    currentOperand = memory;
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentOperand;
}
