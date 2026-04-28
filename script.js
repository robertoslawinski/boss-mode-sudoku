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
      [2, 6, 9, 3, 7, 8, 1, 4, 5],
      [5, 8, 1, 4, 2, 9, 6, 7, 3],
      [4, 7, 3, 5, 6, 1, 2, 9, 8],
      [6, 9, 4, 8, 3, 2, 5, 1, 7],
      [8, 1, 2, 7, 4, 5, 9, 3, 6],
      [3, 5, 7, 1, 9, 6, 8, 2, 4],
      [1, 3, 5, 9, 8, 4, 7, 6, 2],
      [7, 2, 8, 6, 1, 3, 4, 5, 9],
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
const eraseBtn = document.getElementById("eraseBtn");
const newGameBtn = document.getElementById("newGameBtn");
const checkBtn = document.getElementById("checkBtn");
const blackout = document.getElementById("blackout");
const restoreBtn = document.getElementById("restoreBtn");
const bossModeBtn = document.getElementById("bossModeBtn");
const themeToggle = document.getElementById("themeToggle");
const themeToggleText = document.getElementById("themeToggleText");
const playNowBtn = document.getElementById("playNowBtn");
const leaderboardList = document.getElementById("leaderboardList");
const clearLeaderboardBtn = document.getElementById("clearLeaderboardBtn");
const streakText = document.getElementById("streakText");
const shareBtn = document.getElementById("shareBtn");
const gameCard = document.querySelector(".game-card");

let selectedCell = null;
let selectedIndex = null;
let errors = 0;
let seconds = 0;
let timerInterval = null;
let timerPausedByBossMode = false;
let gameSolved = false;

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggleText.textContent = isDark ? "Light" : "Dark";
}

function loadTheme() {
  const savedTheme = localStorage.getItem("bossModeSudokuTheme") || "light";
  applyTheme(savedTheme);
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark-mode")
    ? "light"
    : "dark";

  localStorage.setItem("bossModeSudokuTheme", nextTheme);
  applyTheme(nextTheme);
}

function hasDigitsOneToNine(values) {
  return (
    values.length === 9 &&
    new Set(values).size === 9 &&
    values.every((value) => value >= 1 && value <= 9)
  );
}

function validatePuzzleSet({ puzzle, solution }, puzzleIndex) {
  const label = `Puzzle ${puzzleIndex + 1}`;

  if (!Array.isArray(puzzle) || !Array.isArray(solution)) {
    throw new Error(`${label} must include puzzle and solution grids.`);
  }

  if (puzzle.length !== 9 || solution.length !== 9) {
    throw new Error(`${label} must have 9 rows in both grids.`);
  }

  for (let row = 0; row < 9; row++) {
    if (puzzle[row].length !== 9 || solution[row].length !== 9) {
      throw new Error(`${label} row ${row + 1} must have 9 columns.`);
    }

    if (!hasDigitsOneToNine(solution[row])) {
      throw new Error(`${label} solution row ${row + 1} is invalid.`);
    }
  }

  for (let col = 0; col < 9; col++) {
    const column = solution.map((row) => row[col]);

    if (!hasDigitsOneToNine(column)) {
      throw new Error(`${label} solution column ${col + 1} is invalid.`);
    }
  }

  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      const block = [];

      for (let row = blockRow * 3; row < blockRow * 3 + 3; row++) {
        for (let col = blockCol * 3; col < blockCol * 3 + 3; col++) {
          block.push(solution[row][col]);
        }
      }

      if (!hasDigitsOneToNine(block)) {
        throw new Error(
          `${label} solution block ${blockRow + 1},${blockCol + 1} is invalid.`
        );
      }
    }
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const puzzleValue = puzzle[row][col];
      const solutionValue = solution[row][col];

      if (puzzleValue < 0 || puzzleValue > 9) {
        throw new Error(`${label} puzzle value at ${row + 1},${col + 1} is invalid.`);
      }

      if (puzzleValue !== 0 && puzzleValue !== solutionValue) {
        throw new Error(
          `${label} fixed value at ${row + 1},${col + 1} does not match solution.`
        );
      }
    }
  }
}

function validatePuzzles() {
  if (!Array.isArray(puzzles) || puzzles.length === 0) {
    throw new Error("At least one Sudoku puzzle is required.");
  }

  puzzles.forEach(validatePuzzleSet);
}

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
  timerPausedByBossMode = false;
  gameSolved = false;

  hideShareButton();
  setGameState("playing");

  errorsEl.textContent = "0/3";
  timerEl.textContent = "00:00";
  setMessage("Select a cell to begin.");

  startTimer();

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
  if (board.classList.contains("is-locked")) return;

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

    if (
      row === selectedRow ||
      col === selectedCol ||
      (blockRow === selectedBlockRow && blockCol === selectedBlockCol)
    ) {
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
    placeNumber(Number(button.textContent));
  });
});

function canEditSelectedCell() {
  return (
    selectedCell &&
    !selectedCell.classList.contains("fixed") &&
    !gameSolved &&
    errors < 3
  );
}

function setMessage(text, type = "info") {
  message.textContent = text;
  message.classList.remove("success", "warning", "danger", "info");
  message.classList.add(type);
}

function setGameState(state) {
  gameCard.classList.remove("is-solved", "is-game-over");
  board.classList.remove("is-locked");

  if (state === "solved") {
    gameCard.classList.add("is-solved");
    board.classList.add("is-locked");
    clearHighlights();
  }

  if (state === "game-over") {
    gameCard.classList.add("is-game-over");
    board.classList.add("is-locked");
    clearHighlights();
  }
}

function placeNumber(number) {
  if (!canEditSelectedCell()) return;

  const row = Math.floor(selectedIndex / 9);
  const col = selectedIndex % 9;

  selectedCell.textContent = number;
  selectedCell.classList.remove("error", "correct-pop");

  if (number !== currentSolution[row][col]) {
    selectedCell.classList.add("error");
    errors++;
    errorsEl.textContent = `${errors}/3`;

    if (errors >= 3) {
      setGameState("game-over");
      setMessage("Game over. Start a new game to try again.", "danger");
      pauseTimer();
    } else {
      setMessage(`Wrong number. ${3 - errors} mistake${errors === 2 ? "" : "s"} left.`, "warning");
    }

    return;
  }

  selectedCell.classList.add("correct-pop");
  setMessage("Correct.", "success");

  selectCell(selectedCell, selectedIndex);
  checkIfSolved();
}

function eraseSelectedCell() {
  if (!canEditSelectedCell()) return;

  selectedCell.textContent = "";
  selectedCell.classList.remove("error", "correct-pop");
  setMessage("Cell cleared.");

  selectCell(selectedCell, selectedIndex);
}

function moveSelection(rowOffset, colOffset) {
  if (board.classList.contains("is-locked")) return;
  if (selectedIndex === null) return;

  const currentRow = Math.floor(selectedIndex / 9);
  const currentCol = selectedIndex % 9;
  const nextRow = Math.min(8, Math.max(0, currentRow + rowOffset));
  const nextCol = Math.min(8, Math.max(0, currentCol + colOffset));
  const nextIndex = nextRow * 9 + nextCol;
  const nextCell = board.querySelector(`[data-index="${nextIndex}"]`);

  if (nextCell) {
    selectCell(nextCell, nextIndex);
  }
}

function checkIfSolved() {
  const cells = [...document.querySelectorAll(".cell")];

  const solved = cells.every((cell, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    return Number(cell.textContent) === currentSolution[row][col];
  });

  if (solved && !gameSolved) {
    gameSolved = true;
    setGameState("solved");
    pauseTimer();

    setMessage(`Puzzle solved in ${formatTime(seconds)}.`, "success");

    saveScore(seconds);
    renderLeaderboard();
    updateStreakAfterWin();
    showShareButton();
  }

  return solved;
}

function updateTimer() {
  seconds++;
  timerEl.textContent = formatTime(seconds);
}

function startTimer() {
  pauseTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resumeTimer() {
  if (!timerInterval && !gameSolved && errors < 3) {
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function formatTime(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// SHARE

function showShareButton() {
  shareBtn.classList.remove("hidden");
}

function hideShareButton() {
  shareBtn.classList.add("hidden");
}

async function shareResult() {
  const text =
`I solved Boss Mode Sudoku in ${formatTime(seconds)} \u{1F525}
Can you beat me?
https://bossmodesudoku.netlify.app/`;

  try {
    await navigator.clipboard.writeText(text);
    shareBtn.textContent = "Copied!";
    setTimeout(() => {
      shareBtn.textContent = "Share Result";
    }, 1500);
  } catch {
    alert(text);
  }
}

shareBtn.addEventListener("click", shareResult);

// LEADERBOARD

function getScores() {
  return JSON.parse(localStorage.getItem("bossModeSudokuScores")) || [];
}

function saveScore(time) {
  const scores = getScores();

  scores.push({
    time,
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
    leaderboardList.innerHTML =
      `<p class="leaderboard-empty">No scores yet.</p>`;
    return;
  }

  scores.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = `${formatTime(score.time)} - ${score.date}`;
    leaderboardList.appendChild(li);
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
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

function loadStreak() {
  const streak = Number(localStorage.getItem("bossModeSudokuStreak")) || 0;
  streakText.textContent = `Streak ${streak}`;
}

function updateStreakAfterWin() {
  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  const lastPlayed =
    localStorage.getItem("bossModeSudokuLastPlayed");

  let streak =
    Number(localStorage.getItem("bossModeSudokuStreak")) || 0;

  if (lastPlayed === today) return;

  if (lastPlayed === yesterday) {
    streak++;
  } else {
    streak = 1;
  }

  localStorage.setItem("bossModeSudokuLastPlayed", today);
  localStorage.setItem("bossModeSudokuStreak", streak);

  streakText.textContent = `Streak ${streak}`;
}

// BUTTONS

newGameBtn.addEventListener("click", createBoard);

eraseBtn.addEventListener("click", eraseSelectedCell);

checkBtn.addEventListener("click", () => {
  if (gameCard.classList.contains("is-game-over")) {
    setMessage("Game over. Start a new game to try again.", "danger");
    return;
  }

  if (!checkIfSolved()) {
    setMessage("Not complete yet.", "warning");
  }
});

playNowBtn.addEventListener("click", () => {
  document.querySelector(".game-card").scrollIntoView({
    behavior: "smooth"
  });
});

// BOSS MODE

function activateBossMode() {
  if (blackout.classList.contains("active")) return;

  blackout.classList.add("active");
  timerPausedByBossMode = Boolean(timerInterval);
  pauseTimer();
}

function restoreGame() {
  blackout.classList.remove("active");
  if (timerPausedByBossMode) {
    resumeTimer();
    timerPausedByBossMode = false;
  }
}

bossModeBtn.addEventListener("click", activateBossMode);

restoreBtn.addEventListener("click", restoreGame);

themeToggle.addEventListener("click", toggleTheme);

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (blackout.classList.contains("active")) {
    if (key === "Escape") {
      restoreGame();
    }
    return;
  }

  if (event.ctrlKey || event.metaKey || event.altKey) return;

  if (/^[1-9]$/.test(key)) {
    event.preventDefault();
    placeNumber(Number(key));
    return;
  }

  if (key === "Backspace" || key === "Delete" || key === "0") {
    event.preventDefault();
    eraseSelectedCell();
    return;
  }

  const moves = {
    ArrowUp: [-1, 0],
    ArrowRight: [0, 1],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1]
  };

  if (moves[key]) {
    event.preventDefault();
    moveSelection(...moves[key]);
  }
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

  const direction = distance > 0 ? "right" : "left";

  if (lastDirection && direction !== lastDirection) {
    directionChanges++;
  }

  lastDirection = direction;
  lastX = event.clientX;

  if (directionChanges >= changesToBlackout) {
    activateBossMode();
    directionChanges = 0;
    lastDirection = null;
    lastX = null;
  }
});

validatePuzzles();
loadTheme();
loadStreak();
createBoard();
