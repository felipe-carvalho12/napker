import React from 'react'
import { handleLogout } from '../utils'

export default function Header(props) {
    return (
        <div className="header fixed-top">
            <strong>{props.page}</strong> <a class="logout" onClick={handleLogout}>Sair</a>
        </div>
    )
}