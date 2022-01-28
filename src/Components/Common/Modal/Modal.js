import { Modal } from 'react-bootstrap';
import CommonButton from '../Buttons/Buttons';
import './Modal.css';

const CommonModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={props.keyboard} centered>
                <Modal.Header closeButton>
                    <div className="modal-title h4">{props.ModalTitle}</div>
                </Modal.Header>
                <Modal.Body>
                    {props.ModalData}
                </Modal.Body>
                <Modal.Footer>
                    <CommonButton isButton="true" BtnColor="red btn-sm" BtnText="Close" onClick={props.handleClose}/>
                    <CommonButton isButton="true" BtnColor="green btn-sm" BtnText="Submit" onClick={props.handleClose}/>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CommonModal;