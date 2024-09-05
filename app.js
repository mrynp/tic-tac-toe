const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const displayBoard = () => {
    const gameboard = document.querySelector("#gameboard");
    const match = document.querySelector(".match");
    const intro = document.querySelector(".intro");
    intro.classList.add("fadeOut");
    match.classList.add("fadeIn");
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
  const message = document.querySelector(".message");

  const start = () => {
    players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.displayBoard();
    playAgainBtn.style.display = "none";
  };

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id);

    if (Gameboard.getBoard()[index] !== "") return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (checkWin(Gameboard.getBoard(), players[currentPlayerIndex].mark)) {
      const winningMark = checkWin(Gameboard.getBoard());
      if (winningMark) {
        winningMark.forEach((index) => {
          document.getElementById(index).style.color = "#c30010";
        });
      }
      gameOver = true;
      message.textContent = `${players[currentPlayerIndex].mark} wins!!`;
      playAgainBtn.style.display = "block";
    } else if (checkTie(Gameboard.getBoard())) {
      gameOver = true;
      playAgainBtn.style.display = "block";
      message.textContent = "It's a tie";
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const playAgain = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    message.textContent = "";
    start();
  };

  return {
    start,
    handleClick,
    playAgain,
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
      return [a, b, c];
    }
  }
  return null;
}

function checkTie(board) {
  return board.every((cell) => cell !== "");
}

const playBtn = document.querySelector(".play-btn");
playBtn.addEventListener("click", () => {
  Game.start();
});

const playAgainBtn = document.querySelector(".playagain-btn");
playAgainBtn.addEventListener("click", () => {
  Game.playAgain();
});
