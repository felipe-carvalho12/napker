import React, { useState } from 'react'

import { csrftoken } from '../../../../../../config/utils'
import { SERVER_URL } from '../../../../../../config/settings'
import { Link } from 'react-router-dom'

export default function ChangePassword() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const handleFormSubmit = e => {
        e.preventDefault()
        let passwordEl = document.querySelector('#password')
        let newPasswordEl = document.querySelector('#new_password')
        let newPasswordcEl = document.querySelector('#new_passwordc')
        let password = passwordEl.value
        let newPassword = newPasswordEl.value
        let newPasswordc = newPasswordcEl.value
        for (let input of document.querySelectorAll('form > input')) {
            if (!input.value) {
                alert('Todos os campos devem ser preenchidos!')
                return
            }
        }
        if (newPassword !== newPasswordc) {
            setErrorMessage('Os campos "Nova senha" e "Confirmar nova senha" devem ter o mesmo valor!')
            setSuccessMessage(null)
            return
        }
        fetch(`${SERVER_URL}/change-password`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                password: password,
                new_password: newPassword,
                new_passwordc: newPasswordc,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'success') {
                    setSuccessMessage('Senha alterada com successo!')
                    setErrorMessage(null)
                    passwordEl.value = newPasswordEl.value = newPasswordcEl.value = ''
                } else {
                    setErrorMessage(data)
                    setSuccessMessage(null)
                }
            })
    }

    return (
        <div className="settings-description-container">
            <div
                className="d-flex justify-content-start align-items-center box-med"
                style={{ background: 'var(--theme-base-color)', padding: '1px', borderBottom: '1px solid var(--border-color)' }}>
                <i
                    class="fas fa-arrow-left left-arrow-icon mr-2"
                    onClick={() => window.history.back()}
                />
                <strong style={{ fontSize: '1.2rem' }}>Segurança</strong>
            </div>
            {errorMessage &&
                <div class="alert alert-danger alert" role="alert">
                    {errorMessage}
                </div>
            }
            {successMessage &&
                <div class="alert alert-success alert" role="alert">
                    {successMessage}
                </div>
            }
            <div className="settings-page-title-container">
                <h3>Alterar senha</h3>
            </div>
            <form className="change-password-form">
                <input id="password" type="password" placeholder="Senha atual" autoFocus />
                <br />
                <Link to="/recuperar-senha">
                    Esqueceu sua senha?
                </Link>
                 
                <br />
                <input id="new_password" type="password" placeholder="Nova senha" />
                <br />
                <input id="new_passwordc" type="password" placeholder="Confirmar nova senha" />
                <br />
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleFormSubmit}
                >Confirmar</button>
            </form>
        </div>
    )
}