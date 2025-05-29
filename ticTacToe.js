const cellContainer = document.querySelector("#cellContainer");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

let options = Array(9).fill("");
let currentPlayer = "X";
let running = false;
let cells = [];

document.addEventListener("DOMContentLoaded", initializeGame);

function initializeGame() {
  createBoard();
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.setAttribute("role", "button");
    cell.setAttribute("aria-label", `Cell ${i + 1}`);
    cell.addEventListener("click", cellClicked);
    cellContainer.appendChild(cell);
    cells.push(cell);
  }
}

function cellClicked(e) {
  const index = e.target.dataset.index;
  if (options[index] !== "" || !running) return;

  updateCell(e.target, index);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = winConditions.some(condition => {
    const [a, b, c] = condition;
    return options[a] && options[a] === options[b] && options[a] === options[c];
  });

  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  options.fill("");
  currentPlayer = "X";
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
  cells.forEach(cell => cell.textContent = "");
}
