import GameBoard from "./gameBoard.js";

const PLAYERS_INPUT_ID = "players-input";
const PLAYERS_SUBMIT_ID = "players-submit";
const TURN_INPUT_ID = "turn-input";
const TURN_SUBMIT_ID = "turn-submit";

const PLAYER_INPUT_TEMPLATE = `<h3>플레이어 이름을 5자 이하로, 쉼표로 구분하여 입력해주세요</h3>
  <input type="text" id=${PLAYERS_INPUT_ID} />
  <button type="button" id=${PLAYERS_SUBMIT_ID}>확인</button>`;
const TURN_INPUT_TEMPLATE = `<h3>플레이할 턴 수를 입력해주세요</h3>
  <input type="number" id=${TURN_INPUT_ID} />
  <button type="button" id=${TURN_SUBMIT_ID}>확인</button>`;

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 5;

class GameSetting {
  constructor(rootElement) {
    this.$rootElement = rootElement;
    this.players = [];
    this.totalTurn = 0;
  }

  init() {
    this.initPlayerInput();
  }

  /**
   * 입력 영역 렌더
   */
  initPlayerInput() {
    this.renderPlayerInput();
    this.bindPlayerInputEvent();
  }

  renderPlayerInput() {
    const $playerInputContainer = document.createElement("div");
    $playerInputContainer.innerHTML = PLAYER_INPUT_TEMPLATE;

    this.$rootElement.appendChild($playerInputContainer);
  }

  bindPlayerInputEvent() {
    const $playerInput = document.getElementById(PLAYERS_INPUT_ID);
    const $playerSubmitButton = document.getElementById(PLAYERS_SUBMIT_ID);

    $playerSubmitButton.addEventListener("click", () => {
      const players = this.parsePlayers($playerInput.value);

      if (!this.isValidLength(players)) {
        alert("플레이어 이름의 길이를 확인해주세요.");
        return;
      }

      if (this.isDuplicated(players)) {
        alert("플레이어 이름은 중복될 수 없습니다.");
        return;
      }

      this.disablePlayerInput($playerInput, $playerSubmitButton);
      this.setPlayers(players);
      this.initTurnInput();
    });
  }

  disablePlayerInput($playerInput, $playerSubmitButton) {
    $playerInput.disabled = true;
    $playerSubmitButton.disabled = true;
  }

  setPlayers(players) {
    this.players = players;
  }

  initTurnInput() {
    this.renderTurnInput();
    this.bindTurnInputEvent();
  }

  renderTurnInput() {
    const $turnInputContainer = document.createElement("div");
    $turnInputContainer.innerHTML = TURN_INPUT_TEMPLATE;

    this.$rootElement.appendChild($turnInputContainer);
  }

  bindTurnInputEvent() {
    const $turnInput = document.getElementById(TURN_INPUT_ID);
    const $turnSubmitButton = document.getElementById(TURN_SUBMIT_ID);

    $turnSubmitButton.addEventListener("click", () => {
      this.disableTurnInput($turnInput, $turnSubmitButton);
      this.setTotalTurn(this.parseTurn($turnInput.value));
      this.setupGameBoard();
    });
  }

  disableTurnInput($turnInput, $turnSubmitButton) {
    $turnInput.disabled = true;
    $turnSubmitButton.disabled = true;
  }

  setTotalTurn(turn) {
    this.totalTurn = turn;
  }

  setupGameBoard() {
    const gameBoard = new GameBoard(this.$rootElement, this.players, this.totalTurn);

    gameBoard.init();
  }

  /**
   * 입력값 검증, 파싱
   */
  isValidLength(players) {
    return players.every((player) => {
      return player.length >= MIN_NAME_LENGTH && player.length <= MAX_NAME_LENGTH;
    });
  }

  isDuplicated(players) {
    return new Set(players).size !== players.length;
  }

  parsePlayers(playersValue) {
    return playersValue.split(",");
  }

  parseTurn(turnValue) {
    return parseInt(turnValue, 10);
  }
}

export default GameSetting;
