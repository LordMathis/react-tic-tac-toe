var React = require('react');
var Board = require('../components/Board');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var minimax = require('../utils/minimax');

var BoardContainer = React.createClass({
  handleClick: function(i, event) {
    if (this.state.game && (this.state.currentPlayer === this.state.playerSide) && (this.state.status[i] === 0)) {
      var newStatus = this.state.status;
      newStatus[i] = this.state.currentPlayer;
      this.setState({
        status: newStatus,
        currentPlayer: 3 - this.state.currentPlayer
      });

      var boardState = this.convertStatus;
      var score = minimax.isEndGame(boardState);

      if (score === 0) {
        var nextMove = minimax.getNextMove(this.state.currentPlayer, boardState);
        console.log(nextMove);
      }
    }
  },
  convertStatus: function() {
    var state = this.state;
    return [[state[0],state[1],state[2]], [state[3],state[4],state[5]], [state[6],state[7],state[8]]];
  },
  getInitialState: function() {
    return {
      status: [0,0,0,0,0,0,0,0,0],
      game: false,
      currentPlayer: 1,
      show: true
    }
  },
  componentDidMount: function() {

  },
  selectSide: function(side) {
    this.setState({
      playerSide: side,
      show: false,
      game: true
    });
  },
  render: function() {
    return (
      <div>
        <Board status={this.state.status}
             onClick={this.handleClick} />

       <Modal
         show={this.state.show}
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
     </div>
    )
  }
});

module.exports = BoardContainer;
