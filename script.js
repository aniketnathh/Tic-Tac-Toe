const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');
const resultModal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const playAgainBtn = document.getElementById('playAgainBtn');
const resetBtn = document.getElementById('resetBtn');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let xWins = 0;
let oWins = 0;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    resultText.textContent = `${currentPlayer} Wins!`;
    resultModal.classList.remove('hidden');
    gameOver = true;

    if (currentPlayer === 'X') {
      xWins++;
    } else {
      oWins++;
    }

    updateScore();
    return;
  }

  if (board.every(cell => cell !== '')) {
    resultText.textContent = `It's a Draw!`;
    resultModal.classList.remove('hidden');
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnDisplay.textContent = currentPlayer;
}

function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function updateScore() {
  xWinsDisplay.textContent = xWins;
  oWinsDisplay.textContent = oWins;
}

function resetBoard() {
  board = Array(9).fill('');
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameOver = false;
  turnDisplay.textContent = currentPlayer;
}

function closeModal() {
  resultModal.classList.add('hidden');
  resetBoard();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
playAgainBtn.addEventListener('click', closeModal);
resetBtn.addEventListener('click', resetBoard);
