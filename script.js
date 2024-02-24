// GAMEBOARD

const gameBoard = (function () {
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
  };

  return { getBoard, fillBoard };
})();

// PLAYER

function player(symbol) {
  const board = gameBoard.getBoard();
  const flatBoard = board.flat();
  let hasWon = false;
  let winPosition = "";

  const placeMark = function (cell) {
    index = cell.id.slice(-1) - 1;
    if (!cell.hasChildNodes()) {
      flatBoard[index].push(symbol);
    } else {
      // apply class for red
      cell.classList.add("invalid");
      // setTimeout(removeClass, delay);
      setTimeout(() => cell.classList.remove("invalid"), 150);
    }
  };

  return { placeMark, hasWon, symbol, winPosition };
}

// CONTROLLER

const gameController = (function () {
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
    }
  };

  const checkWin = () => {
    console.log(`checkWin called, activePlayer ${activePlayer.symbol}`);
    // check for filled rows
    for (i = 0; i < 3; i++) {
      row = board[i];
      rowValues = row.join("");
      if (rowValues == "XXX" || rowValues == "OOO") {
        activePlayer.hasWon = true;
        activePlayer.winPosition = `row${i}`;
      }
    }
    // check for filled columns
    for (i = 0; i < 3; i++) {
      columns = [];
      for (row of board) {
        columns.push(row[i]);
      }
      colValues = columns.join("");
      if (colValues == "XXX" || colValues == "OOO") {
        activePlayer.hasWon = true;
        activePlayer.winPosition = `col${i}`;
      }
    }
    // check for diagonals
    diagonal1 = [].concat(board[0][0], board[1][1], board[2][2]);
    diagonal2 = [].concat(board[0][2], board[1][1], board[2][0]);
    if (
      diagonal1.join("") == "XXX" ||
      diagonal1.join("") == "OOO"
    ) {
      activePlayer.hasWon = true;
      activePlayer.winPosition = "diagonal1";
    } else if (
      diagonal2.join("") == "XXX" ||
      diagonal2.join("") == "OOO"
    ) {
      activePlayer.hasWon = true;
      activePlayer.winPosition = "diagonal2";
    }
  };

  return { getActivePlayer, switchPlayer, checkWin };
})();

// DOM
const DOMController = (function () {
  const grid = document.getElementById("grid");
  cells = grid.children;

  const renderBoard = (board) => {
    let flatBoard = board.flat();
    for (i = 0; i < cells.length; i++) {
      cells[i].innerText = flatBoard[i];
    }
  };

  const markCell = (event) => {
    player = gameController.getActivePlayer();
    player.placeMark(event.target);
    renderBoard(gameBoard.getBoard());
    gameController.checkWin();
    if (player.hasWon) {
      markWin(player);
      showModal(player);
      grid.classList.add("game-over");
    }
    gameController.switchPlayer();
  };

  const markWin = (player) => {
    winLine = player.winPosition.slice(0,3);
    winIndex = player.winPosition.slice(-1);
    winningCells = [];
    if (winLine == "row") {
      if (winIndex == 0) {
        winningCells.push(0, 1, 2);
      } else if (winIndex == 1) {
        winningCells.push(3, 4, 5);
      } else {
        winningCells.push(6, 7, 8);
      }
    } else if (winLine == "col") {
      if (winIndex == 0) {
        winningCells.push(0, 3, 6);
      } else if (winIndex == 1) {
        winningCells.push(1, 4, 7);
      } else {
        winningCells.push(2, 5, 8);
      }
    } else {
      if (winIndex == 1) {
        winningCells.push(0, 4, 8);
      } else {
        winningCells.push(6, 4, 2);
      } 
    }
    for (cell of winningCells) {
      cells[cell].classList.add("win");
    }
  }

  const showModal = (activePlayer) => {
    modal = document.getElementById("modal");
    text = document.getElementById("modal-text");
    modal.classList.add("active");
    text.innerText = `Player ${activePlayer.symbol} has won!`;
  }

  const addEventListeners = (cells) => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", markCell);
    }
  };

  return { addEventListeners };
})();

DOMController.addEventListeners(cells);