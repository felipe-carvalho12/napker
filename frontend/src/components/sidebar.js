import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
    const switchPage = (e, isHome = false) => {
        if (!isHome) {
            document.querySelectorAll('.sidebar-menu-item').forEach(el => {
                el.classList.remove('sidebar-menu-item-active')
            })
            e.target.classList.add('sidebar-menu-item-active')
        } else {
            document.querySelectorAll('.sidebar-menu-item').forEach(el => {
                el.classList.remove('sidebar-menu-item-active')
            })
            document.querySelector('#home-menu').classList.add('sidebar-menu-item-active')
        }
    }

    return (
        <div className="sidebar">
            <Link to="/" style={{ textDecoration: 'none' }} onClick={e => switchPage(e, true)}>
                <h2>Napker</h2>
            </Link>
            <ul>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item sidebar-menu-item-active" id="home-menu" onClick={switchPage}>
                        <i className="fas fa-home" />Home
                    </li>
                </Link>
                <Link to="/notificações" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" onClick={switchPage}>
                        <i className="fas fa-bell sidebar-menu-item" />
                        Notificações{!props.notificationsNumber ? '' : <p className="notifications-number">{props.notificationsNumber}</p>}
                    </li>
                </Link>
                <Link to="/mensagens" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" onClick={switchPage}>
                        <i className="fas fa-envelope sidebar-menu-item" />
                        Mensagens{!props.unreadMessagesNumber ? '' : <p className="notifications-number">{props.unreadMessagesNumber}</p>}
                    </li>
                </Link>
                <Link to="/perfil" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" onClick={switchPage}>
                        <i className="fas fa-user sidebar-menu-item" />Perfil
                    </li>
                </Link>
                <Link to="/configurações" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" onClick={switchPage}>
                        <i className="fas fa-cog sidebar-menu-item" />Configurações
                    </li>
                </Link>
            </ul>
        </div>
    )
}