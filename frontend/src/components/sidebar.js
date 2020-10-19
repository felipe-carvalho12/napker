import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="/" style={{ textDecoration: 'none' }}>
                    <h2>Napker</h2>
                </Link>
            <ul>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <li class="sidebar-menu-link"><i className="fas fa-home"></i>Home</li>
                </Link>
                <Link to="/notificações" style={{ textDecoration: 'none' }}>
                    <li class="sidebar-menu-link"><i className="fas fa-bell"></i>Notificações</li>
                </Link>
                <Link to="/mensagens" style={{ textDecoration: 'none' }}>
                    <li class="sidebar-menu-link"><i className="fas fa-envelope"></i>Mensagens</li>
                </Link>
                <Link to="/perfil" style={{ textDecoration: 'none' }}>
                    <li class="sidebar-menu-link"><i className="fas fa-user"></i>Perfil</li>
                </Link>
                <Link to="/configurações" style={{ textDecoration: 'none' }}>
                    <li class="sidebar-menu-link"><i className="fas fa-cog"></i>Configurações</li>
                </Link>
            </ul>
        </div>
    )
}