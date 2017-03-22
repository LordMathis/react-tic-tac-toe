var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var PropTypes = React.PropTypes;

function EndGameModal(props) {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title">Game over</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.endGameString}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onPlayAgain}>Play again</Button>
            </Modal.Footer>
        </Modal>
    )
}

EndGameModal.propTypes = {
    show: PropTypes.bool.isRequired,
    endGameString: PropTypes.string.isRequired,
    onPlayAgain: PropTypes.func.isRequired
}

module.exports = EndGameModal;
