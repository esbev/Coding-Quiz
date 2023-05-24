var scoreList = document.getElementById("scores");
var answerString = "";
var clearButton = document.getElementById("clear-scores");


function init() {
  var liEL = [];
  var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  for (i = 0; i < highScores.length; i++) {
    liEL.push(document.createElement("li"));
    liEL[i].innerHTML = highScores[i].theInitials + " - " + highScores[i].theScore;
    scoreList.appendChild(liEL[i]);
  }
}

function clearHighScores() {
  window.localStorage.clear();
  location.reload();
}

init();

clearButton.addEventListener("click", clearHighScores);
