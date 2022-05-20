import React from 'react';
import { Modal } from 'react-bootstrap';

export default function Alert(props) {
    return (
        <>
            <Modal 
                size="sm"
                aria-labelledby="example-modal-sizes-title-sm"
                {...props}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm"> Alert </Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.alertMessage}</Modal.Body>
            </Modal>
        </>

    )
}
