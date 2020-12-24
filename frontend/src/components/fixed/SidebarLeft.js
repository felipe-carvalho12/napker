import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { getActivePageOnLoad, switchPage, setTheme } from '../../config/utils'
import {
    InvitesReceivedContext, UnvisualizedCommentsContext,
    UnvisualizedLikesContext, UnreadMessagesContext
} from '../../context/app/AppContext'
import Logo from '../../assets/icons/Logo' 

export default function Sidebar() {
    const [invitesReceivedNumber,] = useContext(InvitesReceivedContext)
    const [unvisualizedCommentsNumber,] = useContext(UnvisualizedCommentsContext)
    const [unvisualizedLikesNumber,] = useContext(UnvisualizedLikesContext)

    const [unreadMessagesNumber,] = useContext(UnreadMessagesContext)

    let notificationsNumber = invitesReceivedNumber + unvisualizedLikesNumber + unvisualizedCommentsNumber

    let theme = window.localStorage.getItem('theme') || 'light'


    useEffect(() => {
        document.getElementById('chk').checked = theme === 'dark'
        getActivePageOnLoad()
    }, [])

    const switchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="sidebar" style={{ left: '0' }}>
            <div>
                <div className="logo-container">
                    <Link to="/home" style={{ textDecoration: 'none' }} onClick={e => switchPage(e, true)}>
                        <Logo />
                    </Link>
                </div>
                <ul>
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <li className="sidebar-menu-item" id="home-menu" onClick={switchPage}>
                            <i className="fas fa-home sidebar-menu-icon" />
                            <span>Home</span>
                        </li>
                    </Link>
                    <Link to="/notificações" style={{ textDecoration: 'none' }}>
                        <li className="sidebar-menu-item" id="notifications-menu" onClick={switchPage}>
                            <i className="fas fa-bell sidebar-menu-icon" />
                            <span>Notificações</span>
                            {!notificationsNumber ? '' :
                                <div className="notification-text-container">
                                    <div className="notification-text">
                                        {notificationsNumber}
                                    </div>
                                </div>
                            }
                        </li>
                    </Link>
                    <Link to="/mensagens" style={{ textDecoration: 'none' }}>
                        <li className="sidebar-menu-item" id="messages-menu" onClick={switchPage}>
                            <i className="fas fa-envelope sidebar-menu-icon" />
                            <span>Mensagens</span>
                            {!unreadMessagesNumber ? '' :
                                <div className="notification-text-container">
                                    <div className="notification-text">
                                        {unreadMessagesNumber}
                                    </div>
                                </div>
                            }
                        </li>
                    </Link>
                    <Link to="/perfil" style={{ textDecoration: 'none' }}>
                        <li className="sidebar-menu-item" id="profile-menu" onClick={switchPage}>
                            <i className="fas fa-user sidebar-menu-icon" />
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <Link to="/configurações" style={{ textDecoration: 'none' }}>
                        <li className="sidebar-menu-item" id="settings-menu" onClick={switchPage}>
                            <i className="fas fa-cog sidebar-menu-icon" />
                            <span>Configurações</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div class="d-flex justify-content-start sidebar-menu-item">
                <div class="one-quarter" id="switch">
                    <input type="checkbox" class="checkbox" id="chk" onChange={switchTheme} />
                    <label class="label m-0" for="chk">
                        <i class="fas fa-sun"></i>
                        <i class="fas fa-moon"></i>
                        <div class="ball"></div>
                    </label>
                </div>
                <span style={{ marginLeft: '10px' }}>Tema</span>
            </div>
        </div>
    )
}