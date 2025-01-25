document.addEventListener('DOMContentLoaded', () => {
  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correct: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
      correct: 0
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correct: 2
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const quizContainer = document.getElementById('quiz');
  const feedbackContainer = document.getElementById('feedback');
  const nextButton = document.getElementById('nextButton');
  const summaryContainer = document.getElementById('summary');

  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
      <div class="question">${currentQuestion.question}</div>
      <ul class="options">
        ${currentQuestion.options.map((option, index) => `
          <li>
            <label>
              <input type="radio" name="option" value="${index}">
              ${option}
            </label>
          </li>
        `).join('')}
      </ul>
    `;
    feedbackContainer.textContent = '';
    nextButton.classList.add('hidden');
  }

  function showFeedback(isCorrect) {
    feedbackContainer.textContent = isCorrect ? 'Correct!' : 'Wrong!';
    nextButton.classList.remove('hidden');
  }

  function showSummary() {
    quizContainer.classList.add('hidden');
    feedbackContainer.classList.add('hidden');
    nextButton.classList.add('hidden');
    summaryContainer.classList.remove('hidden');
    summaryContainer.innerHTML = `
      <h2>Quiz Summary</h2>
      <p>Your score: ${score} out of ${quizData.length}</p>
      <ul>
        ${quizData.map((question, index) => `
          <li>
            ${question.question}
            <br>
            Correct answer: ${question.options[question.correct]}
            <br>
            Your answer: ${question.options[question.userAnswer]}
          </li>
        `).join('')}
      </ul>
    `;
  }

  quizContainer.addEventListener('change', (event) => {
    if (event.target.name === 'option') {
      const selectedOption = parseInt(event.target.value);
      const isCorrect = selectedOption === quizData[currentQuestionIndex].correct;
      quizData[currentQuestionIndex].userAnswer = selectedOption;
      if (isCorrect) score++;
      showFeedback(isCorrect);
      // Disable all options after selection
      const options = quizContainer.querySelectorAll('input[name="option"]');
      options.forEach(option => option.disabled = true);
    }
  });

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showSummary();
    }
  });

  loadQuestion();
});
