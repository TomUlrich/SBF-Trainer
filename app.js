'use strict';

let questionIndex = 0;
let score = 0;
let correctAnswer;

const startContainer = $('#start-container');
const testBtn = $('#test-btn');
// const allgBtn
// const binnenBtn
// const segelnBtn
const quizContainer = $('#quiz-container');
const question_div = $('#question');
const answerButtons = $$('.answer-btn');
const nextBtn = $('#next');
const summaryContainer = $('#summary-container');
const score_span = $('#score-span');
const total_span = $('#total-span');
const retryBtn = $('#retry-btn');

testBtn.addEventListener('click', startTest);
nextBtn.addEventListener('click', loadTestJson);
answerButtons.forEach((button) => button.addEventListener('click', checkAnswer));
retryBtn.addEventListener('click', retry);

function startTest() {
  quizContainer.classList.remove('hidden');
  startContainer.classList.add('hidden');
  nextBtn.disabled = true;

  loadTestJson();
}

function loadTestJson() {
  answerButtons.forEach((button) => (button.disabled = false));
  answerButtons.forEach((button) => (button.style.backgroundColor = 'yellow'));
  nextBtn.disabled = true;

  fetch('questions/test.json')
    .then((response) => response.json())
    .then((data) => {
      loadQuizData(data);
    });
}

function loadQuizData(quizArray) {
  //doing:
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
    //! counter++
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
