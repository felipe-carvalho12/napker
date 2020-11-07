import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'

export default function CommentModal(props) {
    const comment = e => {
        e.preventDefault()
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
                <form>
                    <input
                        className="form-control"
                        id="comment-modal-input"
                        placeholder="Comente alguma coisa"
                        style={{ marginRight: '5px' }}
                    />
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={comment}
                    >
                        Enviar
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}