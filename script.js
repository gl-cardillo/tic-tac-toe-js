const TicTacToe = (() => {
  const player1 = "X";
  const player2 = "0";
  let board = new Array(9);
  let counter = 0;
  let play = true;

  const gameBoard = () => {
    const getField = (num) =>
      document.querySelector(`.gameboard button:nth-child(${num})`);

    const selectField = (player, num) => {
      const field = getField(num);
      field.classList.add("symbol");
      if (board[num] === undefined) {
        field.textContent = player;
        board[num] = field.textContent;
      } else {
        counter--;
        return;
      }
    };

    return { selectField, getField };
  };
  const field = gameBoard();

  const game = (id) => {
    if (play) {
      if (counter % 2 === 0) {
        field.selectField(player1, id);
        checkWinner();
        counter++;
      } else {
        field.selectField(player2, id);
        checkWinner();
        counter++;
      }
    }
  };

  const checkWinner = () => {
    if (counter > 3) {
      if (
        board[1] !== undefined &&
        ((board[1] === board[2] && board[2] === board[3]) ||
          (board[1] === board[4] && board[4] === board[7]) ||
          (board[1] === board[5] && board[5] === board[9]))
      ) {
        endGame(board[1]);
      } else if (
        board[6] !== undefined &&
        ((board[6] === board[5] && board[5] === board[4]) ||
          (board[6] === board[3] && board[6] === board[9]))
      ) {
        endGame(board[6]);
      } else if (
        board[7] !== undefined &&
        ((board[7] === board[8] && board[8] === board[9]) ||
          (board[7] === board[5] && board[5] === board[3]))
      ) {
        endGame(board[7]);
      } else if (
        board[2] !== undefined &&
        board[2] === board[5] &&
        board[5] === board[8]
      ) {
        endGame(board[2]);
      } else if (counter === 8) {
        endGame();
      }
    }
  };

  const endGame = (player) => {
    play = false;
    if (player) {
      winnerText.textContent = `${player} is the winner!`;
    } else {
      winnerText.textContent = "It's a tie!";
    }
  };

  const restart = () => {
    for (let i = 1; i < board.length; i++) {
      board[i] = undefined;
      field.getField(i).textContent = "";
    }
    winnerText.textContent = "";
    counter = 0;
    play = true;
  };

  const winnerText = document.querySelector(".winner");

  const gameboard = document.querySelector(".gameboard");
  gameboard.addEventListener("click", (e) => game(e.target.id));

  const restartButton = document.querySelector(".restart");
  restartButton.addEventListener("click", restart);
})();
