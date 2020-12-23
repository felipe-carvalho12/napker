import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL, LOGO_URL } from '../../config/settings'
import { getActivePageOnLoad, switchPage } from '../../config/utils'
import {
    InvitesReceivedContext, UnvisualizedCommentsContext,
    UnvisualizedLikesContext, UnreadMessagesContext
} from '../../context/app/AppContext'

export default function Sidebar() {
    const [invitesReceivedNumber,] = useContext(InvitesReceivedContext)
    const [unvisualizedCommentsNumber,] = useContext(UnvisualizedCommentsContext)
    const [unvisualizedLikesNumber,] = useContext(UnvisualizedLikesContext)

    const [unreadMessagesNumber,] = useContext(UnreadMessagesContext)

    let notificationsNumber = invitesReceivedNumber + unvisualizedLikesNumber + unvisualizedCommentsNumber

    useEffect(() => {
        getActivePageOnLoad()
    }, [])

    return (
        <div className="sidebar" style={{ left: '0' }}>
            <div>
                <div className="logo-container">
                    <Link to="/home" style={{ textDecoration: 'none' }} onClick={e => switchPage(e, true)}>
                        <img src={`${SERVER_URL}${LOGO_URL}`} style={{ width: '25px' }} />
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
        </div>
    )
}