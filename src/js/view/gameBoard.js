import Game from "../domain/game.js";

const GAME_BOARD_ID = "game-board";
const CURRENT_TURN_PLAYER_ID = "current-player";
const ROLL_DICE_BUTTON_ID = "roll-dice-button";
const FIRST_ROLL_ID = "first-roll-value";
const SECOND_ROLL_ID = "second-roll-value";
const CURRENT_PLAYER_TOTAL_ID = "current-player-total";

class GameBoard {
  constructor(rootElement, players, totalTurn) {
    this.$rootElement = rootElement;
    this.$currentTurnPlayerName = null;
    this.$currentPlayerTotal = null;
    this.$rollDiceButton = null;
    this.$firstRoll = null;
    this.$secondRoll = null;

    this.game = new Game(players, totalTurn);
  }

  init() {
    this.renderElements();
    this.assignElements();
    this.renderNextTurnBoardTitle();
    this.bindEvent();
  }

  renderElements() {
    const $gameBoard = document.createElement("div");
    $gameBoard.setAttribute("id", GAME_BOARD_ID);

    const $rollButton = document.createElement("button");
    $rollButton.setAttribute("id", ROLL_DICE_BUTTON_ID);
    $rollButton.textContent = "주사위 던지기";

    this.$rootElement.appendChild($gameBoard);
    this.$rootElement.appendChild($rollButton);
  }

  assignElements() {
    this.$gameBoard = document.getElementById(GAME_BOARD_ID);
    this.$currentTurnPlayerName = document.getElementById(CURRENT_TURN_PLAYER_ID);
    this.$rollDiceButton = document.getElementById(ROLL_DICE_BUTTON_ID);
    this.$firstRoll = document.getElementById(FIRST_ROLL_ID);
    this.$secondRoll = document.getElementById(SECOND_ROLL_ID);
    this.$currentPlayerTotal = document.getElementById(CURRENT_PLAYER_TOTAL_ID);
  }

  bindEvent() {
    this.$rollDiceButton.addEventListener("click", this.playGame.bind(this));
  }

  playGame() {
    this.playTurn();

    if (this.game.hasNextTurn() && !this.game.hasNextPlayerInTurn()) {
      this.game.moveToNextTurn();
      this.renderNextTurnBoardTitle();
    }

    if (this.game.isOver()) {
      this.hideRollButton();
      this.renderGameResult();
    }
  }

  playTurn() {
    if (!this.game.hasNextPlayerInTurn()) {
      return;
    }

    const { first, second, total } = this.game.playCurrentPlayer();

    this.renderCurrentPlayerBoard(first, second, total);

    if (!this.game.isLastPlayer()) {
      this.renderNextPlayerBoardTitle();
    }

    this.game.moveToNextPlayer();
  }

  hideRollButton() {
    this.$rollDiceButton.style.display = "none";
  }

  renderCurrentPlayerBoard(first, second, total) {
    this.$gameBoard.innerHTML += `<p>주사위 결과: <span>${first}</span>, <span>${second}</span></p>
      <p>현재까지 얻은 점수 : <span>${total}</span></p><hr/>`;
  }

  renderGameResult() {
    this.$gameBoard.innerHTML += `<p>총 점수</p>`;

    this.game.players.forEach((player) => {
      this.$gameBoard.innerHTML += `<p>${player.getName()}: ${player.getTotalScore()}</p>`;
    });
  }

  renderNextPlayerBoardTitle() {
    this.$gameBoard.innerHTML += `<p>${this.game.getNextPlayerName()}의 차례입니다.</p>`;
  }

  renderNextTurnBoardTitle() {
    this.$gameBoard.innerHTML += `<p>${this.game.getCurrentPlayerName()}의 차례입니다.</p>`;
  }
}

export default GameBoard;
