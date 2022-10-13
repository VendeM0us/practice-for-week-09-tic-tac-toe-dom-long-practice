import ticTacToe from "./tic-tac-toe.js";

const board = new ticTacToe();

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
  }
}

window.addEventListener("DOMContentLoaded", event => {
  populateTiles();

  document.getElementById("main-board").addEventListener("click", event => {
    const coordinate = event.target.dataset.coordinate;
    const [row, col] = coordinate.split("-").map(i => parseInt(i));

    if (board.isEmptyTile(row, col) && !board.hasWinner() && !board.isTie()) {
      const icon = document.createElement("object");
      
      if (board.turn === "x") {
        icon.setAttribute("class", "icon");
        icon.setAttribute("data", "./icons/player-x.svg");
      } else {
        icon.setAttribute("class", "icon");
        icon.setAttribute("data", "./icons/player-o.svg");
      }

      board.hit(row, col);
      event.target.appendChild(icon);

      // Check Win or Tie state
      setWinOrTie();
      board.changeTurn();
    }
  });
});