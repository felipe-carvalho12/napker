import React from 'react'
import { handleLogout } from '../utils'

export default function Header(props) {
    return (
        <div className="header fixed-top">
            {!props.backArrow ? '' :
            <i class="fas fa-arrow-left left-arrow-icon" onClick={() => window.history.back()}/>}
            <strong>{props.page}</strong>
            <a className="logout" onClick={handleLogout}>Sair</a>
        </div>
    )
}