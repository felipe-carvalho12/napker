import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'


export default function FeedModal(props) {

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', () => {
            const slider = document.getElementById("myRange")
            const output = document.getElementById("demo")
            output.innerHTML = slider.value

            slider.oninput = function () {
                output.innerHTML = this.value
            }
        })
    }, [])

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
                    <h5>Interesses</h5>
                    <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
                    </div>
                    <hr />
                    <h5>Semelhança de idade</h5>
                    <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
                    </div>
                    <hr />
                    <h5>Amigos em comum</h5>
                    <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
                    </div>
                    <hr />
                    <h5>Ser amigo</h5>
                    <div class="slidecontainer">
                        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}