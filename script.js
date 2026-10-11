const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = true;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handelClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;

  cell.textContent = currentPlayer;

  cell.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningCombination.length; i++) {
    const [a, b, c] = winningCombination[i];

    if (board[a] === "" || board[b] === "" || board[c] === "") {
      continue;
    }

    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} Win.`;
    gameActive = false;

    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = `Draw`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer} turn.`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];

  currentPlayer = "X";

  gameActive = true;
  statusDisplay.textContent = "Player x turn";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", handelClick);
});
restartButton.addEventListener("click", restartGame);
