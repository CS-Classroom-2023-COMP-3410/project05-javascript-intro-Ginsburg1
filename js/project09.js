const arrayContainer = document.getElementById('array-container');
const commentary = document.getElementById('commentary');
const algorithmSelect = document.getElementById('algorithm');
const speedInput = document.getElementById('speed');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

let array = [];
let animationSpeed = 50;
let sorting = false;

function generateArray(size = 20) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    });
}

function updateCommentary(text) {
    commentary.innerText = text;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    updateCommentary('Step 1: Starting Bubble Sort...');
    sorting = true;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < array.length - 1; i++) {
            if (!sorting) return;
            updateCommentary(`Step 2: Comparing ${array[i]} and ${array[i + 1]}`);
            if (array[i] > array[i + 1]) {
                updateCommentary(`Step 3: Swapping ${array[i]} and ${array[i + 1]}`);
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                renderArray();
                await sleep(animationSpeed);
            }
        }
    } while (swapped);
    updateCommentary('Step 4: Bubble Sort Completed!');
    sorting = false;
}

async function insertionSort() {
    updateCommentary('Step 1: Starting Insertion Sort...');
    sorting = true;
    for (let i = 1; i < array.length; i++) {
        if (!sorting) return;
        let key = array[i];
        let j = i - 1;
        updateCommentary(`Step 2: Inserting ${key} into sorted portion`);
        while (j >= 0 && array[j] > key) {
            if (!sorting) return;
            updateCommentary(`Step 3: Moving ${array[j]} to position ${j + 1}`);
            array[j + 1] = array[j];
            j = j - 1;
            renderArray();
            await sleep(animationSpeed);
        }
        array[j + 1] = key;
        renderArray();
        await sleep(animationSpeed);
    }
    updateCommentary('Step 4: Insertion Sort Completed!');
    sorting = false;
}

startButton.addEventListener('click', () => {
    if (sorting) return;
    const algorithm = algorithmSelect.value;
    animationSpeed = 100 - speedInput.value;
    if (algorithm === 'bubbleSort') {
        bubbleSort();
    } else if (algorithm === 'insertionSort') {
        insertionSort();
    }
});

resetButton.addEventListener('click', () => {
    sorting = false;
    generateArray();
    updateCommentary('Array Reset. Select an algorithm and start sorting.');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateArray();
    updateCommentary('Array Generated. Select an algorithm and start sorting.');
});
