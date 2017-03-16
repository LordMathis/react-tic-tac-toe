var React = require('react');
var Board = require('../components/Board');
var minimax = require('../utils/minimax');
var ChoiceModal = require('../components/ChoiceModal');
var EndGameModal = require('../components/EndGameModal');

var BoardContainer = React.createClass({
  handleClick: function(i, event) {
    if (this.state.game && (this.state.currentPlayer === this.state.playerSide) && (this.state.status[i] === 0)) {
      this.playersTurn(i);
    }
  },
  convertStatus: function() {
    var status = this.state.status;
    var statusArray = [[status[0],status[1],status[2]], [status[3],status[4],status[5]], [status[6],status[7],status[8]]];
    return statusArray;
  },
  getInitialState: function() {
    return {
      status: [0,0,0,0,0,0,0,0,0],
      game: false,
      currentPlayer: 1,
      showStartGame: true,
      showEndGame: false,
      winner: 0
    }
  },
  handleSelectSide: function(side) {
    this.setState({
      playerSide: side,
      showStartGame: false,
      game: true
    }, function() {
      if (this.state.playerSide !== 1) {
        var boardState = this.convertStatus();
        this.computersTurn(boardState);
      }
    });
  },
  isEndGame: function() {
    var boardState = this.convertStatus();
    var score = minimax.isEndGame(boardState);

    if (score === 0) {
      if (minimax.isBoardFull(boardState)) {
        this.setState({
          winner: 3,
          game: false,
          showEndGame: true
        });
      } else if (this.state.currentPlayer !== this.state.playerSide) {
        this.computersTurn(boardState);
      }
    } else if (score == 10) {
      this.setState({
        winner: 1,
        game: false,
        showEndGame: true
      });
    } else if (score == -10) {
      this.setState({
        winner: 2,
        game: false,
        showEndGame: true
      });
    }
  },
  playersTurn: function(i) {
    var newStatus = this.state.status;
    newStatus[i] = this.state.currentPlayer;
    var nextPlayer = 3 - this.state.currentPlayer;

    this.setState({
      currentPlayer: nextPlayer,
      status: newStatus
    }, function() {
      this.isEndGame();
    });
  },
  computersTurn: function(boardState) {
    var nextMove = minimax.getNextMove(this.state.currentPlayer, boardState);

    var index = nextMove[0] * 3 + nextMove[1];
    var currentPlayer = this.state.currentPlayer;

    newStatus = this.state.status;
    newStatus[index] = currentPlayer;

    this.setState({
      status: newStatus,
      currentPlayer: 3 - this.state.currentPlayer
    }, function() {
      this.isEndGame();
    });
  },
  handlePlayAgain: function() {
    this.setState({
      status: [0,0,0,0,0,0,0,0,0],
      game: false,
      currentPlayer: 1,
      showStartGame: true,
      showEndGame: false,
      winner: 0
    });
  },
  render: function() {
    var endGameString = "";
    if (!this.state.game) {
      if (this.state.winner === 3) {
        endGameString = "It's a draw!";
      } else if (this.state.winner === this.state.playerSide) {
        endGameString = "You win!";
      } else {
        endGameString = "You lose!";
      }
    }

    return (
      <div>
        <Board status={this.state.status}
             onClick={this.handleClick} />

        <ChoiceModal
          show={this.state.showStartGame}
          onSelectSide={this.handleSelectSide}/>


        <EndGameModal
          show={this.state.showEndGame}
          onPlayAgain={this.handlePlayAgain}
          endGameString={endGameString}/>

     </div>
    )
  }
});

module.exports = BoardContainer;
