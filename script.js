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
  // get board
  const getBoard = () => board;

  // fill board (for testing)
  const fillBoard = () => {
    let symbol = "X";
    for (let row of board) {
      for (let col of row) {
        col.push(symbol);
        if (symbol == "X") {
          symbol = "O";
        } else if (symbol == "O") {
          symbol = "X";
        }
      }
    }
  }

  return { printBoard, getBoard, fillBoard };
})();

// PLAYER

function player(symbol) {
  const board = gameBoard.getBoard();
  const flatBoard = board.flat();
  let hasWon = false;

  const placeMark = function(cell) {
    index = (cell.id.slice(-1) - 1);
    console.log(index);
    if (!(cell.hasChildNodes())) {
      flatBoard[index].push(symbol);
    } else {
      // apply class for red
      cell.classList.add("invalid");
      // setTimeout(removeClass, delay);
      setTimeout((() => cell.classList.remove("invalid")), 150);
    }
  }

  return { placeMark, hasWon, symbol };
}

// CONTROLLER

const gameController = (function() {
  const player1 = player("X");
  const player2 = player("O");
  const board = gameBoard.getBoard();

  let activePlayer = player1;

  const getActivePlayer = () => activePlayer;
  const switchPlayer = () => {
    if (activePlayer == player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    };
  };
  const newRound = () => gameBoard.printBoard();
  const winMessage = () => alert("You won!");
  const checkWin = () => {
    // check for filled rows
    for (row of board) {
      rowValues = row.join('');
      if ((rowValues == ("XXX")) || (rowValues == ("OOO"))) {
        activePlayer.hasWon = true;
        winMessage();
    }
    }
    // check for filled columns
    for (i = 0; i < 3; i ++) {
      columns = []
      for (row of board) {
        columns.concat(row[i]);
      }
      colValues = columns.join('');
      if ((colValues == ("XXX")) || (colValues == ("OOO"))) {
        activePlayer.hasWon = true;
        winMessage();
      }
    }
    // check for diagonals
    diagonal1 = [].concat(board[0][0], board[1][1], board[2][2]);
    diagonal2 = [].concat(board[0][2], board[1][1], board[2][0]);
    if (
      (diagonal1.join('') == "XXX") || (diagonal1.join('') == "OOO") 
      || 
      (diagonal2.join('') == "XXX") || (diagonal2.join('') == "OOO")
      ) {
      activePlayer.hasWon = true;
      winMessage();
    }
  }

  const playRound = () => {
    activePlayer.placeMark();
    newRound();
    checkWin();
    switchPlayer();
  }
  return { board, getActivePlayer, switchPlayer, newRound, playRound }
})();

// DOM
const DOMController = (function() {
  const grid = document.getElementById("grid");
  cells = grid.children;

  const renderBoard = (board) => {
    let flatBoard = board.flat();
    for (i = 0; i < cells.length; i++) {
      console.log(i);
      cells[i].innerText = flatBoard[i];
    }
  }

  return { grid, cells, renderBoard };
})();

player = gameController.getActivePlayer();

const markCell = (event) => {
  console.log("Cell Clicked");
  console.log(event.target);
  player.placeMark(event.target);
  DOMController.renderBoard(gameBoard.getBoard());
}

for (let i = 0; i < cells.length; i++) {
  console.log(cells[i]);
  cells[i].addEventListener("click", markCell);
}

// TESTING

// gameBoard.printBoard();