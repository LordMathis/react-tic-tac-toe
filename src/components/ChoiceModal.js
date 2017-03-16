var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var PropTypes = React.PropTypes;

function ChoiceModal(props) {
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title id="contained-modal-title">Select your side</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         X starts first
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.onSelectSide(1)}>X</Button>
        <Button onClick={() => props.onSelectSide(2)}>O</Button>
      </Modal.Footer>
    </Modal>
  )
}

ChoiceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelectSide: PropTypes.func.isRequired
}

module.exports = ChoiceModal;
