import React from 'react'
import Modal from 'react-bootstrap/Modal'


export default function FeedAlgorithmInfoModal(props) {

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Algoritmo do Feed</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Como devemos ordenar os posts?</h3>
                <p>
                    Os critérios presentes na barra lateral (Interesses em comum, Semelhança de idade...) são utilizados para calcularmos a
                    relevância de um perfil em relação a você. Sabendo disso, você pode escolher o peso de cada critério e assim, personalizar o
                    algoritmo que calculará a relevância dos outros perfis.
                    <br />
                    <br />
                    A relevância de um post é calculada baseada na relevância do autor do mesmo e dos perfis que curtiram a publicação. Ou seja,
                    ao decidir como a relevância de um perfil será calculada, você está personalizando o algoritmo que decidirá quais posts devem aparecer para você
                    e em que ordem.
                </p>
            </Modal.Body>
        </Modal>
    )
}