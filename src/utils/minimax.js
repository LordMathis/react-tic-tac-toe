function minimaxSearch(node, player, boardState, depth) {
  boardState[node[0]][node[1]] = player;

  var currentValue = evaluate(boardState);
  if (currentValue !== 0) {
    boardState[node[0]][node[1]] = 0;
    return currentValue;
  }

  var bestValue = player === 1 ? 20 : -20;

  for (var i = 0; i < boardState.length; i++) {
    for (var j = 0; j < boardState.length; j++) {
      if (boardState[i][j] === 0) {
        var nextPlayer = player === 1 ? 2 : 1
        var value = minimaxSearch([i,j], nextPlayer, boardState, depth + 1);
        //console.log(JSON.stringify(depth), JSON.stringify(value), JSON.stringify(bestValue), JSON.stringify(player), JSON.stringify([i,j]), JSON.stringify(boardState));
        bestValue = player === 1 ? Math.min(value, bestValue) : Math.max(value, bestValue);
      }
    }
  }

  if ((bestValue === 20) || (bestValue === -20)) {
    bestValue = 0;
  }

  boardState[node[0]][node[1]] = 0;
  return bestValue;

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
    var bestValue = player === 1 ? -20 : 20;

    for (var i = 0; i < boardState.length; i++) {
      for (var j = 0; j < boardState.length; j++) {
        if (boardState[i][j] === 0) {
          var value = minimaxSearch([i,j], player, boardState, 1);
          bestValue = player === 1 ? Math.max(value, bestValue) : Math.min(value, bestValue);
          //console.log(JSON.stringify([i,j]), JSON.stringify(bestValue), JSON.stringify(value));

          if (bestValue === value) {
            bestMove = [i,j];
          }
        }
      }
    }
    //console.log(JSON.stringify(bestMove));
    return bestMove;

  },
  isEndGame: function(boardState) {
    return evaluate(boardState);
  },
  isBoardFull: function(boardState) {
    for (var i = 0; i < boardState.length; i++) {
      for (var j = 0; j < boardState.length; j++) {
        if (boardState[i][j] === 0) {
          return false;
        }
      }
    }

    return true;
  }
}

module.exports = minimax;
