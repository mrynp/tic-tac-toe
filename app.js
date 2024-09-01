const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const displayBoard = () => {
    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("square");
      document.querySelector("#gameboard").append(cellElement);
    });
  };

  return {
    displayBoard,
  };
})();

const Game = () => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const start = () => {
    players = [("Player 1", "X"), ("Player 2", "O")];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.displayBoard();
    console.log("H");
  };
  return {
    start,
  };
};

Game().start();
