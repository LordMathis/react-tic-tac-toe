var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

function Home(props) {
  return (
    <div className="col-sm-4 col-sm-offset-4 text-center">
        <p>Choose your token</p>
        <ButtonToolbar>
          <Button bsStyle="success">X</Button>
          <Button bsStyle="info">O</Button>
        </ButtonToolbar>
    </div>
  )
}

module.exports = Home;
