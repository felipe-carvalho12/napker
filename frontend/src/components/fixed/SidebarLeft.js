import React, { useEffect, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { setTheme } from '../../config/utils'
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
    }, [])

    const switchTheme = () => {
        theme = theme === 'light' ? 'dark' : 'light'
        setTheme(theme)
        window.localStorage.setItem('theme', theme)
    }

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
                            <i className="fas fa-home sidebar-menu-icon" />
                            <span>Home</span>
                        </li>
                    </NavLink>
                    <NavLink to="/notificações" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
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
                    </NavLink>
                    <NavLink to="/mensagens" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
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
                    </NavLink>
                    <NavLink to="/perfil" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
                            <i className="fas fa-user sidebar-menu-icon" />
                            <span>Perfil</span>
                        </li>
                    </NavLink>
                    <NavLink to="/configurações" style={{ textDecoration: 'none' }} activeClassName="active">
                        <li className="sidebar-menu-item">
                            <i className="fas fa-cog sidebar-menu-icon" />
                            <span>Configurações</span>
                        </li>
                    </NavLink>
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