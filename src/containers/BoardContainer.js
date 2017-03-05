var React = require('react');
var Board = require('../components/Board');

var BoardContainer = React.createClass({
  getInitialState: function() {
    return {
      status: [0,0,0,0,0,0,0,0,0]
    }
  },
  render: function() {
    return (
      <Board status={this.state.status} />
    )
  }
});

module.exports = BoardContainer;
