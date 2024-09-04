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

  const getBoard = () => board;

  return {
    displayBoard,
    update,
    getBoard,
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
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id);

    if (Gameboard.getBoard()[index] !== "") return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (checkWin(Gameboard.getBoard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      console.log(`${players[currentPlayerIndex].name} won`);
    } else if (checkTie(Gameboard.getBoard())) {
      gameOver = true;
      console.log("It's a tie");
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  return {
    start,
    handleClick,
  };
})();

function checkWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkTie(board) {
  return board.every((cell) => cell !== "");
}

const playBtn = document.querySelector(".play-btn");
playBtn.addEventListener("click", () => {
  Game.start();
});
