function minimaxSearch(node, player, boardState) {
  boardState[node[0]][node[1]] = player;

  console.log(JSON.stringify(boardState), JSON.stringify(node), player);

  if (isBoardFull(boardState)) {
    return evaluate(boardState);
  }

  var bestValue = player === 1 ? -20 : 20;

  for (var i = 0; i < boardState.length; i++) {
    for (var j = 0; j < boardState.length; j++) {
      if (boardState[i][j] === 0) {
        var nextPlayer = player === 1 ? 2 : 1
        var value = minimaxSearch([i,j], nextPlayer, boardState);
        bestValue = player === 1 ? Math.max(value, bestValue) : Math.min(value, bestValue);
      }
    }
  }

  boardState[node[0]][node[1]] = 0;
  return bestValue;

}

function isBoardFull(boardState) {
  for (var i = 0; i < boardState.length; i++) {
    for (var j = 0; j < boardState.length; j++) {
      if (boardState[i][j] === 0) {
        return false;
      }
    }
  }

  return true;
}

function evaluateRows(boardState) {
  var numO = 0;
  var numX = 0;

  for (var i = 0; i < boardState.length; i++) {

    numO = 0;
    numX = 0;

    for (var j = 0; j < boardState[i].length; j++) {
      if (boardState[i][j] === 1) {
        numX += 1;
      } else if (boardState[i][j] === 2) {
        numO += 1
      }
    }

    if (numX === 3) {
      return 10;
    } else if (numO === 3) {
      return -10;
    }
  }

  return 0;
}

function evaluateColumns(boardState) {
  var numO = 0;
  var numX = 0;

  for (var i = 0; i < boardState.length; i++) {

    numO = 0;
    numX = 0;

    for (var j = 0; j < boardState.length; j++) {
      if (boardState[j][i] === 1) {
        numX += 1;
      } else if (boardState[j][i] === 2) {
        numO += 1
      }
    }

    if (numX === 3) {
      return 10;
    } else if (numO === 3) {
      return -10;
    }
  }

  return 0;
}

function evaluateDiagonals(boardState) {
  var numO = 0;
  var numX = 0;

  for (var i = 0; i < boardState.length; i++) {
    if (boardState[i][i] === 1) {
      numX += 1;
    } else if (boardState[i][i] === 2) {
      numO += 1
    }
  }

  if (numX === 3) {
    return 10;
  } else if (numO === 3) {
    return -10;
  }

  numO = 0;
  numX = 0;

  for (var i = 0; i < boardState.length; i++) {
    if (boardState[i][2-i] === 1) {
      numX += 1;
    } else if (boardState[i][2-i] === 2) {
      numO += 1
    }
  }

  if (numX === 3) {
    return 10;
  } else if (numO === 3) {
    return -10;
  }

  return 0;

}

function evaluate(boardState) {
  var rows = evaluateRows(boardState);
  if (rows != 0) {
    return rows;
  }

  var columns = evaluateColumns(boardState);
  if (columns != 0) {
    return columns
  }

  return evaluateDiagonals(boardState);

}

var minimax = {
  getNextMove: function(player, boardState) {
    var bestMove = [];

    console.log(JSON.stringify(boardState));

    if (player === 1) {
      var bestValue = -20;

      for (var i = 0; i < boardState.length; i++) {
        for (var j = 0; j < boardState.length; j++) {
          if (boardState[i][j] === 0) {
            var value = minimaxSearch([i,j], 1, boardState);
            if (value > bestValue) {
              bestMove = [i,j];
              bestValue = value;
            }
          }
        }
      }

    } else if (player === 2) {
      var bestValue = 20;

      for (var i = 0; i < boardState.length; i++) {
        for (var j = 0; j < boardState.length; j++) {
          if (boardState[i][j] === 0) {
            var value = minimaxSearch([i,j], 2, boardState);
            if (value < bestValue) {
              bestMove = [i,j];
              bestValue = value;
            }
          }
        }
      }

    }

    return bestMove;

  },
  isEndGame: function(boardState) {
    return evaluate(boardState);
  }
}

module.exports = minimax;
