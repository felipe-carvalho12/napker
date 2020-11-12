import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SERVER_URL, LOGO_URL } from '../settings'

export default function Sidebar(props) {
    useEffect(() => {
        document.querySelectorAll('.sidebar-menu-item-active').forEach(el => {
            el.classList.remove('sidebar-menu-item-active')
        })
        const currentUrl = window.location.href.split('/')
        if (currentUrl.includes('home')) {
            document.querySelector('#home-menu').classList.add('sidebar-menu-item-active')
        }
        else if (currentUrl.includes('notifica%C3%A7%C3%B5es')) {
            document.querySelector('#notifications-menu').classList.add('sidebar-menu-item-active')
        }
        else if (currentUrl.includes('mensagens')) {
            document.querySelector('#messages-menu').classList.add('sidebar-menu-item-active')
        }
        else if (currentUrl.includes('perfil')) {
            document.querySelector('#profile-menu').classList.add('sidebar-menu-item-active')
        }
        else if (currentUrl.includes('configura%C3%A7%C3%B5es')) {
            document.querySelector('#settings-menu').classList.add('sidebar-menu-item-active')
        }
    }, [])

    const switchPage = (e, isHome = false) => {
        if (!isHome) {
            document.querySelectorAll('.sidebar-menu-item-active').forEach(el => {
                el.classList.remove('sidebar-menu-item-active')
            })
            e.target.classList.add('sidebar-menu-item-active')
        } else {
            document.querySelectorAll('.sidebar-menu-item-active').forEach(el => {
                el.classList.remove('sidebar-menu-item-active')
            })
            document.querySelector('#home-menu').classList.add('sidebar-menu-item-active')
        }
    }

    return (
        <div className="sidebar">
            <div className="logo-container">
                <Link to="/home" style={{ textDecoration: 'none' }} onClick={e => switchPage(e, true)}>
                    <img src={`${SERVER_URL}${LOGO_URL}`} />
                </Link>
            </div>
            <ul>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" id="home-menu" onClick={switchPage}>
                        <i className="fas fa-home sidebar-menu-item sidebar-menu-icon" />Home
                    </li>
                </Link>
                <Link to="/notificações" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" id="notifications-menu" onClick={switchPage}>
                        <i className="fas fa-bell sidebar-menu-item sidebar-menu-icon" />
                        Notificações
                        {!props.notificationsNumber ? '' :
                            <div className="notification-text-container">
                                <div className="notification-text">
                                    {props.notificationsNumber}
                                </div>
                            </div>
                        }
                    </li>
                </Link>
                <Link to="/mensagens" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" id="messages-menu" onClick={switchPage}>
                        <i className="fas fa-envelope sidebar-menu-item sidebar-menu-icon" />
                        Mensagens{!props.unreadMessagesNumber ? '' :
                            <div className="notification-text-container">
                                <div className="notification-text">
                                    {props.unreadMessagesNumber}
                                </div>
                            </div>
                        }
                    </li>
                </Link>
                <Link to="/perfil" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" id="profile-menu" onClick={switchPage}>
                        <i className="fas fa-user sidebar-menu-item sidebar-menu-icon" />Perfil
                    </li>
                </Link>
                <Link to="/configurações" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" id="settings-menu" onClick={switchPage}>
                        <i className="fas fa-cog sidebar-menu-item sidebar-menu-icon" />Configurações
                    </li>
                </Link>
            </ul>
        </div>
    )
}