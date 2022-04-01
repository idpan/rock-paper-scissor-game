let player;
let house;
let winStatus;
let score = 0;

const rulesBtn = document.querySelector(".rules-btn");
const closeRule = document.querySelector(".close");
const rulesBack = document.querySelector(".rules-back");
const winDeclare = document.querySelector(".win-status");
const chooseArea = document.querySelector(".choose-area");
const inGameArea = document.querySelector(".in-game-area");
const playerPicked = document.querySelector(".player-picked");
const housePicked = document.querySelector(".house-picked");
const playAgainBtn = document.querySelector(".play-again");
const scoreDisplay = document.querySelector(".score-count");
const chooseElement = document.querySelector(".choose").querySelectorAll(".outer");

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
function displayToNone(domElement) {
  domElement.style.display = "none";
}
function displayToFlex(domElement) {
  domElement.style.display = "flex";
}
function displayToBlock(domElement) {
  domElement.style.display = "block";
}
function displaySwitcher(resultForPlayer, resultForHouse, winStatus) {
  displayToNone(chooseArea);
  window.innerWidth <= 768 ? (inGameArea.style.display = "grid") : (inGameArea.style.display = "flex");

  setTimeout(displayToFlex, 900, housePicked.querySelector(".circle"));
  playerPicked.querySelector(".circle").classList.add(resultForPlayer);
  spin();
  setTimeout(function () {
    housePicked.querySelector(".circle").setAttribute("class", "circle");
    housePicked.querySelector(".circle").classList.add(resultForHouse);
  }, 2000);
  setTimeout(displayToBlock, 2400, winDeclare);

  if (winStatus === "win") {
    setTimeout(displayToFlex, 2500, playerPicked.querySelector(".winner-shadow"));
  }
  if (winStatus === "lose") {
    setTimeout(displayToFlex, 2500, housePicked.querySelector(".winner-shadow"));
  }
}
function winStatusDisplay(resultWinnerChosser) {
  if (resultWinnerChosser === "win") return (winDeclare.children[0].textContent = "you win");
  if (resultWinnerChosser === "lose") return (winDeclare.children[0].textContent = "you lose");
  return (winDeclare.children[0].textContent = "draw");
}
function playAgain() {
  playerPicked.querySelector(".circle").classList.remove(player);
  housePicked.querySelector(".circle").classList.remove(house);
  displayToNone(inGameArea);
  displayToFlex(chooseArea);
  displayToNone(housePicked.querySelector(".circle"));
  displayToNone(playerPicked.querySelector(".winner-shadow"));
  displayToNone(housePicked.querySelector(".winner-shadow"));
  displayToNone(winDeclare);
}
function spin() {
  const element = ["rock", "paper", "scissor"];
  let i = 0;
  const roller = setInterval(function () {
    housePicked.querySelector(".circle").classList.remove(element[element.length - 1]);
    housePicked.querySelector(".circle").classList.remove(element[i - 1]);
    housePicked.querySelector(".circle").classList.add(element[i++]);
    if (i === element.length) i = 0;
  }, 100);
  setTimeout(clearInterval, 2000, roller);
  housePicked.querySelector(".circle").classList.remove();
}

chooseElement.forEach(function (element) {
  element.onclick = function () {
    player = pickedForPlayer(this);
    house = pickedForHouse();
    winStatus = winnerChooser(player, house);
    winStatusDisplay(winStatus);
    displaySwitcher(player, house, winStatus);
    if (winStatus === "win") {
      score++;
      setTimeout(() => {
        scoreDisplay.textContent = score;
      }, 2400);
    }
  };
});

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
