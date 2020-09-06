const game = new rps();

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    if (button.id === "startButton") return handleStartGame();
    if (
      button.id === "rock" ||
      button.id === "paper" ||
      button.id === "scissors"
    )
      return handleGameControls(button.id);
  });
});

const handleStartGame = () => {
  game.startGame();
  updateUI();
};

const handleGameControls = (selection) => {
  game.playRound(selection);
  updateUI();
};

const updateUI = () => {
  const {
    computerSelection,
    playerSelection,
    score,
    round,
    roundResultString,
    gameState,
    gameResultObject,
  } = game.UIData;
  document.querySelector("#roundNumber").innerHTML = round;
  document.querySelector("#playerSelection").innerHTML = playerSelection;
  document.querySelector("#computerSelection").innerHTML = computerSelection;
  document.querySelector("#playerScore").innerHTML = score.player;
  document.querySelector("#computerScore").innerHTML = score.computer;
  document.querySelector("#tieScore").innerHTML = score.tie;
  document.querySelector("#roundResult").innerHTML = roundResultString;
  document.querySelector("#gameResultString").innerHTML =
    gameResultObject.resultString;
  document.querySelector("#gameResultScore").innerHTML =
    gameResultObject.scoreString;
  const startButton = document.querySelector("#startButton");
  const rockButton = document.querySelector("#rock");
  const paperButton = document.querySelector("#paper");
  const scissorsButton = document.querySelector("#scissors");
  const resultStringContainer = document.querySelector(
    "#resultStringContainer"
  );
  if (gameState === "playing") {
    startButton.disabled = true;
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
    resultStringContainer.style.display = "none";
  } else {
    startButton.disabled = false;
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    resultStringContainer.style.display = "flex";
  }
};
