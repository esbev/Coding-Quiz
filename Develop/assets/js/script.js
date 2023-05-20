var startButton = document.getElementById("start-button");
var timerSpan = document.getElementById("time-left");
var beforeView = document.getElementById("before-start");
var quizView = document.getElementById("quiz-container");
var endView = document.getElementById("quiz-over");
var submitButton = document.getElementById("submit");
var questionText = document.getElementById("question");
var choiceButton1 = document.getElementById("choice-1");
var choiceButton2 = document.getElementById("choice-2");
var choiceButton3 = document.getElementById("choice-3");
var choiceButton4 = document.getElementById("choice-4");
var questionResultText = document.getElementById("question-result");
var scoreText = document.getElementById("user-score");
var userInitials = document.getElementById("user-initials");

var questionIndex = 0;
var questionTextArray = [
  "why did the chicken cross the road? Answer: To get to ___________.",
  "What is your favorite color?",
  "How many hours are in a day?",];
var choice1Text = [
  "1: the food",
  "Blue",
  "24"];
var choice2Text = [
  "2: the water",
  "Red",
  "16"];
var choice3Text = [
  "3: the otherside",
  "Yellow",
  "36"];
var choice4Text = [
  "4: Alpha Centauri",
  "Flourescent Orange",
  "72"];
var correctAnswerIndex = [3,4,1];

var timeLeft = 15;
var timerSpeed = 500;
var clickCount = 0;
var correctAnswers = 0;
var totalQuestions = 3;
var answerString = "";

function init(){
  //sets initial view
  quizView.setAttribute("style", "display: none;");
  endView.setAttribute("style", "display: none;");
}

function startGame() {
  //changes view on start
  beforeView.setAttribute("style", "display: none;");
  quizView.setAttribute("style", "display: visible;");

  setQuestionText();

  var gameInterval = setInterval(() => {
        timerSpan.textContent = --timeLeft;

        if (!timeLeft) {
            clearInterval(gameInterval);
            //changes view on timer finish
            quizView.setAttribute("style", "display: none;");
            endView.setAttribute("style", "display: visible;");
            
            scoreText.textContent = Math.round(correctAnswers/totalQuestions*100) + "%";
        }
    }, timerSpeed)
        timerSpan.textContent = timeLeft;
}

//this function was brought to you by the letters ELI
function saveHighScore () {
  var theInitials = userInitials.value.trim();

  if (theInitials !== "") {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      theScore: time,
      theInitials: theInitials,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscore.html";
  }
}

function setQuestionText(){
  questionText.textContent = questionTextArray[questionIndex];
  choiceButton1.textContent = choice1Text[questionIndex];
  choiceButton2.textContent = choice2Text[questionIndex];
  choiceButton3.textContent = choice3Text[questionIndex];
  choiceButton4.textContent = choice4Text[questionIndex];
  questionResultText.textContent = "";
}

function checkAnswer(x) {
  if (questionIndex == totalQuestions-1) {
    questionText.textContent = "You have finished the quiz.";
    choiceButton1.setAttribute("style", "display: none;");
    choiceButton2.setAttribute("style", "display: none;");
    choiceButton3.setAttribute("style", "display: none;");
    choiceButton4.setAttribute("style", "display: none;");
    questionResultText.textContent = "No more questions.";
  } else {
    if (x == correctAnswerIndex[questionIndex]) {
      correctAnswers++;
      questionResultText.textContent = "Correct!";
    } else {
      questionResultText.textContent = "Incorrect!";
    }
    questionIndex++;
    setQuestionText();
  }

}

init();

startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", saveHighScore);
//maybe play a sound on click
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
