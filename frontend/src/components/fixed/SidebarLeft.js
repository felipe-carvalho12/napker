import React, { useEffect, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import {
    InvitesReceivedContext, UnvisualizedCommentsContext,
    UnvisualizedLikesContext, UnreadMessagesContext
} from '../../context/app/AppContext'
import Logo from '../../assets/icons/Logo'
import ThemeSwitcher from '../ThemeSwitcher'

export default function Sidebar() {
    const [invitesReceivedNumber,] = useContext(InvitesReceivedContext)
    const [unvisualizedCommentsNumber,] = useContext(UnvisualizedCommentsContext)
    const [unvisualizedLikesNumber,] = useContext(UnvisualizedLikesContext)

    const [unreadMessagesNumber,] = useContext(UnreadMessagesContext)

    let notificationsNumber = invitesReceivedNumber + unvisualizedLikesNumber + unvisualizedCommentsNumber

    return (
        <div className="sidebar" style={{ left: '0' }}>
            <div>
                <div className="logo-container">
                    <Link to="/home" style={{ textDecoration: 'none' }}>
                        <Logo />
                    </Link>
                </div>
                <ul>
                    <NavLink to="/home" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>home</i>
                            <span style={{ fontWeight: "500" }}>Home</span>
                        </li>
                    </NavLink>
                    <NavLink to="/notificações" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
                        <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>notifications</i>
                            <span style={{ fontWeight: "500" }}>Notificações</span>
                            {!notificationsNumber ? '' :
                                <div className="notification-text-container">
                                    <div className="notification-text">
                                        {notificationsNumber}
                                    </div>
                                </div>
                            }
                        </li>
                    </NavLink>
                    <NavLink to="/mensagens" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>email</i>
                            <span style={{ fontWeight: "500" }}>Mensagens</span>
                            {!unreadMessagesNumber ? '' :
                                <div className="notification-text-container">
                                    <div className="notification-text">
                                        {unreadMessagesNumber}
                                    </div>
                                </div>
                            }
                        </li>
                    </NavLink>
                    <NavLink to="/perfil" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>perm_identity</i>
                            <span style={{ fontWeight: "500" }}>Perfil</span>
                        </li>
                    </NavLink>
                    <NavLink to="/configurações" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
                            <i className="material-icons-outlined" style={{ margin: "5px 10px 5px 0px", fontSize: "30px" }}>settings</i>
                            <span style={{ fontWeight: "500" }}>Configurações</span>
                        </li>
                    </NavLink>
                </ul>
            </div>
            <ThemeSwitcher id="sidebar-switcher" />
        </div>
    )
}