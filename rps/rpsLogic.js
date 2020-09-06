class rps {
  #OPTIONS = ["rock", "paper", "scissors"];
  constructor() {
    this._gameState = "notPlaying";
    this._maxRounds = 5;
    this._round = 1;
    this._playerSelection = "";
    this._computerSelection = "";
    this._cString = "";
    this._pString = "";
    this._roundResultString = "";
    this._gameResultObject = {};
    this._score = { computer: 0, player: 0, tie: 0 };
    this._roundHistory = [];
  }
  get UIData() {
    return {
      computerSelection: this._cString,
      playerSelection: this._pString,
      score: this._score,
      round: this._round,
      roundResultString: this._roundResultString,
      gameResultObject: this._gameResultObject,
      gameState: this._gameState,
      roundHistory: this._roundHistory,
    };
  }
  startGame() {
    this._gameState = "playing";
    this._round = 1;
    this._playerSelection = "";
    this._computerSelection = "";
    this._cString = "";
    this._pString = "";
    this._roundResultString = "";
    this._gameResultObject = {};
    this._score = { computer: 0, player: 0, tie: 0 };
    this._roundHistory = [];
  }
  updateScore(winner) {
    const prevScore = this._score;
    const winnerScore = this._score[winner] + 1;
    this._score = { ...prevScore, [winner]: winnerScore };
  }
  updateRound() {
    const { player, computer } = this._score;
    if (player >= 5 || computer >= 5) return this.endGame();
    const prevRound = this._round;
    this._round = prevRound + 1;
  }
  updateRoundHistory(winner) {
    const historyEntry = {
      winner,
      round: this._round,
      pString: this._pString,
      cString: this._cString,
    };
    const prevHistory = this._roundHistory;
    this._roundHistory = [...prevHistory, historyEntry];
  }
  endGame() {
    this.computeGameResult();
    this._gameState = "notPlaying";
  }
  computeGameResult() {
    const { computer, player, tie } = this._score;
    const resultString = player > computer ? "You Win!" : "You Lose!";
    const scoreString = `Wins: ${player} | Loses: ${computer}`;
    this._gameResultObject = { resultString, scoreString };
  }
  playRound(input) {
    if (this._gameState === "notPlaying") return;
    this._userSelection = this.digitizeInput(input);
    this._computerSelection = Math.floor(Math.random() * 3);
    const { winner, roundResultString, cString, pString } = this.computeResult({
      userSelection: this._userSelection,
      computerSelection: this._computerSelection,
    });
    this._pString = pString;
    this._cString = cString;
    this._roundResultString = roundResultString;
    this.updateScore(winner);
    this.updateRoundHistory(winner);
    this.updateRound();
  }

  digitizeInput = (input) => {
    const index = this.#OPTIONS.indexOf(input.toLowerCase());
    return index;
  };

  computeResult = ({ userSelection, computerSelection }) => {
    const gameTable = [
      { 1: "player", 2: "computer" },
      { 0: "computer", 2: "player" },
      { 0: "player", 1: "computer" },
    ];
    const winner =
      userSelection === computerSelection
        ? "tie"
        : gameTable[computerSelection][userSelection];

    const cString = `${this.#OPTIONS[computerSelection]
      .slice(0, 1)
      .toUpperCase()}${this.#OPTIONS[computerSelection].substr(1)}`;
    const pString = `${this.#OPTIONS[userSelection]
      .slice(0, 1)
      .toUpperCase()}${this.#OPTIONS[userSelection].substr(1)}`;
    const roundResultString =
      winner === "computer"
        ? `You Lose! ${cString} beats ${pString}`
        : winner === "player"
        ? `You Win! ${pString} beats ${cString}`
        : `Tie ${cString} = ${pString}`;
    return { winner, cString, pString, roundResultString };
  };
}
