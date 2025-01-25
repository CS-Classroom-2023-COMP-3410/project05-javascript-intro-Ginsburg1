const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const resetButton = document.getElementById('reset-button');
const saveButton = document.getElementById('save-button');
const actionsList = document.getElementById('actions');

let state = {};

function startGame() {
    state = loadState() || {};
    showTextNode(1);
    updateProgressBar(0); // Reset progress bar at the start of the game
    actionsList.innerHTML = ''; // Clear actions list
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    storyElement.innerText = textNode.text;

    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.addEventListener('click', () => {
                selectOption(option);
                addActionToList(option.text); // Add action to list
                updateProgressBar(calculateProgress(textNodeIndex)); // Update progress bar
            });
            choicesElement.appendChild(button);
        }
    });

    saveState();
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

function saveState() {
    localStorage.setItem('gameState', JSON.stringify(state));
}

function loadState() {
    return JSON.parse(localStorage.getItem('gameState'));
}

resetButton.addEventListener('click', () => {
    localStorage.removeItem('gameState');
    startGame();
});

saveButton.addEventListener('click', () => {
    saveState();
    alert('Game progress saved!');
});

// Function to update the progress bar
function updateProgressBar(progress) {
    const progressBar = document.getElementById('progress');
    progressBar.style.width = progress + '%';
}

// Function to calculate progress based on the current text node index
function calculateProgress(textNodeIndex) {
    const totalNodes = textNodes.length;
    return (textNodeIndex / totalNodes) * 100;
}

// Function to save progress to localStorage
function saveProgress(progress) {
    localStorage.setItem('userProgress', progress);
}

// Function to load progress from localStorage
function loadProgress() {
    return localStorage.getItem('userProgress') || 0;
}

// Example function to track user progress
function trackProgress() {
    let progress = loadProgress();
    updateProgressBar(progress);

    // Simulate progress update
    document.addEventListener('click', () => {
        progress = Math.min(100, parseInt(progress) + 10);
        updateProgressBar(progress);
        saveProgress(progress);
    });
}

// Function to add action to the list
function addActionToList(action) {
    const li = document.createElement('li');
    li.innerText = action;
    actionsList.appendChild(li);
}

// Initialize progress tracking
document.addEventListener('DOMContentLoaded', () => {
    trackProgress();
    startGame();
});

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place. What do you do?',
        options: [
            {
                text: 'Look around',
                setState: { lookedAround: true },
                nextText: 2
            },
            {
                text: 'Go back to sleep',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'You see a door and a window. What do you do?',
        options: [
            {
                text: 'Open the door',
                nextText: 4
            },
            {
                text: 'Open the window',
                nextText: 5
            }
        ]
    },
    {
        id: 3,
        text: 'You fall back asleep and wake up again. What do you do?',
        options: [
            {
                text: 'Look around',
                setState: { lookedAround: true },
                nextText: 2
            }
        ]
    },
    {
        id: 4,
        text: 'You open the door and find a hallway. What do you do?',
        options: [
            {
                text: 'Walk down the hallway',
                nextText: 6
            },
            {
                text: 'Close the door',
                nextText: 2
            }
        ]
    },
    {
        id: 5,
        text: 'You open the window and see a garden. What do you do?',
        options: [
            {
                text: 'Climb out the window',
                nextText: 7
            },
            {
                text: 'Close the window',
                nextText: 2
            }
        ]
    },
    {
        id: 6,
        text: 'You walk down the hallway and find a staircase. What do you do?',
        options: [
            {
                text: 'Go up the stairs',
                nextText: 8
            },
            {
                text: 'Go down the stairs',
                nextText: 9
            }
        ]
    },
    {
        id: 7,
        text: 'You climb out the window and find yourself in a garden. What do you do?',
        options: [
            {
                text: 'Explore the garden',
                nextText: 10
            },
            {
                text: 'Go back inside',
                nextText: 2
            }
        ]
    },
    {
        id: 8,
        text: 'You go up the stairs and find a locked door. What do you do?',
        options: [
            {
                text: 'Try to open the door',
                nextText: 11
            },
            {
                text: 'Go back down the stairs',
                nextText: 6
            }
        ]
    },
    {
        id: 9,
        text: 'You go down the stairs and find a basement. What do you do?',
        options: [
            {
                text: 'Explore the basement',
                nextText: 12
            },
            {
                text: 'Go back up the stairs',
                nextText: 6
            }
        ]
    },
    {
        id: 10,
        text: 'You explore the garden and find a hidden path. What do you do?',
        options: [
            {
                text: 'Follow the path',
                nextText: 13
            },
            {
                text: 'Go back to the garden',
                nextText: 7
            }
        ]
    },
    {
        id: 11,
        text: 'The door is locked. You need a key. What do you do?',
        options: [
            {
                text: 'Go back down the stairs',
                nextText: 6
            }
        ]
    },
    {
        id: 12,
        text: 'You explore the basement and find a key. What do you do?',
        options: [
            {
                text: 'Take the key and go upstairs',
                setState: { hasKey: true },
                nextText: 6
            }
        ]
    },
    {
        id: 13,
        text: 'You follow the path and find a treasure chest. Congratulations, you have completed the game!',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
];
