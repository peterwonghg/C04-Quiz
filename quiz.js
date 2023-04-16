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

    // When the timer runs out (less than or equal to 0 seconds left) but you have not completed the Quiz
    if(score <= 0) {
      // clearInterval method cancels the repeating action of the 'timer'
      clearInterval(timer);
      // alert method commands the browser to display Quiz Over message as the quiz ended

      alert("Quiz Over !!! Retake Quiz Again");
      // Redirect to Home Page when the OK button is pressed at the display box      

    };

  // Define the setInterval Interval at 1 second
  }, 1000);
};


// Creating the startQuiz function to initiate the quiz
function startQuiz() {
  // Calling the countDownTimer function to commence counting down
  countDownTimer();
  // Using the spread operator to allow an iterable questions array to be expanded wherever it is placed
  availableQuestions = [...questions]
  // Calling the getNewQuestion function to retrive a question or a new question
  getNewQuestion()
}

// Creating the getNewQuestion function to retrive a new question and display the currentQuestion with the choices available
function getNewQuestion() {
  // When there is no more new questions available launch the End Page using the assign static method
  if(availableQuestions.length === 0) {
    // setItem() method saves the score value called mostRecentScore in the localStorage
    localStorage.setItem('mostRecentScore', score)    
    // The return statement ends the function execution and redirect to the end.html page by using assign to copy all the links at the location interface
    return window.location.assign('./end.html')
  }
 
  // Declaring questionIndex as a constant whether it is 0, 1, 2, 3 or 4 representing the 5 questions in the questions array
  // Math.random generates a number between 0 and less than 1
  // This random number is multiplied by the unanswered questions determined by availableQuestions.length
  // Math.floor then rounds down the result and return an integer between 0-4 giving the questionIndex
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  // Retrieve the array of the currentQuestion chosen through availableQuestions[questionIndex] where questionIndex(n) = question(n+1)
  currentQuestion = availableQuestions[questionsIndex]
  // Display the text content of the question in the currentQuestion chosen through innerText property
  question.innerText = currentQuestion.question


  // Using the forEach to execute the choice function once for each array element
  choices.forEach(function(choice) {
    // Generates a number for each loop the choice function is executed
    const number = choice.dataset['number']
    // Add this number to 'choice' to display the text content of the choices in the currentQuestion chosen through innerText property eg choice1, choice2, choice3 and choice4
    choice.innerText = currentQuestion['choice' + number]
})

  // Remove 1 element from availableQuestions identified by the questionsIndex ie remove the question that has currently already been asked
  availableQuestions.splice(questionsIndex, 1)

  // Accepting the correct answer
  acceptingAnswers = true
}

  // Using the forEach to execute the choice function once for the array element that is chosen
  choices.forEach(function(choice) {
    // The addEventListener adds the function in this case the click of the mouse on an answer choice which implements the EventListener 
    choice.addEventListener('click', function(e) {
      // If the answer selected is incorrect by using ! to invert the Boolean expression then return acceptingAnswers as False (incorrect)
      if(!acceptingAnswers) return
      acceptingAnswers = false
      
      // Declaring the target property of the event to be the selectedChoice
      const selectedChoice = e.target
      // Declaring the selectedAnswer to be the number from the selectedChoice read through dataset property
      const selectedAnswer = selectedChoice.dataset['number']
      // Declaring the classToApply as the same as the selectedAnswer
      // Class applied is a GREEN background if the answer is correct 
      // Class applied is a RED background if the answer is incorrect
      // The conditional ternary operator with the selectedAnswer (correct answer) as the condition foloowed by ? and executing the class correct 
      // Otherwise (incorrect answer) executing the class incorrect
      // The conditional ternary operator used is equivalent to If...else statement
      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
      'incorrect'
   
      // if classToApply aka selectedAnswer is incorrect
      if(classToApply === 'incorrect') {
      // Score (or timer) is reduced by 10 seconds as per the quiz rule
      score = score - 10;
      }

      // Adding classToApply (correct/incorrect class) onto parentElement.classList property
      selectedChoice.parentElement.classList.add(classToApply)

      // Execute a function after a specified time through setTimeOut
      // Time lapse (0.5 s) between the end of the previous question and the presentation of the next question be 0.5 second
      setTimeout(() => {
        // Removing/Reseting classToApply (correct/incorrect class) onto parentElement.classList property
        selectedChoice.parentElement.classList.remove(classToApply)
        // Execute the getNewQuestion() function to get annother/next question
        getNewQuestion()
        // Define time lapse of 0.5 second
        }, 500)
    })
  })

// Execute the startQuiz function
startQuiz()
