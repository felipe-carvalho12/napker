import React from 'react'
import Modal from 'react-bootstrap/Modal'


export default function InterestsInfoModal(props) {

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Vantagens do post avançado</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column b-theme-base-color p-2 b-b" style={{ marginBottom: "20px" }}>
                    <span className="mb-1 c-primary-grey">
                        1) xxx
                        2) yyy
                        3) zzz
                        4) kkk
                    </span>
                </div>
            </Modal.Body>
        </Modal>
    )
}
