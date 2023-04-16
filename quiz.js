const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');



let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let availableQuestions = [];

let questions =[
  {
    question: 'Commonly used data types DO Not include:',
    choice1: 'strings',
    choice2: 'booleans',
    choice3: 'alerts',
    choice4: 'numbers',
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
]




const score_points = 100
const max_questions = 5

startQuiz = () => {
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
// If there is no questions left, run end page
  if(availableQuestions.length === 0) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('./end.html')
  }
// if there are more questions available, continue asking remainder questions
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  
  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
    'incorrect'
   
    if(classToApply === 'correct') {
        incrementScore(score_points)
      }

      selectedChoice.parentElement.classList.add(classToApply)

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
      
      }, 1000)
  })
})

// incrementScore = setInterval(timerFunction, 1000);

// function timerFunction(){
//   Text(time)
//   if(incrementScore < 1){
//     clearInterval(incrementScore);
//     alert("Out of Time");
//   }
// }

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startQuiz()