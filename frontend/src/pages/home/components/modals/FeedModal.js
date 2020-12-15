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
                    <h3>Escolha como o nosso algoritmo deve ordenar os posts</h3>
                    <p>Quanto maior o valor, mais peso o critério de avaliação terá na hora de calcularmos a relevância de um post.</p>
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