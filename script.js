// GAMEBOARD

const gameBoard = (function() {
  const board = [];
  const rows = 3;
  const columns = 3;

  // construct 2d array representing the board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push([]);
    }
  }

  // print board
  const printBoard = () => console.log(board);
})()

// PLAYER

function player(symbol) {
  const symbol = symbol;
  let hasWon = false;
}

// CONTROLLER

const gameController = (function() {
})()

// TESTING

gameBoard.printBoard();