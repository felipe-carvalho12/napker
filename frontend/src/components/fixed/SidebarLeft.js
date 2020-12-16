import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL, LOGO_URL } from '../../config/settings'
import { getActivePageOnLoad, switchPage } from '../../config/utils'
import {
    InvitesReceivedContext, UnvisualizedCommentsContext,
    UnvisualizedLikesContext, UnreadMessagesContext
} from '../../context/app/AppContext'

export default function Sidebar() {
    const [invitesReceivedNumber, setInvitesReceived] = useContext(InvitesReceivedContext)
    const [unvisualizedCommentsNumber, setUnvisulaizedComments] = useContext(UnvisualizedCommentsContext)
    const [unvisualizedLikesNumber, setUnvisulaizedLikes] = useContext(UnvisualizedLikesContext)

    const [unreadMessagesNumber, setUnreadMessagesNumber] = useContext(UnreadMessagesContext)

    let notificationsNumber = invitesReceivedNumber + unvisualizedLikesNumber + unvisualizedCommentsNumber

    useEffect(() => {
        getActivePageOnLoad()
    }, [])

    return (
        <div className="sidebar" style={{ left: '0' }}>
            <div className="logo-container">
                <Link to="/home" style={{ textDecoration: 'none' }} onClick={e => switchPage(e, true)}>
                    <img src={`${SERVER_URL}${LOGO_URL}`} />
                </Link>
            </div>
            <ul>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" id="home-menu" onClick={switchPage}>
                        <i className="fas fa-home sidebar-menu-icon" />
                        Home
                    </li>
                </Link>
                <Link to="/notificações" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" id="notifications-menu" onClick={switchPage}>
                        <i className="fas fa-bell sidebar-menu-icon" />
                        Notificações
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
                        Mensagens
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
                        Perfil
                    </li>
                </Link>
                <Link to="/configurações" style={{ textDecoration: 'none' }}>
                    <li className="sidebar-menu-item" id="settings-menu" onClick={switchPage}>
                        <i className="fas fa-cog sidebar-menu-icon" />
                        Configurações
                    </li>
                </Link>
            </ul>
        </div>
    )
}