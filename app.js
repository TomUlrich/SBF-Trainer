'use strict';

let questionIndex = 0;
let score = 0;
let correctAnswer;
let url;

const startContainer = $('#start-container');
const questionType = $$('.question-type');
const testBtn = $('#test-btn');
const basisBtn = $('#basis-btn');
const binnenBtn = $('#binnen-btn');
const segelnBtn = $('#segeln-btn');
const quizContainer = $('#quiz-container');
const question_div = $('#question');
const answerButtons = $$('.answer-btn');
const nextBtn = $('#next');
const summaryContainer = $('#summary-container');
const score_span = $('#score-span');
const total_span = $('#total-span');
const retryBtn = $('#retry-btn');

questionType.forEach((button) => button.addEventListener('click', initializeQuiz));
answerButtons.forEach((button) => button.addEventListener('click', checkAnswer));
nextBtn.addEventListener('click', fetchData);
retryBtn.addEventListener('click', retry);

function initializeQuiz(e) {
  quizContainer.classList.remove('hidden');
  startContainer.classList.add('hidden');
  nextBtn.disabled = true;

  if (e.target === testBtn) {
    url = 'questions/test.json';
  }
  if (e.target === basisBtn) {
    url = 'questions/basis.json';
  }
  if (e.target === binnenBtn) {
    url = 'questions/binnen.json';
  }
  if (e.target === segelnBtn) {
    url = 'questions/segeln.json';
  }

  fetchData();
}

function fetchData() {
  answerButtons.forEach((button) => (button.disabled = false));
  answerButtons.forEach((button) => (button.style.backgroundColor = 'yellow'));
  nextBtn.disabled = true;

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      loadQuizData(json);
    });
}

function loadQuizData(quizArray) {
  score_span.innerText = score;
  total_span.innerText = quizArray.length;

  // end of game: summaryContainer
  if (questionIndex === quizArray.length) {
    quizContainer.classList.add('hidden');
    summaryContainer.classList.remove('hidden');
  } else {
    // load question
    const question = quizArray[questionIndex].question;
    // load answers
    const answers = quizArray[questionIndex].answers;
    // identify solution
    correctAnswer = answers[0];
    // shuffle array
    answers.sort(() => Math.random() - 0.5);
    // display question
    displayQuestion(question, answers);
    questionIndex++;
  }
}

function displayQuestion(q, a) {
  question_div.innerText = q;
  answerButtons.forEach((button, index) => {
    button.innerText = a[index];
  });
}

function checkAnswer(e) {
  if (e.target.innerText === correctAnswer) {
    e.target.style.backgroundColor = 'green';
    score++;
    score_span.innerText = score;
  } else {
    e.target.style.backgroundColor = 'red';
    // display correct answer button
    const correctAnswerBtn = answerButtons.find((button) => {
      return button.innerText === correctAnswer;
    });
    correctAnswerBtn.style.backgroundColor = 'green';
  }
  answerButtons.forEach((button) => (button.disabled = true));
  nextBtn.disabled = false;
}

function retry() {
  summaryContainer.classList.add('hidden');
  startContainer.classList.remove('hidden');
  questionIndex = 0;
  score = 0;
}
