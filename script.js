const puzzle = [
  [0, 6, 0, 3, 0, 8, 1, 0, 0],
  [5, 8, 1, 0, 0, 9, 6, 0, 0],
  [0, 0, 3, 5, 0, 0, 0, 0, 0],
  [0, 9, 0, 8, 0, 2, 0, 0, 0],
  [0, 0, 0, 7, 4, 5, 9, 3, 6],
  [3, 5, 0, 0, 0, 6, 8, 0, 4],
  [1, 3, 5, 0, 0, 0, 0, 0, 0],
  [7, 0, 8, 6, 1, 3, 4, 0, 0],
  [9, 4, 0, 0, 0, 7, 3, 0, 0]
];

const solution = [
  [4, 6, 9, 3, 2, 8, 1, 5, 7],
  [5, 8, 1, 4, 7, 9, 6, 2, 3],
  [2, 7, 3, 5, 6, 1, 9, 4, 8],
  [6, 9, 4, 8, 3, 2, 7, 1, 5],
  [8, 1, 2, 7, 4, 5, 9, 3, 6],
  [3, 5, 7, 1, 9, 6, 8, 2, 4],
  [1, 3, 5, 9, 8, 4, 2, 7, 6],
  [7, 2, 8, 6, 1, 3, 4, 9, 5],
  [9, 4, 6, 2, 5, 7, 3, 8, 1]
];

const board = document.getElementById("sudokuBoard");
const numberPad = document.getElementById("numberPad");
const message = document.getElementById("message");
const errorsEl = document.getElementById("errors");
const timerEl = document.getElementById("timer");
const newGameBtn = document.getElementById("newGameBtn");
const checkBtn = document.getElementById("checkBtn");
const blackout = document.getElementById("blackout");
const restoreBtn = document.getElementById("restoreBtn");
const bossModeBtn = document.getElementById("bossModeBtn");

let selectedCell = null;
let selectedIndex = null;
let errors = 0;
let seconds = 0;
let timerInterval = null;

function createBoard() {
  board.innerHTML = "";
  selectedCell = null;
  selectedIndex = null;
  errors = 0;
  seconds = 0;

  errorsEl.textContent = "0/3";
  timerEl.textContent = "00:00";
  message.textContent = "Select a cell to begin.";

  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  puzzle.flat().forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;

    if (value !== 0) {
      cell.textContent = value;
      cell.classList.add("fixed");
    }

    cell.addEventListener("click", () => selectCell(cell, index));

    board.appendChild(cell);
  });
}

function selectCell(cell, index) {
  clearHighlights();

  selectedCell = cell;
  selectedIndex = index;

  const selectedRow = Math.floor(index / 9);
  const selectedCol = index % 9;
  const selectedBlockRow = Math.floor(selectedRow / 3);
  const selectedBlockCol = Math.floor(selectedCol / 3);
  const selectedValue = cell.textContent;

  document.querySelectorAll(".cell").forEach((currentCell, currentIndex) => {
    const row = Math.floor(currentIndex / 9);
    const col = currentIndex % 9;
    const blockRow = Math.floor(row / 3);
    const blockCol = Math.floor(col / 3);

    const sameRow = row === selectedRow;
    const sameCol = col === selectedCol;
    const sameBlock =
      blockRow === selectedBlockRow && blockCol === selectedBlockCol;

    if (sameRow || sameCol || sameBlock) {
      currentCell.classList.add("related");
    }

    if (selectedValue && currentCell.textContent === selectedValue) {
      currentCell.classList.add("same-number");
    }
  });

  cell.classList.add("selected");
}

function clearHighlights() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("selected", "related", "same-number");
  });
}

numberPad.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    if (!selectedCell) {
      message.textContent = "Select a cell first.";
      return;
    }

    if (selectedCell.classList.contains("fixed")) {
      message.textContent = "This cell is part of the puzzle.";
      return;
    }

    if (errors >= 3) {
      message.textContent = "Game over. Click New Game.";
      return;
    }

    const number = Number(button.textContent);
    const row = Math.floor(selectedIndex / 9);
    const col = selectedIndex % 9;

    selectedCell.textContent = number;
    selectedCell.classList.remove("error", "correct-pop");

    if (number !== solution[row][col]) {
      selectedCell.classList.add("error");
      errors++;
      errorsEl.textContent = `${errors}/3`;

      if (errors >= 3) {
        message.textContent = "Game over. Try again.";
        clearInterval(timerInterval);
      } else {
        message.textContent = "Wrong number. Stay focused.";
      }

      return;
    }

    selectedCell.classList.add("correct-pop");
    message.textContent = "Correct. Keep going.";

    selectCell(selectedCell, selectedIndex);
    checkIfSolved();
  });
});

function checkIfSolved() {
  const cells = [...document.querySelectorAll(".cell")];

  const solved = cells.every((cell, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;

    return Number(cell.textContent) === solution[row][col];
  });

  if (solved) {
    message.textContent = `Puzzle solved in ${timerEl.textContent}.`;
    clearInterval(timerInterval);
  }

  return solved;
}

checkBtn.addEventListener("click", () => {
  const solved = checkIfSolved();

  if (!solved) {
    message.textContent = "Not complete yet. Keep going.";
  }
});

newGameBtn.addEventListener("click", createBoard);

function updateTimer() {
  seconds++;

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  timerEl.textContent = `${minutes}:${remainingSeconds}`;
}

// BOSS MODE

bossModeBtn.addEventListener("click", () => {
  blackout.classList.add("active");
});

restoreBtn.addEventListener("click", () => {
  blackout.classList.remove("active");
});

let lastX = null;
let lastDirection = null;
let directionChanges = 0;
let lastMoveTime = Date.now();

const minDistance = 80;
const maxPause = 900;
const changesToBlackout = 28;

document.addEventListener("mousemove", (event) => {
  const now = Date.now();

  if (now - lastMoveTime > maxPause) {
    directionChanges = 0;
    lastDirection = null;
    lastX = event.clientX;
  }

  lastMoveTime = now;

  if (lastX === null) {
    lastX = event.clientX;
    return;
  }

  const distance = event.clientX - lastX;

  if (Math.abs(distance) < minDistance) return;

  const currentDirection = distance > 0 ? "right" : "left";

  if (lastDirection && currentDirection !== lastDirection) {
    directionChanges++;
  }

  lastDirection = currentDirection;
  lastX = event.clientX;

  if (directionChanges >= changesToBlackout) {
    blackout.classList.add("active");

    directionChanges = 0;
    lastDirection = null;
    lastX = null;
  }
});

createBoard();