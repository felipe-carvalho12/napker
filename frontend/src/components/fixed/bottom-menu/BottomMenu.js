import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { getActivePageOnLoad, switchPage } from '../../../config/utils'
import {
    InvitesReceivedContext, UnvisualizedCommentsContext,
    UnvisualizedLikesContext, UnreadMessagesContext
} from '../../../context/app/AppContext'

export default function BottomMenu(props) {
    const [invitesReceivedNumber, setInvitesReceived] = useContext(InvitesReceivedContext)
    const [unvisualizedCommentsNumber, setUnvisulaizedComments] = useContext(UnvisualizedCommentsContext)
    const [unvisualizedLikesNumber, setUnvisulaizedLikes] = useContext(UnvisualizedLikesContext)

    const [unreadMessagesNumber, setUnreadMessagesNumber] = useContext(UnreadMessagesContext)

    let notificationsNumber = invitesReceivedNumber + unvisualizedLikesNumber + unvisualizedCommentsNumber

    useEffect(() => {
        getActivePageOnLoad()
    }, [])

    return (
        <>
            <div className="bottom-menu-action-icon-container fixed-bottom">
                {props.children}
            </div>
            <div className="bottom-menu fixed-bottom">
                <ul>
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <li className="sidebar-menu-item" id="bottom-home-menu" onClick={switchPage}>
                            <i className="fas fa-home sidebar-menu-icon" />
                        </li>
                    </Link>
                    <Link to="/notificações" style={{ textDecoration: 'none' }}>
                        <li className="sidebar-menu-item" id="bottom-notifications-menu" onClick={switchPage}>
                            <i className="fas fa-bell sidebar-menu-icon" />
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
                        <li className="sidebar-menu-item" id="bottom-messages-menu" onClick={switchPage}>
                            <i className="fas fa-envelope sidebar-menu-icon" />
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
                        <li className="sidebar-menu-item" id="bottom-profile-menu" onClick={switchPage}>
                            <i className="fas fa-user sidebar-menu-icon" />
                        </li>
                    </Link>
                    <Link to="/configurações" style={{ textDecoration: 'none' }}>
                        <li className="sidebar-menu-item" id="bottom-settings-menu" onClick={switchPage}>
                            <i className="fas fa-cog sidebar-menu-icon" />
                        </li>
                    </Link>
                </ul>
            </div>
        </>
    )
}