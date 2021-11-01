import Dice from "./dice.js";

class Player {
  constructor(name, totalTurn) {
    this.name = name;
    this.turnScores = new Array(totalTurn).fill(0);
  }

  getName() {
    return this.name;
  }

  getTotalScore() {
    const sum = (previousValue, currentValue) => previousValue + currentValue;

    return this.turnScores.reduce(sum, 0);
  }

  playTurn(currentTurnId) {
    const first = Dice.roll();
    const second = Dice.roll();

    if (first === second) {
      this.turnScores[currentTurnId] = 0;
    } else {
      this.turnScores[currentTurnId] = first + second;
    }

    return { first, second, total: this.getTotalScore() };
  }
}

export default Player;
