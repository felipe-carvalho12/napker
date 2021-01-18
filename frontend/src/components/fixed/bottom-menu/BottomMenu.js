import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import {
    InvitesReceivedContext, PostNotificationsContext, UnreadMessagesContext
} from '../../../context/app/AppContext'

export default function BottomMenu(props) {
    const [invitesReceivedNumber,] = useContext(InvitesReceivedContext)
    const [postNotifications,] = useContext(PostNotificationsContext)

    const [unreadMessagesNumber,] = useContext(UnreadMessagesContext)

    let notificationsNumber = invitesReceivedNumber + postNotifications

    return (
        <>
            <div className="bottom-menu-action-icon-container fixed-bottom">
                {props.children}
            </div>
            <div className="bottom-menu fixed-bottom blur b-t">
                <ul>
                    <li>
                        <NavLink to="/home" className="bottom-menu-item" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>home</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notificações" className="bottom-menu-item d-flex justify-content-center align-items-center position-relative" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>notifications</i>
                            {!notificationsNumber ? '' :
                                <div className="notification-text-container position-absolute" style={{ top: '0', right:'15%' }}>
                                    <div className="notification-text">
                                        {notificationsNumber}
                                    </div>
                                </div>
                            }
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mensagens" className="bottom-menu-item d-flex justify-content-center align-items-center position-relative" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>email</i>
                            {!unreadMessagesNumber ? '' :
                                <div className="notification-text-container position-absolute" style={{ top: '0', right:'15%' }}>
                                    <div className="notification-text">
                                        {unreadMessagesNumber}
                                    </div>
                                </div>
                            }
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/perfil" className="bottom-menu-item" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>perm_identity</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/configurações" className="bottom-menu-item" style={{ textDecoration: 'none' }} activeClassName="c-primary-color">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>settings</i>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}