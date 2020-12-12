import React from 'react'


export default function Feedback() {

    return (
        <div className="settings-description-container">
            <form className="feedback-form">
                <h3>Nos ajude a melhorar</h3>
                <hr />
                <div className="feedback-faces-container">
                    <h6>Como está sendo a sua experiência no Napker até agora?</h6>
                    <div className="d-flex justify-content-center">
                        <div className="option-container">
                            <i class="fas fa-grin-beam" style={{ color: '#0f0' }} />
                        </div>
                        <div className="option-container">
                            <i class="fas fa-smile" style={{ color: '#00f' }} />
                        </div>
                        <div className="option-container">
                            <i class="fas fa-meh" style={{ color: '#ff0' }} />
                        </div>
                        <div className="option-container">
                            <i class="fas fa-frown" style={{ color: '#f80' }} />
                        </div>
                        <div className="option-container">
                            <i class="fas fa-angry" style={{ color: '#f00' }} />
                        </div>
                    </div>
                </div>
                <hr />
                <textarea placeholder="Digite a sua mensagem aqui..." />
                <button className="btn btn-primary w-100">Enviar</button>
            </form>
        </div>
    )
}