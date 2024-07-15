let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let backBtn = document.querySelector("#back-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let playerTurn = true; // true for player, false for bot
let count = 0; // To Track Draw

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = ["", "", "", "", "", "", "", "", ""];

const resetGame = () => {
  playerTurn = true;
  count = 0;
  board = ["", "", "", "", "", "", "", "", ""];
  enableBoxes();
  msgContainer.classList.add("hide");
  showButtons();
};

const showButtons = () => {
  resetBtn.style.display = "inline-block";
  backBtn.style.display = "inline-block";
};

const hideButtons = () => {
  resetBtn.style.display = "none";
  backBtn.style.display = "none";
};

const botMove = () => {
  let move = getBestMove();
  if (move !== -1) {
    setTimeout(() => {
      boxes[move].innerText = "O";
      boxes[move].disabled = true;
      board[move] = "O";
      count++;
      playerTurn = true;
      checkGameStatus();
    }, 500);
  }
};

const getBestMove = () => {
  // Try to win
  let winMove = checkForWinOrBlock("O");
  if (winMove !== -1) return winMove;

  // Block player's win
  let blockMove = checkForWinOrBlock("X");
  if (blockMove !== -1) return blockMove;

  // Take center if available
  if (board[4] === "") return 4;

  // Take a corner
  let corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (board[corner] === "") return corner;
  }

  // Take any available space
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") return i;
  }

  return -1; // No moves available
};

const checkForWinOrBlock = (player) => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (board[a] === player && board[b] === player && board[c] === "") return c;
    if (board[a] === player && board[c] === player && board[b] === "") return b;
    if (board[b] === player && board[c] === player && board[a] === "") return a;
  }
  return -1;
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (playerTurn && box.innerText === "") {
      box.innerText = "X";
      box.disabled = true;
      board[index] = "X";
      count++;
      checkGameStatus();
      
      if (!checkWinner() && count < 9) {
        playerTurn = false;
        botMove();
      }
    }
  });
});

const checkGameStatus = () => {
  let isWinner = checkWinner();
  if (count === 9 && !isWinner) {
    gameDraw();
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  hideButtons();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, ${winner === 'X' ? 'You win!' : 'Bot wins!'}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  hideButtons();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showWinner(board[a]);
      return true;
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
backBtn.addEventListener("click", () => {
  console.log("Navigating to home page");
  // Add your logic here to navigate to the home page
});

// Initialize the game
resetGame();