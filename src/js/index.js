import GameSetting from "./view/gameSetting.js";

const initGame = () => {
  const gameSetting = new GameSetting(document.getElementById("app"));

  gameSetting.init();
};

window.addEventListener("load", initGame);
