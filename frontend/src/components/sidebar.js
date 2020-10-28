import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
    return (
        <div className="sidebar">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h2>Napker</h2>
            </Link>
            <ul>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <li><i className="fas fa-home"/>Home</li>
                </Link>
                <Link to="/notificações" style={{ textDecoration: 'none' }}>
                    <li><i className="fas fa-bell"/>Notificações{!props.notificationsNumber ? '' : <p className="notifications-number">{props.notificationsNumber}</p>}</li>
                </Link>
                <Link to="/mensagens" style={{ textDecoration: 'none' }}>
                    <li><i className="fas fa-envelope"/>Mensagens{!props.unreadMessagesNumber ? '' : <p className="notifications-number">{props.unreadMessagesNumber}</p>}</li>
                </Link>
                <Link to="/perfil" style={{ textDecoration: 'none' }}>
                    <li><i className="fas fa-user"/>Perfil</li>
                </Link>
                <Link to="/configurações" style={{ textDecoration: 'none' }}>
                    <li><i className="fas fa-cog"/>Configurações</li>
                </Link>
            </ul>
        </div>
    )
}