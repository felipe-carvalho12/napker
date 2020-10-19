import React from 'react'
import { Link } from 'react-router-dom'
import { handleLogout } from '../utils'

export default function Header(props) {
    return (
        <div className="header fixed-top">
            {!props.backArrow ? '' : <Link to="/"><i class="fas fa-arrow-left profile-left-arrow"/></Link>}
            <strong>{props.page}</strong>
            <a class="logout" onClick={handleLogout}>Sair</a>
        </div>
    )
}