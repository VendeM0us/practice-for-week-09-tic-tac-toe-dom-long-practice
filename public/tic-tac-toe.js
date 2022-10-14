// Your code here
export default class ticTacToe {
  constructor() {
    this.board = 
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ]
    this.turn = "x";
  }

  changeTurn() {
    this.turn = this.turn === "x"
    ? "o"
    : "x";
  }

  hasHorizontalWin() {
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      const checkLetter = this.board[i][0];
      let hasWin = true;

      for (let j = 1; j < row.length; j++) {
        const letter = this.board[i][j];

        if (letter !== checkLetter || letter === "") {
          hasWin = false;
          break;
        }
      }

      if (hasWin) return true;
    }

    return false;
  }

  hasVerticalWin() {
    for (let i = 0; i < this.board[0].length; i++) {
      const checkLetter = this.board[0][i];
      let hasWin = true;

      for (let j = 1; j < this.board.length; j++) {
        const letter = this.board[j][i];
        if (letter !== checkLetter || letter === "") {
          hasWin = false;
          break;
        }
      }

      if (hasWin) return true;
    }

    return false;
  }

  hasLeftDiagonalWin() {
    let col = 0;
    const checkLetter = this.board[0][0];
    let hasWin = true;

    for (let i = 1; i < this.board.length; i++) {
      col++;
      const letter = this.board[i][col];

      if (letter !== checkLetter || letter === "") {
        hasWin = false;
        break;
      }
    }

    return hasWin;
  }

  hasRightDiagonalWin() {
    let col = this.board[0].length - 1;
    const checkLetter = this.board[0][col];
    let hasWin = true;

    for (let i = 1; i < this.board.length; i++) {
      col--;
      const letter = this.board[i][col];

      if (letter !== checkLetter || letter === "") {
        hasWin = false;
        break;
      }
    }

    return hasWin;
  }

  hasWinner() {
    return this.hasHorizontalWin()
      || this.hasVerticalWin()
      || this.hasLeftDiagonalWin()
      || this.hasRightDiagonalWin()
  }

  isTie() {
    if (this.hasWinner()) return false;

    return this.board.every(row => {
      return row.every(tile => {
        return tile !== "";
      })
    });
  }

  isEmptyTile(row, col) {
    return this.board[row][col] === "";
  }

  hit(row, col) {
    if (this.isEmptyTile(row, col)) {
      this.board[row][col] = this.turn;
    }
  }

  reset() {
    this.board = 
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
  this.turn = "x";
  }
}