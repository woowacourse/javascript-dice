class Dice {
  static roll() {
    return WoowaUtil.Random.pickNumberInList([1, 2, 3, 4, 5, 6]);
  }
}

export default Dice;
