const puzzles = [
  {
    puzzle: [
      [0, 6, 0, 3, 0, 8, 1, 0, 0],
      [5, 8, 1, 0, 0, 9, 6, 0, 0],
      [0, 0, 3, 5, 0, 0, 0, 0, 0],
      [0, 9, 0, 8, 0, 2, 0, 0, 0],
      [0, 0, 0, 7, 4, 5, 9, 3, 6],
      [3, 5, 0, 0, 0, 6, 8, 0, 4],
      [1, 3, 5, 0, 0, 0, 0, 0, 0],
      [7, 0, 8, 6, 1, 3, 4, 0, 0],
      [9, 4, 0, 0, 0, 7, 3, 0, 0]
    ],
    solution: [
      [4, 6, 9, 3, 2, 8, 1, 5, 7],
      [5, 8, 1, 4, 7, 9, 6, 2, 3],
      [2, 7, 3, 5, 6, 1, 9, 4, 8],
      [6, 9, 4, 8, 3, 2, 7, 1, 5],
      [8, 1, 2, 7, 4, 5, 9, 3, 6],
      [3, 5, 7, 1, 9, 6, 8, 2, 4],
      [1, 3, 5, 9, 8, 4, 2, 7, 6],
      [7, 2, 8, 6, 1, 3, 4, 9, 5],
      [9, 4, 6, 2, 5, 7, 3, 8, 1]
    ]
  },
  {
    puzzle: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]
  },
  {
    puzzle: [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],
      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],
      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0]
    ],
    solution: [
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 7, 1, 4, 9, 3],
      [1, 9, 7, 8, 3, 4, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 3, 4, 7],
      [3, 7, 4, 6, 8, 2, 9, 1, 5],
      [9, 5, 1, 7, 4, 3, 6, 2, 8],
      [5, 1, 9, 3, 2, 6, 8, 7, 4],
      [2, 4, 8, 9, 5, 7, 1, 3, 6],
      [7, 6, 3, 4, 1, 8, 2, 5, 9]
    ]
  },
  {
    puzzle: [
      [0, 2, 0, 6, 0, 8, 0, 0, 0],
      [5, 8, 0, 0, 0, 9, 7, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 0],
      [3, 7, 0, 0, 0, 0, 5, 0, 0],
      [6, 0, 0, 0, 0, 0, 0, 0, 4],
      [0, 0, 8, 0, 0, 0, 0, 1, 3],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 9, 8, 0, 0, 0, 3, 6],
      [0, 0, 0, 3, 0, 6, 0, 9, 0]
    ],
    solution: [
      [1, 2, 3, 6, 7, 8, 9, 4, 5],
      [5, 8, 4, 2, 3, 9, 7, 6, 1],
      [9, 6, 7, 1, 4, 5, 3, 2, 8],
      [3, 7, 2, 4, 6, 1, 5, 8, 9],
      [6, 9, 1, 5, 8, 3, 2, 7, 4],
      [4, 5, 8, 7, 9, 2, 6, 1, 3],
      [8, 3, 6, 9, 2, 4, 1, 5, 7],
      [2, 1, 9, 8, 5, 7, 4, 3, 6],
      [7, 4, 5, 3, 1, 6, 8, 9, 2]
    ]
  },
  {
    puzzle: [
      [0, 0, 5, 3, 0, 0, 0, 0, 0],
      [8, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 7, 0, 0, 1, 0, 5, 0, 0],
      [4, 0, 0, 0, 0, 5, 3, 0, 0],
      [0, 1, 0, 0, 7, 0, 0, 0, 6],
      [0, 0, 3, 2, 0, 0, 0, 8, 0],
      [0, 6, 0, 5, 0, 0, 0, 0, 9],
      [0, 0, 4, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 9, 7, 0, 0]
    ],
    solution: [
      [1, 4, 5, 3, 2, 7, 6, 9, 8],
      [8, 3, 9, 6, 5, 4, 1, 2, 7],
      [6, 7, 2, 9, 1, 8, 5, 4, 3],
      [4, 9, 6, 1, 8, 5, 3, 7, 2],
      [2, 1, 8, 4, 7, 3, 9, 5, 6],
      [7, 5, 3, 2, 9, 6, 4, 8, 1],
      [3, 6, 7, 5, 4, 2, 8, 1, 9],
      [9, 8, 4, 7, 6, 1, 2, 3, 5],
      [5, 2, 1, 8, 3, 9, 7, 6, 4]
    ]
  }
];

let currentPuzzle = null;
let currentSolution = null;
let lastPuzzleIndex = null;

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
const playNowBtn = document.getElementById("playNowBtn");
const leaderboardList = document.getElementById("leaderboardList");
const clearLeaderboardBtn = document.getElementById("clearLeaderboardBtn");
const streakText = document.getElementById("streakText");

let selectedCell = null;
let selectedIndex = null;
let errors = 0;
let seconds = 0;
let timerInterval = null;
let gameSolved = false;

function chooseRandomPuzzle() {
  let randomIndex = Math.floor(Math.random() * puzzles.length);

  if (puzzles.length > 1) {
    while (randomIndex === lastPuzzleIndex) {
      randomIndex = Math.floor(Math.random() * puzzles.length);
    }
  }

  lastPuzzleIndex = randomIndex;
  currentPuzzle = puzzles[randomIndex].puzzle;
  currentSolution = puzzles[randomIndex].solution;
}

function createBoard() {
  chooseRandomPuzzle();

  board.innerHTML = "";
  selectedCell = null;
  selectedIndex = null;
  errors = 0;
  seconds = 0;
  gameSolved = false;

  errorsEl.textContent = "0/3";
  timerEl.textContent = "00:00";
  message.textContent = "Select a cell to begin.";

  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  currentPuzzle.flat().forEach((value, index) => {
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

  renderLeaderboard();
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
    if (gameSolved) return;

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

    if (number !== currentSolution[row][col]) {
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

    return Number(cell.textContent) === currentSolution[row][col];
  });

  if (solved && !gameSolved) {
    gameSolved = true;
    clearInterval(timerInterval);
    message.textContent = `Puzzle solved in ${formatTime(seconds)}.`;

    saveScore(seconds);
    renderLeaderboard();
    updateStreakAfterWin();
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

playNowBtn.addEventListener("click", () => {
  document.querySelector(".game-card").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

function updateTimer() {
  seconds++;
  timerEl.textContent = formatTime(seconds);
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const remainingSeconds = String(totalSeconds % 60).padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

// LEADERBOARD

function getScores() {
  return JSON.parse(localStorage.getItem("bossModeSudokuScores")) || [];
}

function saveScore(timeInSeconds) {
  const scores = getScores();

  scores.push({
    time: timeInSeconds,
    date: new Date().toLocaleDateString()
  });

  scores.sort((a, b) => a.time - b.time);

  localStorage.setItem(
    "bossModeSudokuScores",
    JSON.stringify(scores.slice(0, 5))
  );
}

function renderLeaderboard() {
  const scores = getScores();

  leaderboardList.innerHTML = "";

  if (scores.length === 0) {
    const empty = document.createElement("p");
    empty.className = "leaderboard-empty";
    empty.textContent = "No scores yet. Solve the puzzle first.";
    leaderboardList.appendChild(empty);
    return;
  }

  scores.forEach((score) => {
    const item = document.createElement("li");
    item.textContent = `${formatTime(score.time)} · ${score.date}`;
    leaderboardList.appendChild(item);
  });
}

clearLeaderboardBtn.addEventListener("click", () => {
  localStorage.removeItem("bossModeSudokuScores");
  renderLeaderboard();
});

// STREAK

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayKey() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

function loadStreak() {
  const streak = Number(localStorage.getItem("bossModeSudokuStreak")) || 0;
  streakText.textContent = `Streak ${streak}`;
}

function updateStreakAfterWin() {
  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  const lastPlayedDate = localStorage.getItem("bossModeSudokuLastPlayed");
  let streak = Number(localStorage.getItem("bossModeSudokuStreak")) || 0;

  if (lastPlayedDate === today) {
    return;
  }

  if (lastPlayedDate === yesterday) {
    streak++;
  } else {
    streak = 1;
  }

  localStorage.setItem("bossModeSudokuLastPlayed", today);
  localStorage.setItem("bossModeSudokuStreak", streak);

  streakText.textContent = `Streak ${streak}`;
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

loadStreak();
createBoard();