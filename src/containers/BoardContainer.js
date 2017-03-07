var React = require('react');
var Board = require('../components/Board');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var minimax = require('../utils/minimax');

function computersTurn() {
  var nextMove = minimax.getNextMove(BoardContainer.state.currentPlayer, boardState);
  var index = nextMove[0] * 3 + nextMove[1];
  var currentPlayer = BoardContainer.state.currentPlayer;
  newStatus = BoardContainer.state.status;
  newStatus[index] = currentPlayer;
  BoardContainer.setState({
    status: newStatus,
    currentPlayer: 3 - BoardContainer.state.currentPlayer
  });
}

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
  componentDidMount: function() {

  },
  selectSide: function(side) {
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
    //console.log(boardState);
    var score = minimax.isEndGame(boardState);

    if (score === 0) {
      if (this.state.currentPlayer !== this.state.playerSide) {
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
    //console.log(boardState);
    var nextMove = minimax.getNextMove(this.state.currentPlayer, boardState);

    //console.log(nextMove);

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
  render: function() {
    return (
      <div>
        <Board status={this.state.status}
             onClick={this.handleClick} />

       <Modal
         show={this.state.showStartGame}
         onHide={close}
         container={this}
         aria-labelledby="contained-modal-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title">Select your side</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            X starts first
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={() => this.selectSide(1)}>X</Button>
           <Button onClick={() => this.selectSide(2)}>O</Button>
         </Modal.Footer>
       </Modal>
       <Modal
         show={this.state.showEndGame}
         onHide={close}
         container={this}
         aria-labelledby="contained-modal-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="contained-modal-title">Game over</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {this.state.winner === this.state.playerSide ? "You win!" : "You lose!"}
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={function() {
               this.setState({
                 status: [0,0,0,0,0,0,0,0,0],
                 game: false,
                 currentPlayer: 1,
                 showStartGame: true,
                 showEndGame: false,
                 winner: 0
               });
             }.bind(this)}>Play again</Button>
         </Modal.Footer>
       </Modal>
     </div>
    )
  }
});

module.exports = BoardContainer;
