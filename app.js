const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const displayBoard = () => {
    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("square");
      cellElement.id = index;
      document.querySelector("#gameboard").append(cellElement);
    });
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    board[index] = value;
    console.log(board);
  };

  return {
    displayBoard,
    update,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const start = () => {
    players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.displayBoard();
    // const squares = document.querySelectorAll(".square");
    // squares.forEach((square) => {
    //   square.addEventListener("click", handleClick);
    // });
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id);
    console.log(index);
    Gameboard.update(index, players[currentPlayerIndex].mark);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    console.log(currentPlayerIndex);
  };

  return {
    start,
    handleClick,
  };
})();

Game.start();
