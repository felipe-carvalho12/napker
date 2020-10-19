import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Napker</h2>
            <ul>
                <Link to="/">
                    <li class="menu" id="home"><i className="fas fa-home"></i>Home</li>
                </Link>
                <Link to="/notificações">
                    <li class="menu" id="notificações"><i className="fas fa-bell"></i>Notificações</li>
                </Link>
                <Link to="/mensagens">
                    <li class="menu" id="mensagens"><i className="fas fa-envelope"></i>Mensagens</li>
                </Link>
                <Link to="/perfil">
                    <li class="menu" id="perfil"><i className="fas fa-user"></i>Perfil</li>
                </Link>
                <Link to="/configurações">
                    <li class="menu" id="configurações"><i className="fas fa-cog"></i>Configurações</li>
                </Link>
            </ul>
        </div>
    )
}