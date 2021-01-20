import React from 'react'
import Modal from 'react-bootstrap/Modal'


export default function InterestsInfoModal(props) {

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Porque usar o post avançado?</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column b-theme-base-color p-2 b-b" style={{ marginBottom: "20px" }}>
                    <span className="mb-1 c-primary-grey">
                        <p>1) Seu post terá mais chance de aparecer no feed de usuários que possuam o(s) interesse(s) adicionado(s) ao post.</p>
                        <p>2) Seu post terá maior probabilidade de aparecer no descobrir.</p>
                        <p>3) Seu post ganhará mais engajamento já que será direcionado para usuários mais interessados no conteúdo.</p>
                    </span>
                </div>
            </Modal.Body>
        </Modal>
    )
}
