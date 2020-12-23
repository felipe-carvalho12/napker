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

    let theme = window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'light'


    useEffect(() => {
        getActivePageOnLoad()
    }, [])

    useEffect(() => {
        window.localStorage.setItem('theme', theme)
    }, [theme])

    const switchTheme = () => {
        const cssVariables = document.documentElement.style
        theme = theme === 'light' ? 'dark' : 'light'

        if (theme === 'light') {
            cssVariables.setProperty('--border-color', '#f3f3f3')
            cssVariables.setProperty('--background', '#f3f3f3')
            cssVariables.setProperty('--fixed-components-background', '#fcfdfc')
            cssVariables.setProperty('--heart-color', '#E0245E')
            cssVariables.setProperty('--heart-background-hover', '#F5E2E8')
            cssVariables.setProperty('--primary-color', '#48D1AF')
            cssVariables.setProperty('--secondary-color', 'rgba(119, 147, 125, .1)')
            cssVariables.setProperty('--primary-color-hover', '#3FB597')
            cssVariables.setProperty('--primary-grey', '#363636')
            cssVariables.setProperty('--loader-background', 'rgba(119, 147, 125, .3)')
            cssVariables.setProperty('--theme-base-color', '#fff')
            cssVariables.setProperty('--theme-base-color-hover', 'rgba(128, 128, 128, .01)')
            cssVariables.setProperty('--view-more-select-border', 'rgba(0, 0, 0, .2)')

        } else if (theme === 'dark') {
            cssVariables.setProperty('--border-color', '#131313')
            cssVariables.setProperty('--background', '#131313')
            cssVariables.setProperty('--fixed-components-background', '#000')
            cssVariables.setProperty('--heart-color', '#E0245E')
            cssVariables.setProperty('--heart-background-hover', '#F5E2E8')
            cssVariables.setProperty('--primary-color', '#48D1AF')
            cssVariables.setProperty('--secondary-color', 'rgba(119, 147, 125, .1)')
            cssVariables.setProperty('--primary-color-hover', '#3FB597')
            cssVariables.setProperty('--primary-grey', '#D9D9D9')
            cssVariables.setProperty('--loader-background', 'rgba(119, 147, 125, .3)')
            cssVariables.setProperty('--theme-base-color', '#000')
            cssVariables.setProperty('--theme-base-color-hover', 'rgba(128, 128, 128, .01)')
            cssVariables.setProperty('--view-more-select-border', 'rgba(255, 255, 255, .2)')
        }
    }

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