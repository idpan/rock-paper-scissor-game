let player;
let house;
let score = 0;

const rulesBtn = document.querySelector(".rules-btn");
const closeRule = document.querySelector(".close");
const rulesBack = document.querySelector(".rules-back");
const winStatus = document.querySelector(".win-status").children[0];
const rock = document.querySelector('[data-item="rock"]');
const paper = document.querySelector('[data-item="paper"]');
const scissor = document.querySelector('[data-item="scissor"]');
const chooseArea = document.querySelector(".choose-area");
const inGameArea = document.querySelector(".in-game-area");
const playerPicked = document.querySelector(".player-picked").children[1];
const housePicked = document.querySelector(".house-picked").children[1];
const playAgainBtn = document.querySelector(".play-again");
const scoreDisplay = document.querySelector(".score-count");
function pickedForPlayer(param) {
  return param.dataset.item;
}
function pickedForHouse() {
  const random = Math.random();
  if (random <= 0.3) return "rock";
  if (random > 0.3 && random <= 0.6) return "paper";
  return "scissor";
}
function winnerChooser(resultForPlayer, resultForHouse) {
  if (resultForPlayer === resultForHouse) return "draw";
  if (resultForPlayer === "rock") {
    if (resultForHouse === "paper") return "lose";
    if (resultForHouse === "scissor") return "win";
  }
  if (resultForPlayer === "paper") {
    if (resultForHouse === "scissor") return "lose";
    if (resultForHouse === "rock") return "win";
  }
  if (resultForPlayer === "scissor") {
    if (resultForHouse === "rock") return "lose";
    if (resultForHouse === "paper") return "win";
  }
}

function displaySwitcher(resultForPlayer, resultForHouse) {
  chooseArea.style.display = "none";
  inGameArea.style.display = "flex";
  playerPicked.classList.add(resultForPlayer);
  housePicked.classList.add(resultForHouse);
}
function winStatusDisplay(resultWinnerChosser) {
  if (resultWinnerChosser === "win") return (winStatus.textContent = "you win");
  if (resultWinnerChosser === "lose") return (winStatus.textContent = "you lose");
  return (winStatus.textContent = "draw");
}
function playAgain() {
  playerPicked.classList.remove(player);
  housePicked.classList.remove(house);
  chooseArea.style.display = "flex";
  inGameArea.style.display = "none";
}

// playerPicked click
rock.onclick = function () {
  player = pickedForPlayer(this);
  house = pickedForHouse();
  winStatusDisplay(winnerChooser(player, house));
  displaySwitcher(player, house);
  if (winnerChooser(player, house) === "win") {
    score += 1;

    scoreDisplay.textContent = score;
  }
};
paper.onclick = function () {
  player = pickedForPlayer(this);
  house = pickedForHouse();
  displaySwitcher(player, house);
  winStatusDisplay(winnerChooser(player, house));

  if (winnerChooser(player, house) === "win") {
    score += 1;

    scoreDisplay.textContent = score;
  }
};
scissor.onclick = function () {
  player = pickedForPlayer(this);
  house = pickedForHouse();
  displaySwitcher(player, house);
  winStatusDisplay(winnerChooser(player, house));

  if (winnerChooser(player, house) === "win") {
    score += 1;

    scoreDisplay.textContent = score;
  }
};
// play again click
playAgainBtn.onclick = function () {
  playAgain();
};
// rules button click
rulesBtn.onclick = () => {
  rulesBack.style.display = "flex";
};

// close button click
closeRule.onclick = function () {
  rulesBack.style.display = "none";
};
