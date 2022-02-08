import { Modal } from 'react-bootstrap';
import Button from '../Buttons/Buttons';
import './Modal.css';

const CommonModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} backdrop="static" keyboard={props.keyboard} centered size={props.size}>
                {   props.ModalTitle &&
                    <Modal.Header closeButton>
                        <div className="modal-title h4">{props.ModalTitle}</div>
                    </Modal.Header>
                }
                <Modal.Body>
                    {props.ModalData}
                </Modal.Body>
                { props.footer &&
                    <Modal.Footer>
                        <Button isButton="true" BtnColor="green btn-sm" BtnText="Submit" onClick={props.onClick}/>
                        <Button isButton="true" BtnColor="primary btn-sm" BtnText="Close" onClick={props.onClick}/>
                    </Modal.Footer>
                }
            </Modal>
        </>
    );
}

export default CommonModal;