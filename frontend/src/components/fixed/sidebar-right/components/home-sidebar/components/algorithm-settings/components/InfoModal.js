import React from 'react'
import Modal from 'react-bootstrap/Modal'


export default function FeedAlgorithmInfoModal(props) {

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Como o seu algoritmo deve funcionar?</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column b-theme-base-color p-2 b-b" style={{ marginBottom: "20px" }}>
                    <span className="mb-1 c-primary-grey">
                        Os critérios presentes na barra lateral (Interesses em comum, Semelhança de idade...) são utilizados para calcularmos a
                        relevância de um perfil em relação a outro. Sabendo disso, você pode escolher o peso de cada critério e assim, personalizar o
                        algoritmo que calculará a relevância dos outros perfis.
                    </span>
                    <span className="mb-1 c-primary-grey">
                        <strong>Exemplo:</strong> Caso você mude o peso do critério "Interesses em comum" para 100 e todos os outros para 0, os perfis da página "Encontrar perfis" 
                        serão ordenados levando em consideração apenas a quantidade de interesses em comum que o usuário tem com você.
                    </span>
                    <span className="mb-1 c-primary-grey">
                        A relevância de um post é calculada baseada na relevância do autor do mesmo e dos perfis que curtiram a publicação. Ou seja,
                        ao decidir como a relevância de um perfil será calculada, você está personalizando o algoritmo que decidirá quais posts devem aparecer para você
                        e em que ordem.
                    </span>
                </div>
            </Modal.Body>
        </Modal>
    )
}