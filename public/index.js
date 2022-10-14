import ticTacToe from "./tic-tac-toe.js";

const board = new ticTacToe(); // INITIALIZE BOARD
let givenUp = false;

/***********************************HELPER FUNCTIONS*****************************************/ 

function populateTiles() {
  const mainBoard = document.getElementById("main-board");

  let tileNum = 0;

  board.board.forEach((row, i) => {
    row.forEach((tile, j) => {
      tileNum++;
      const coordinate = `${i}-${j}`;

      const tileDiv = document.createElement("div");
      tileDiv.setAttribute("class", "tile");
      tileDiv.setAttribute("id", `tile-${tileNum}`);
      tileDiv.setAttribute("data-coordinate", coordinate);

      mainBoard.appendChild(tileDiv);
    });
  });
}

function enableNewGame() {
  const newGameButton = document.getElementById("new-game");
  newGameButton.classList.add("enabled");
  newGameButton.classList.remove("disabled");
}

function disableNewGame() {
  const newGameButton = document.getElementById("new-game");
  newGameButton.classList.add("disabled");
  newGameButton.classList.remove("enabled");
}

function enableGiveUp() {
  const giveUpButton = document.getElementById("give-up");
  giveUpButton.classList.add("enabled");
  giveUpButton.classList.remove("disabled");
}

function disableGiveUp() {
  const giveUpButton = document.getElementById("give-up");
  giveUpButton.classList.add("disabled");
  giveUpButton.classList.remove("enabled");
}

function setWinOrTie() {
  const banner = document.getElementById("display-win-or-tie");
  let unhide = false;

  if (board.hasWinner()) {
    const winner = (board.turn === "x")
      ? "Player X"
      : "Player O";

    banner.innerText = `${winner} win!`;
    unhide = true;
  } else if (board.isTie()) {
    banner.innerText = "It's a tie!"
    unhide = true;
  }

  if (unhide) {
    banner.classList.remove("hidden");
    enableNewGame();
    disableGiveUp();
  }
}

function resetTiles() {
  const tiles = document.getElementsByClassName("tile");

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].innerHTML = "";
  }
}

/***********************************EVENT LISTENERS******************************************/ 

window.addEventListener("DOMContentLoaded", event => {
  populateTiles();

  document.getElementById("main-board").addEventListener("click", event => {
    const coordinate = event.target.dataset.coordinate;
    const [row, col] = coordinate.split("-").map(i => parseInt(i));

    if (board.isEmptyTile(row, col) && !board.hasWinner() && !board.isTie() && !givenUp) {
      // create new icon
      const icon = document.createElement("object");
      icon.setAttribute("class", "icon");
      (board.turn === "x")
        ? icon.setAttribute("data", "./icons/player-x.svg")
        : icon.setAttribute("data", "./icons/player-o.svg");

      board.hit(row, col);
      event.target.appendChild(icon);

      // Check Win or Tie state
      setWinOrTie();

      board.changeTurn(); // will only trigger if there's no win or tie yet
    }
  });

  document.getElementById("new-game").addEventListener("click", event => {
    if (event.currentTarget.classList.contains("disabled")) return;
    
    board.reset();
    document.getElementById("display-win-or-tie").classList.add("hidden");
    resetTiles();
    disableNewGame();
    enableGiveUp();
    givenUp = false;
  });

  document.getElementById("give-up").addEventListener("click", event => {
    if (event.currentTarget.classList.contains("disabled")) return;

    const winner = board.turn === "x"
      ? "Player O"
      : "Player X";

    const banner = document.getElementById("display-win-or-tie");
    banner.innerText = `${winner} win!`;
    banner.classList.remove("hidden");

    givenUp = true;
    enableNewGame();
  });
});