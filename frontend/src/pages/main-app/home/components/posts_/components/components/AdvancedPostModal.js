import React from 'react'
import Modal from 'react-bootstrap/Modal'

export default function AdvancedPostModal(props) {
    return (
        <Modal
            show={props.isOpen}
            onHide={props.closeModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Post avançado</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-grey" onClick={props.closeModal}>Fechar</button>
                <button className="btn btn-primary">Postar</button>
            </Modal.Footer>
        </Modal>
    )
}
