let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let backBtn = document.querySelector('#back-btn');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let currentPlayer = "X";
let count = 0;
let gameActive = true;

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

const resetGame = () => {
  currentPlayer = "X";
  count = 0;
  gameActive = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.innerText = "Winner";
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

boxes.forEach((box) => {
  box.addEventListener("click", () => handleBoxClick(box));
});

const handleBoxClick = (box) => {
  if (box.innerText === "" && gameActive) {
    box.innerText = currentPlayer;
    count++;
    
    if (checkWinner()) {
      endGame(`Congratulations, Winner is ${currentPlayer}`);
    } else if (count === 9) {
      endGame("Game was a Draw.");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
};

const endGame = (message) => {
  gameActive = false;
  msg.innerText = message;
  msgContainer.classList.remove("hide");
  hideButtons();
};

const checkWinner = () => {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return boxes[a].innerText &&
           boxes[a].innerText === boxes[b].innerText &&
           boxes[a].innerText === boxes[c].innerText;
  });
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

backBtn.addEventListener("click", () => {
  console.log("Navigating to home page");
});

// Initialize the game
resetGame();