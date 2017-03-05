var React = require('react');
var Board = require('../components/Board');

var BoardContainer = React.createClass({
  handleClick: function(i, event) {
    alert(i);
  },
  getInitialState: function() {
    return {
      status: [0,0,0,0,0,0,0,0,0]
    }
  },
  render: function() {
    return (
      <Board status={this.state.status}
             onClick={this.handleClick} />
    )
  }
});

module.exports = BoardContainer;
