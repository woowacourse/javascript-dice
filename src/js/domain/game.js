import Player from "./player.js";

class Game {
  constructor(players, totalTurn) {
    this.players = players.map((name) => new Player(name, totalTurn));
    this.totalTurn = totalTurn;
    this.currentTurnId = 0;
    this.currentPlayerId = 0;
  }

  moveToNextTurn() {
    this.currentTurnId++;
    this.currentPlayerId = 0;
  }

  moveToNextPlayer() {
    this.currentPlayerId++;
  }

  getCurrentPlayerName() {
    const currentPlayer = this.players[this.currentPlayerId];

    return currentPlayer.getName();
  }

  getNextPlayerName() {
    return this.players[this.currentPlayerId + 1].getName();
  }

  playCurrentPlayer() {
    const currentPlayer = this.players[this.currentPlayerId];
    const { first, second, total } = currentPlayer.playTurn(this.currentTurnId);

    return { first, second, total };
  }

  isLastPlayer() {
    return this.currentPlayerId + 1 === this.players.length;
  }

  hasNextTurn() {
    return this.currentTurnId + 1 < this.totalTurn;
  }

  hasNextPlayerInTurn() {
    return this.currentPlayerId < this.players.length;
  }

  hasCurrentPlayer() {
    return this.currentPlayerId < this.players.length;
  }

  isOver() {
    return !this.hasNextTurn() && !this.hasNextPlayerInTurn();
  }
}

export default Game;
