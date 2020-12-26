import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import {
    InvitesReceivedContext, UnvisualizedCommentsContext,
    UnvisualizedLikesContext, UnreadMessagesContext
} from '../../../context/app/AppContext'

export default function BottomMenu(props) {
    const [invitesReceivedNumber,] = useContext(InvitesReceivedContext)
    const [unvisualizedCommentsNumber,] = useContext(UnvisualizedCommentsContext)
    const [unvisualizedLikesNumber,] = useContext(UnvisualizedLikesContext)

    const [unreadMessagesNumber,] = useContext(UnreadMessagesContext)

    let notificationsNumber = invitesReceivedNumber + unvisualizedLikesNumber + unvisualizedCommentsNumber

    return (
        <>
            <div className="bottom-menu-action-icon-container fixed-bottom">
                {props.children}
            </div>
            <div className="bottom-menu fixed-bottom">
                <ul>
                    <li>
                        <NavLink to="/home" className="bottom-menu-item" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="fas fa-home sidebar-menu-icon" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notificações" className="bottom-menu-item" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="fas fa-bell sidebar-menu-icon" />
                            {!notificationsNumber ? '' :
                                <div className="notification-text-container">
                                    <div className="notification-text">
                                        {notificationsNumber}
                                    </div>
                                </div>
                            }
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mensagens" className="bottom-menu-item" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="fas fa-envelope bottom-menu-icon" />
                            {!unreadMessagesNumber ? '' :
                                <div className="notification-text-container">
                                    <div className="notification-text">
                                        {unreadMessagesNumber}
                                    </div>
                                </div>
                            }
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/perfil" className="bottom-menu-item" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="fas fa-user sidebar-menu-icon" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/configurações" className="bottom-menu-item" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="fas fa-cog sidebar-menu-icon" />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}