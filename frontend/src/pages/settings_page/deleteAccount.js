import React, { useState } from 'react'

import { SERVER_URL } from '../../settings'

export default function DeleteAccount() {
    return (
        <div className="settings-description-container">
            <div className="delete-account-title-container">
                <h3>Deletar conta</h3>
            </div>
            <hr />
            <div className="delete-account-confirmation">
                Tem certeza que deseja apagar a sua conta ?
                <br/>
                Esta ação é irreversível
                <br/>
                <button className="btn btn-danger">Deletar conta</button>
            </div>
        </div>
    )
}