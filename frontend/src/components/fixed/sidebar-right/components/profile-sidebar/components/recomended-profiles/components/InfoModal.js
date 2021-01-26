import React from 'react'
import Modal from 'react-bootstrap/Modal'


export default function RecomendedProfilesInfoModal(props) {
    const username = props.username

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Perfis recomendados</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Como decidimos quais perfis aparecem na barra lateral?</h3>
                <p>
                    Os perfis que estão na barra lateral são considerados os perfis que mais "batem" com @{username}.
                    Ou seja, são perfis que possuem bastante afinidade com o usuário.
                </p>

                <br />
                <br />

                <h3>Como é calculada a relevância de um perfil para @{username}?</h3>
                <p>
                    Os critérios presentes nas configurações do algoritmo (Interesses em comum, Semelhança de idade...) são utilizados para calcularmos a
                    relevância de um perfil em relação a outro. Sabendo disso, você pode escolher o peso de cada critério e assim, personalizar o
                    algoritmo que calculará a relevância dos perfis.
                </p>
            </Modal.Body>
        </Modal>
    )
}