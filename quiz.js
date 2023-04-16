// Targeting question declared as a constant using querySelector() method returning the first element in the document with the question ID
const question = document.querySelector('#question');

// Targeting choices declared as a constant using querySelectorAll() method returning an array from a static list through the Array.from() method
const choices = Array.from(document.querySelectorAll('.choice-text'));

// Targeting timerID declared as a constant using querySelector() method returning the first element in the document with the score ID
const timerID = document.querySelector('#score');

// Declaring curentQuestion as an empty object
let currentQuestion = {};

// Declaring acceptingAnswers (correct answer) as a Booleans true
let acceptingAnswers = true;

// Declaring the starting timer count down value at 1 minute
let score = 60;

// Declaring availableQuestions as an empty array
let availableQuestions = [];

// Create variable questions and let the questions be an array to store multiple question(s) in a single variable named questions
let questions =[
  {
    // Let the question be an object with the following strings
    // String '0'
    question: 'Commonly used data types DO Not include:',
    // String '1'
    choice1: 'strings',
    // String '2'
    choice2: 'booleans',
    // String '3'
    choice3: 'alerts',
    // String '4'
    choice4: 'numbers',
    // String '5' indicating the answer to this question is string '3'
    answer: 3,
  },
  {
    question: 'The condition in an if / else statement is enclosed with _____.',
    choice1: 'quotes',
    choice2: 'curly brackets',
    choice3: 'parenthesis',
    choice4: 'square brackets',
    answer: 3,
  },
  {
    question: 'Arrays in JavaScript can be used to store _____.',
    choice1: 'number and strings',
    choice2: 'other arrays',
    choice3: 'booleans',
    choice4: 'all of the above',
    answer: 4,
  },
  {
    question: 'String values must be enclosed within _____ when being assinged to variables.',
    choice1: 'comma',
    choice2: 'curly brackets',
    choice3: 'quotes',
    choice4: 'parenthesis',
    answer: 3,
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    choice1: 'JavaScript',
    choice2: 'terminal/bash',
    choice3: 'for loops',
    choice4: 'console.log',
    answer: 4,
  },
];


// Creating the countDownTimer function
function countDownTimer(){
  // Creating a timer that calls the countDownTimer function every second (defined below)
  let timer = setInterval(function(){
    // The -- decrement operator decreases the time at a defined interval below
    score--;
    // Display the content of the element(s) including the script and the style through the textContent property which will be the score
    timerID.textContent = score;

    // When the timer runs out (less than or equal to 0 seconds left)
    if(score <= 0) {
      // clearInterval method cancels the the repeating action of the 'timer'
      clearInterval(timer);
      // alert method commands the browser to display Quiz Over message as the quiz ended
      alert("Quiz Over -- The End !!! Run through the rest of the remaining question at your leisure for practice but your final score will not be recorded as you have not completed the quiz in the allocated time.");
    };
  
  // Define the setInterval Interval at 1 second
  }, 1000);
};


// Creating the startQuiz function to initiate quiz
function startQuiz() {
  // Calling the countDownTimer function to commence counting down
  countDownTimer();
  // Determine the number of total available questions
  availableQuestions = [...questions]
  // Calling the getNewQuestion function to retrive a new question
  getNewQuestion()
}

// Creating the getNewQuestion function to retrive a new question and display the currentQuestion with the choices available
function getNewQuestion() {
  // When there is no more new questions available launch the End Page using the assign static method
  if(availableQuestions.length === 0) {
    return window.location.assign('./end.html')
  }
  // Selecting the array of question randomly using the Math.floor and Math.ramdom displaying the currentQuestion content through innerText
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question
  // Using the forEach Method to extract the text content of multiple choice 1-4 read by the dataset fromm the HTML element in relation the respective currentQuestion displaying using innerText
  choices.forEach(function(choice) {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}


  choices.forEach(function(choice) {
    choice.addEventListener('click', function(e) {
      if(!acceptingAnswers) return

      acceptingAnswers = false
      const selectedChoice = e.target
      const selectedAnswer = selectedChoice.dataset['number']

      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
      'incorrect'
   
      if(classToApply === 'incorrect') {
      score = score - 10;
      }

      selectedChoice.parentElement.classList.add(classToApply)

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
      
        }, 100)
    })
  })

startQuiz()
























































// const question = document.querySelector('#question');
// const choices = Array.from(document.querySelectorAll('.choice-text'));
// const scoreText = document.querySelector('#score');



// let currentQuestion = {};
// let acceptingAnswers = true;
// let score = 0;
// let availableQuestions = [];

// let questions =[
//   {
//     question: 'Commonly used data types DO Not include:',
//     choice1: 'strings',
//     choice2: 'booleans',
//     choice3: 'alerts',
//     choice4: 'numbers',
//     answer: 3,
//   },
//   {
//     question: 'The condition in an if / else statement is enclosed with _____.',
//     choice1: 'quotes',
//     choice2: 'curly brackets',
//     choice3: 'parenthesis',
//     choice4: 'square brackets',
//     answer: 3,
//   },
//   {
//     question: 'Arrays in JavaScript can be used to store _____.',
//     choice1: 'number and strings',
//     choice2: 'other arrays',
//     choice3: 'booleans',
//     choice4: 'all of the above',
//     answer: 4,
//   },
//   {
//     question: 'String values must be enclosed within _____ when being assinged to variables.',
//     choice1: 'comma',
//     choice2: 'curly brackets',
//     choice3: 'quotes',
//     choice4: 'parenthesis',
//     answer: 3,
//   },
//   {
//     question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
//     choice1: 'JavaScript',
//     choice2: 'terminal/bash',
//     choice3: 'for loops',
//     choice4: 'console.log',
//     answer: 4,
//   },
// ]




// const score_points = 100
// const max_questions = 5

// startQuiz = () => {
//   score = 0
//   availableQuestions = [...questions]
//   getNewQuestion()
// }

// getNewQuestion = () => {

//   if(availableQuestions.length === 0) {
//     localStorage.setItem('mostRecentScore', score)
//     return window.location.assign('./end.html')
//   }

//   const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
//   currentQuestion = availableQuestions[questionsIndex]
//   question.innerText = currentQuestion.question

  
//   choices.forEach(choice => {
//     const number = choice.dataset['number']
//     choice.innerText = currentQuestion['choice' + number]
// })

//   availableQuestions.splice(questionsIndex, 1)

//   acceptingAnswers = true
// }

// choices.forEach(choice => {
//   choice.addEventListener('click', e => {
//     if(!acceptingAnswers) return

//     acceptingAnswers = false
//     const selectedChoice = e.target
//     const selectedAnswer = selectedChoice.dataset['number']

//     let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
//     'incorrect'
   
//     if(classToApply === 'correct') {
//         incrementScore(score_points)
//       }

//       selectedChoice.parentElement.classList.add(classToApply)

//       setTimeout(() => {
//         selectedChoice.parentElement.classList.remove(classToApply)
//         getNewQuestion()
      
//       }, 1000)
//   })
// })

// incrementScore = num => {
//   score +=num
//   scoreText.innerText = score
// }

// startQuiz()