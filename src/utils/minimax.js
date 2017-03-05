function minimax(node, player, boardState) {
  boardState[node[0], node[1]] = player;

  if (isBoardFull(boardState)) {
    return evaluate(boardState);
  }

  if (player === 1) {
    var bestValue = -20;

    for (var i = 0; i < boardState.length; i++) {
      for (var j = 0; j < boardState.length; j++) {
        if (boardState[i][j] === 0) {
          var value = minimax([i,j], 2, boardState);
          bestValue = Math.max(value, bestValue);
        }
      }
    }

    return bestValue;

  } else if (player === 2) {
    var bestValue = 20;

    for (var i = 0; i < boardState.length; i++) {
      for (var j = 0; j < boardState.length; j++) {
        if (boardState[i][j] === 0) {
          var value = minimax([i,j], 1, boardState);
          bestValue = Math.min(value, bestValue);
        }
      }
    }

    return bestValue;
  } else {
    console.warn("There was en error in minimax: Player can only be 1 or 2");
  }


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

function evaluate(boardState) {

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

  numO = 0;
  numX = 0;

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

  numO = 0;
  numX = 0;

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

var minimax = {
  getNextMove: function(player, boardState) {
    var bestMove = [];

    if (player === 1) {
      var bestValue = -20;

      for (var i = 0; i < boardState.length; i++) {
        for (var j = 0; j < boardState.length; j++) {
          if (boardState[i][j] === 0) {
            var value = minimax([i,j], 2, boardState);
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
            var value = minimax([i,j], 1, boardState);
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
