import React from 'react'

import { SERVER_URL } from '../../settings'

export default function ChangePassword() {
    return (
        <div className="settings-description-container">
            <div className="change-password-title-container">
                <h3>Alterar senha</h3>
            </div>
            <hr />
            <form className="change-password-form">
                <input type="password" placeholder="Senha atual" autoFocus />
                <br />
                <br />
                <input type="password" placeholder="Nova senha" />
                <br />
                <input type="password" placeholder="Confirmar nova senha" />
                <br />
                <button className="btn btn-primary" type="submit">Confirmar</button>
            </form>
        </div>
    )
}