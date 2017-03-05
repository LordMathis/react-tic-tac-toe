var React = require('react');
var PropTypes = React.PropTypes;

function Node(props) {

  var displayed;
  if (props.status === 0) {
    displayed = "";
  } else if (props.status === 1) {
    displayed = "X";
  } else if (props.status === 2) {
    displayed = "O"
  }

  return (
    <div className="node" onClick={props.onClick}>
      {displayed}
    </div>
  )
}

function Board(props) {

  var nodesArray = [0,1,2,3,4,5,6,7,8];

  var nodes = nodesArray.map(function(node) {
    return <Node key={node} status={props.status[node]} onClick={props.onClick.bind(null, node)}/>
  });

  return (
    <div className="board">
      {nodes}
    </div>
  )
}

Board.propTypes = {
  status: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

module.exports = Board;
