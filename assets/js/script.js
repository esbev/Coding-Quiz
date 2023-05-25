var timerSpan = document.getElementById("time-left");
var beforeView = document.getElementById("before-start");
var quizView = document.getElementById("quiz-start");
var endView = document.getElementById("quiz-over");
var startButton = document.getElementById("start-button");
var submitButton = document.getElementById("submit");
var questionText = document.getElementById("question");
var choiceButton1 = document.getElementById("choice-1");
var choiceButton2 = document.getElementById("choice-2");
var choiceButton3 = document.getElementById("choice-3");
var choiceButton4 = document.getElementById("choice-4");
var questionResultText = document.getElementById("question-result");
var scoreText = document.getElementById("user-score");
var userInitials = document.getElementById("user-initials");
var userScore = "";
var timeLeft = 40;
var clickCount = 0;
var correctAnswers = 0;
var answerCount = 0;
var resultText = true;

var questionIndex = 0;
var questionTextArray = [
  "'function' and 'var' are known as:",
  "JavaScript, what is a block 'of' statement?",
  "Which one of the following is also known as Conditional Expression?",
  "What we will get if we compare 'one' with '8' using the less than operator ('one'<8)?",
  "In JavaScript, the x===y statement implies that:",
  "A function which does not return a value is known as _____"];
var choice1Text = [
  "Data types",
  "Conditional block",
  "if-else",
  "False",
  "Both x and y are equal in value, type, and reference address.",
  "Array"];
var choice2Text = [
  "Prototypes",
  "block that combines a number of statements into a single compound statement",
  "immediate if",
  "True",
  "Both x and y are only equal in value.",
  "Procedure"];
var choice3Text = [
  "Expressions",
  "block that contains a single statement",
  "if-then-else",
  "Undefined",
  "Both are equal in  value and data type.",
  "String"];
var choice4Text = [
  "Declaration statements",
  "a loop block",
  "return if",
  "Not a number",
  "Neither is equal to the other",
  "Variable"];
var correctAnswerIndex = [4,2,2,1,3,2];

function init() {
  //set initial view
  quizView.setAttribute("style", "display: none;");
  endView.setAttribute("style", "display: none;");
}

function startQuiz() {
  //change view on start
  beforeView.setAttribute("style", "display: none;");
  quizView.setAttribute("style", "display: visible;");

  setQuestionText();

  var gameInterval = setInterval(() => {
        timerSpan.textContent = --timeLeft;

        if (!timeLeft) {
            clearInterval(gameInterval);
            //change to end of quiz view when timer finish
            quizView.setAttribute("style", "display: none;");
            endView.setAttribute("style", "display: visible;");
            userScore = Math.round(correctAnswers/questionTextArray.length*100);
            scoreText.textContent = userScore + "\%";
        }
    }, 1000)
        timerSpan.textContent = timeLeft;
}

//this function was brought to you by the letters ELI
function saveHighScore () {
  //get value of input box
  var theInitials = userInitials.value.trim();
  userInitials.textContent = "";

  //make sure value wasn't empty
  if (theInitials !== "") {
    //get saved scores from local storage, or if not any, set to empty array
    var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    //format new score object for current user
    var newScore = {
      theScore: userScore,
      theInitials: theInitials,
    };

    //save to local storage and opens a new page with high scores listed
    highScores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
  }
}

function setQuestionText() {
  //populate quiz questions and answer choices
  questionText.textContent = questionTextArray[questionIndex];
  choiceButton1.textContent = choice1Text[questionIndex];
  choiceButton2.textContent = choice2Text[questionIndex];
  choiceButton3.textContent = choice3Text[questionIndex];
  choiceButton4.textContent = choice4Text[questionIndex];
  questionResultText.textContent = "";

  //indicate if answer is correct or not
  if (answerCount) {
    if (resultText) {
      questionResultText.setAttribute("style", "color: green;")
      questionResultText.textContent = "CORRECT";
    } else {
      questionResultText.setAttribute("style", "color: red;")
      questionResultText.textContent = "INCORRECT";
    }
  }
}

//finds out if the user chose the correct answer
function checkAnswer(x) {
  answerCount++;
    if (x == correctAnswerIndex[questionIndex]) {
      correctAnswers++;
      resultText = true;
    } else {
      resultText = false;
      timeLeft = timeLeft - 10;
    }
    if (questionIndex == questionTextArray.length-1) {
      //changes to endView
      endView.setAttribute("style", "display: none;");
      timeLeft = 1;
    } else {
      questionIndex++;
      setQuestionText();
    }
}

init();

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);
choiceButton1.addEventListener("click", function() {
  checkAnswer(1);
});
choiceButton2.addEventListener("click", function() {
  checkAnswer(2);
});
choiceButton3.addEventListener("click", function() {
  checkAnswer(3);
});
choiceButton4.addEventListener("click", function() {
  checkAnswer(4);
});
