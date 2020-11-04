import React from 'react'
import Modal from 'react-bootstrap/Modal'

export default function CommentModal(props) {
    const comment = () => {
        props.commentPost(document.querySelector('#comment-modal-input').value)
        props.hideModal()
    }
    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg">
            <Modal.Header closeButton>
                <Modal.Title><strong>Comentar</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    className="form-control"
                    id="comment-modal-input"
                    placeholder="Comente alguma coisa"
                    style={{ marginRight: '5px' }}
                />
                <button
                    className="btn btn-primary"
                    onClick={comment}
                >Enviar</button>
            </Modal.Body>
        </Modal>
    )
}