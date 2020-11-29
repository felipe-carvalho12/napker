import React, { useState } from 'react'

import { csrftoken } from '../../../config/utils'
import { SERVER_URL } from '../../../config/settings'

export default function ChangePassword() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const handleFormSubmit = e => {
        e.preventDefault()
        let password = document.querySelector('#password').value
        let newPassword = document.querySelector('#new_password').value
        let newPasswordc = document.querySelector('#new_passwordc').value
        for (let input of document.querySelectorAll('form > input')) {
            if (!input.value) {
                alert('Todos os campos devem ser preenchidos!')
                return
            }
        }
        if (newPassword !== newPasswordc) {
            setErrorMessage('Os campos "Nova senha" e "Confirmar nova senha" devem ter o mesmo valor!')
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
                    password = newPassword = newPasswordc = ''
                } else {
                    setErrorMessage(data)
                }
            })
    }

    return (
        <div className="settings-description-container">
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
            <div className="change-password-title-container">
                <h3>Alterar senha</h3>
            </div>
            <hr />
            <form className="change-password-form">
                <input id="password" type="password" placeholder="Senha atual" autoFocus />
                <br />
                <a href="#">Esqueceu sua senha?</a>
                <hr />
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