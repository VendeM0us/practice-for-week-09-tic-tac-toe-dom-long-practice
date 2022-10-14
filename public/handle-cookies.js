const dayToSec = 60 * 60 * 24;
const maxAge = `;max-age=${dayToSec}`;

function getCookieValue(targetKey) {
  if (!document.cookie) return;

  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");

    if (key === targetKey) return value;
  }
}

function updateBanner() {
  const banner = document.getElementById("display-win-or-tie");
  const winner = banner.dataset.winner;
  const hideBanner = banner.classList.contains("hidden") ? true : false;

  document.cookie = `winner=${winner}` + maxAge;
  document.cookie = `hideWinnerBanner=${hideBanner}` + maxAge;
}

function restoreBanner() {
  const hideBanner = getCookieValue("hideWinnerBanner");

  if (hideBanner === "false") {
    const winner = getCookieValue("winner");
    const banner = document.getElementById("display-win-or-tie");
    
    winner === "tie"
      ? banner.innerText = "It's a tie!"
      : banner.innerText = `${winner} win!`;
    
    banner.classList.remove("hidden");
  }
}

function updateBoard(board) {
  board = JSON.stringify(board.board);
  document.cookie = `board=${board}` + maxAge;
}

function restoreBoard(mainBoard) {
  const boardStr = getCookieValue("board");

  if (boardStr) {
    const board = JSON.parse(boardStr);
    mainBoard.board = board;

    const tiles = document.getElementById("main-board").children;
  
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      const [row, col] = tile.dataset.coordinate.split("-").map(i => parseInt(i));
  
      const val = board[row][col];
  
      if (val) {
        const icon = document.createElement("object");
        icon.setAttribute("class", "icon");
        (val === "x")
          ? icon.setAttribute("data", "./icons/player-x.svg")
          : icon.setAttribute("data", "./icons/player-o.svg");
  
        tile.appendChild(icon);
      }
    }
  }
}

function updateTurn(board) {
  document.cookie = `turn=${board.turn}` + maxAge;
}

function restoreTurn(board) {
  const turn = getCookieValue("turn");

  if (turn) board.turn = turn;
}

function updateNewGameBtn() {
  const newGame = document.getElementById("new-game").getAttribute("class");
  document.cookie = `newGame=${newGame}` + maxAge;
}

function restoreNewGameBtn() {
  const newGame = document.getElementById("new-game");
  const val = getCookieValue("newGame");

  if (val)
    newGame.setAttribute("class", val);
}

function updateGiveUpBtn() {
  const giveUp = document.getElementById("give-up").getAttribute("class");
  document.cookie = `giveUp=${giveUp}` + maxAge;
}

function restoreGiveUpBtn() {
  const giveUp = document.getElementById("give-up");
  const val = getCookieValue("giveUp");

  if (val)
    giveUp.setAttribute("class", val);
}

export function updateGameState(board) {
  updateBanner();
  updateBoard(board);
  updateTurn(board);
  updateNewGameBtn()
  updateGiveUpBtn();
}

export function restoreGameState(board) {
  restoreBanner();
  restoreBoard(board);
  restoreTurn(board);
  restoreNewGameBtn();
  restoreGiveUpBtn();
}

export function reset() {
  if (document.cookie) {
    const cookies = document.cookie.split("; ");

    cookies.forEach(cookie => {
      const key = cookie.split("=")[0];
      document.cookie = `${key}=; max-age=0`;
    });
  }
}