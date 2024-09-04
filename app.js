const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const displayBoard = () => {
    const gameboard = document.querySelector("#gameboard");
    gameboard.innerHTML = "";
    board.forEach((cell, index) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("square");
      cellElement.id = index;
      cellElement.textContent = cell;
      gameboard.append(cellElement);
    });
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    board[index] = value;
    displayBoard();
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
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id);
    Gameboard.update(index, players[currentPlayerIndex].mark);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    handleClick,
  };
})();

Game.start();
