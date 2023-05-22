var timerSpan = document.getElementById("time-left");
var beforeView = document.getElementById("before-start");
var quizView = document.getElementById("quiz-start");
var endView = document.getElementById("quiz-over");
var scoreView = document.getElementById("high-scores");
var highScoreButton = document.getElementById("view-scores");
var startButton = document.getElementById("start-button");
var submitButton = document.getElementById("submit");
var questionText = document.getElementById("question");
var choiceButton1 = document.getElementById("choice-1");
var choiceButton2 = document.getElementById("choice-2");
var choiceButton3 = document.getElementById("choice-3");
var choiceButton4 = document.getElementById("choice-4");
var clearButton = document.getElementById("clear-scores");
var questionResultText = document.getElementById("question-result");
var scoreText = document.getElementById("user-score");
var userInitials = document.getElementById("user-initials");

var scoreList = document.getElementById("scores");
var liEl = document.createElement("li");

var questionIndex = 0;
var questionTextArray = [
  "Why did the chicken cross the road? Answer: To get to ___________.",
  "What is your favorite color?",
  "How many hours are in a day?",
  "The answer is A"];
var choice1Text = [
  "1: the food",
  "Blue",
  "24",
  "4"];
var choice2Text = [
  "2: the water",
  "Red",
  "16",
  "3"];
var choice3Text = [
  "3: the otherside",
  "Yellow",
  "36",
  "2"];
var choice4Text = [
  "4: Alpha Centauri",
  "Flourescent Orange",
  "72",
  "1"];
var correctAnswerIndex = [3,4,1,4];

var userScore = "";
var timeLeft = 40;
var timerSpeed = 1000;
var clickCount = 0;
var correctAnswers = 0;
var answerString = "";
var resultText = true;

function init() {
  //set initial view
  // quizView.setAttribute("style", "display: none;");
  // endView.setAttribute("style", "display: none;");
  // scoreView.setAttribute("style", "display: none;");
}

function startQuiz() {
  //change view on start
  // beforeView.setAttribute("style", "display: none;");
  // quizView.setAttribute("style", "display: visible;");

  setQuestionText();

  var gameInterval = setInterval(() => {
        timerSpan.textContent = --timeLeft;

        if (!timeLeft) {
            clearInterval(gameInterval);
            //change to end of quiz view when timer finish
            // quizView.setAttribute("style", "display: none;");
            // endView.setAttribute("style", "display: visible;");
            userScore = Math.round(correctAnswers/questionTextArray.length*100);
            scoreText.textContent = userScore;
        }
    }, timerSpeed)
        timerSpan.textContent = timeLeft;
}

//this function was brought to you by the letters ELI
function saveHighScore () {
  //get value of input box
  var theInitials = userInitials.value.trim();

  //make sure value wasn't empty
  if (theInitials !== "") {
    //get saved scores from local storage, or if npot any, set to empty array
    var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    //format new score object for current user
    var newScore = {
      theScore: userScore,
      theInitials: theInitials,
    };

    //save to locel storage
    highScores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highScores));
  }

  //change to scoreView
  // scoreView.setAttribute("style", "display: visible;")
  // need to populate a list in a loop with scores array
  // for (i = 0; i < highScores.length; i++) {
  // }
  var temp = ["ESB - 100", "ABC - 100", "DEF - 100"];
  // var temp = highScores.toString();
  for (i = 0; i < temp.length; i++) {
    liEl.textContent = temp[0];
    // liEl.setAttribute();
    scoreList.appendChild(liEl);
  }

}

function clearHighScores() {
  window.localStorage.removeItem("highscores");
}

function setQuestionText() {
  questionText.textContent = questionTextArray[questionIndex];
  choiceButton1.textContent = choice1Text[questionIndex];
  choiceButton2.textContent = choice2Text[questionIndex];
  choiceButton3.textContent = choice3Text[questionIndex];
  choiceButton4.textContent = choice4Text[questionIndex];
  if (correctAnswers == 0){
    questionResultText.textContent = "";
  } else {
    if (resultText) {
      questionResultText.setAttribute("style", "color: green;")
      questionResultText.textContent = "CORRECT";
    } else {
      questionResultText.setAttribute("style", "color: red;")
      questionResultText.textContent = "INCORRECT";
    }
  }
}

function checkAnswer(x) {
    if (x == correctAnswerIndex[questionIndex]) {
      correctAnswers++;
      resultText = true;
    } else {
      resultText = false;
      timeLeft = timeLeft - 10;
    }
    if (questionIndex == questionTextArray.length-1) {
      //changes to endView
      // endView.setAttribute("style", "display: none;");
      timeLeft = 1;
    } else {
      questionIndex++;
      setQuestionText();
    }
}

init();

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);
clearButton.addEventListener("click", clearHighScores);
highScoreButton.addEventListener("click", saveHighScore);
//maybe play a sound on correct or incorrect
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
