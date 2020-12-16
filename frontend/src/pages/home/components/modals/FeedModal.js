import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'


export default function FeedModal(props) {
    const [interestsValue, setInterestsValue] = useState(50)
    const [ageValue, setAgeValue] = useState(50)
    const [friendsValue, setFriendsValue] = useState(50)
    const [isFriendValue, setIsFriendValue] = useState(50)

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Configurações do Feed</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h3>Como devemos ordenar os posts?</h3>
                    <p>
                        Os critérios abaixos serão utilizados para calcular a relevância de um usuário.
                        Sabendo disso, os pesos que você escolher servirão para calcular a relevância do autor de um post e dos usuários que curtiram/comentaram o mesmo.
                        Após calcularmos a relevância dos posts vamos ordená-los.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-between" style={{ padding: '20px' }}>
                        <h5>Interesses</h5>
                        <div>{interestsValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" onInput={e => setInterestsValue(e.target.value)} />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between" style={{ padding: '20px' }}>
                        <h5>Semelhança de idade</h5>
                        <div>{ageValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" defaultValue="50" onInput={e => setAgeValue(e.target.value)} />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between" style={{ padding: '20px' }}>
                        <h5>Amigos em comum</h5>
                        <div>{friendsValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" defaultValue="50" onInput={e => setFriendsValue(e.target.value)} />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between" style={{ padding: '20px' }}>
                        <h5>Ser meu amigo</h5>
                        <div>{isFriendValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" defaultValue="50" onInput={e => setIsFriendValue(e.target.value)} />
                    </div>
                    <br />
                    <button className="btn btn-primary w-100">Confirmar</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}