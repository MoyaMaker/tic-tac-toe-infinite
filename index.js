const result = document.getElementById("result");
const board = document.querySelector(".board");
let gameOver = false;
let turn = "❌";
let digitalBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let player1 = [];
let player2 = [];

function move(rowIndex, colIndex) {
  if (gameOver) return;

  digitalBoard[rowIndex][colIndex] = turn;

  if (turn === "❌") {
    if (player1.length >= 3) {
      const row = player1[0][0];
      const col = player1[0][1];

      digitalBoard[row][col] = "";

      player1.shift();
    }

    player1.push([rowIndex, colIndex]);
  } else if (turn === "⭕") {
    if (player2.length >= 3) {
      const row = player2[0][0];
      const col = player2[0][1];

      digitalBoard[row][col] = "";

      player2.shift();
    }

    player2.push([rowIndex, colIndex]);
  }

  const winner = checkWinner();

  draw();

  if (winner) {
    result.innerHTML = `${winner} ganó!`;
    gameOver = true;
    return;
  }

  turn = turn === "❌" ? "⭕" : "❌";
}

function draw() {
  board.innerHTML = "";
  digitalBoard.forEach((row, i) => {
    row.forEach((content, j) => {
      const lastPosition = turn !== "❌" ? getLast(player1) : getLast(player2);
      const lastOne = lastPosition
        ? lastPosition[0] === i && lastPosition[1] === j
        : false;

      board.innerHTML += `<button ${content ? "disabled" : ""} class="${
        lastOne ? "last-one" : ""
      }" type="button" onclick="move(${i},${j})">${content}</button>`;
    });
  });
}

function getLast(player) {
  if (player.length >= 3) {
    return player[0];
  }
}

function checkWinner() {
  // Verificar filas
  for (let i = 0; i < 3; i++) {
    if (
      digitalBoard[i][0] === digitalBoard[i][1] &&
      digitalBoard[i][1] === digitalBoard[i][2] &&
      digitalBoard[i][0] !== ""
    ) {
      return digitalBoard[i][0];
    }
  }

  // Verificar columnas
  for (let i = 0; i < 3; i++) {
    if (
      digitalBoard[0][i] === digitalBoard[1][i] &&
      digitalBoard[1][i] === digitalBoard[2][i] &&
      digitalBoard[0][i] !== ""
    ) {
      return digitalBoard[0][i];
    }
  }

  // Verificar diagonales
  if (
    digitalBoard[0][0] === digitalBoard[1][1] &&
    digitalBoard[1][1] === digitalBoard[2][2] &&
    digitalBoard[0][0] !== ""
  ) {
    return digitalBoard[0][0];
  }
  if (
    digitalBoard[0][2] === digitalBoard[1][1] &&
    digitalBoard[1][1] === digitalBoard[2][0] &&
    digitalBoard[0][2] !== ""
  ) {
    return digitalBoard[0][2];
  }

  // No hay ganador
  return null;
}

function reset() {
  result.innerHTML = `Gato infinito`;
  gameOver = false;
  turn = "❌";
  digitalBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player1 = [];
  player2 = [];

  draw();
}
