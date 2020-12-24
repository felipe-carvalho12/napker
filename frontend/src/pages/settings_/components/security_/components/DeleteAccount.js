import React, { useState } from 'react'

import { csrftoken } from '../../../../../config/utils'
import { SERVER_URL } from '../../../../../config/settings'

export default function DeleteAccount() {
    const [displayErrorMessage, setDisplayErrorMessage] = useState(null)

    const deleteAccount = () => {
        if (window.confirm('Tem certeza que deseja deletar a sua conta ?\nEsta ação é irreversível?')) {
            const password = document.querySelector('#password').value
            if (!password) {
                window.alert('A senha não pode ficar em branco!')
            } else {
                fetch(`${SERVER_URL}/delete-account`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({
                        password: password
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data === 'Wrong password') {
                            setDisplayErrorMessage(true)
                        } else {
                            window.alert('Conta deletada com sucesso.')
                            window.location.href = SERVER_URL
                        }
                    })
            }
        }
    }

    return (
        <div className="settings-description-container">
            <div
                className="d-flex justify-content-start align-items-center"
                style={{ background: 'var(--theme-base-color)', padding: '15px', borderBottom: '1px solid var(--border-color)' }}
            >
                <i
                    class="fas fa-arrow-left left-arrow-icon mr-2"
                    onClick={() => window.history.back()}
                />
                <strong style={{ fontSize: '1.2rem' }}>Segurança</strong>
            </div>
            {displayErrorMessage &&
                <div className="alert">
                    <div className="alert alert-danger" role="alert">Senha incorreta!</div>
                </div>
            }
            <div className="settings-page-title-container">
                <h3>Deletar conta</h3>
            </div>
            <div className="delete-account-confirmation">
                <input id="password" type="password" placeholder="Senha" autoFocus />
                <hr />
                <br />
                Tem certeza que deseja apagar a sua conta ?
                <br />
                Esta ação é irreversível
                <br />
                <button
                    className="btn btn-danger"
                    onClick={deleteAccount}
                    style={{
                        borderRadius : "20px",
                        fontWeight: "bold"
                    }}
                >Deletar conta</button>
            </div>
        </div>
    )
}