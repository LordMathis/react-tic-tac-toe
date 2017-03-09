var React = require('react');
require('../index.css');
var BoardContainer = require('../containers/BoardContainer');

function Main(props) {
  return (
    <div className="container">
      <div className="text-center header">
        <h1 className="font-primary">Tic Tac Toe</h1>
      </div>
      <div className="flex-container">
        <div className="flex-item">
          <BoardContainer/>
        </div>
      </div>
    </div>
  )
}

module.exports = Main;
