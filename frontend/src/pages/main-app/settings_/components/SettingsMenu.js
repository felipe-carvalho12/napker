import React from 'react'
import { NavLink } from 'react-router-dom'

import { handleLogout } from '../../../../config/utils'
import ThemeSwitcher from '../../../../components/ThemeSwitcher'

export default function SettingsMenu() {

    return (
        <div className="d-flex flex-column align-items-center h-100 b-right settings-page-menu" style={{ width: '40%', background: 'var(--background)' }}>
            <NavLink
                to="/configurações/perfis-bloqueados"
                style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)' }}
                activeStyle={{ background: 'var(--theme-base-color-hover)' }}
            >
                <li
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 b-bottom c-primary-grey base-hover"
                    id="blocked-profiles"
                    style={{ fontSize: 'large' }}
                >
                    Perfis bloqueados
                    <i className="fas fa-angle-right" />
                </li>
            </NavLink>
            <NavLink
                to="/configurações/segurança"
                style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)' }}
                activeStyle={{ background: 'var(--theme-base-color-hover)' }}
            >
                <li
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 b-bottom c-primary-grey base-hover"
                    id="security"
                    style={{ fontSize: 'large' }}
                >
                    Segurança
                    <i className="fas fa-angle-right" />
                </li>
            </NavLink>
            <NavLink
                to="/configurações/faq"
                style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)' }}
                activeStyle={{ background: 'var(--theme-base-color-hover)' }}
            >
                <li
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 b-bottom c-primary-grey base-hover"
                    id="faq"
                    style={{ fontSize: 'large' }}
                >
                    FAQ
                    <i className="fas fa-angle-right" />
                </li>
            </NavLink>
            <NavLink
                to="/configurações/fale-conosco"
                style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)' }}
                activeStyle={{ background: 'var(--theme-base-color-hover)' }}
            >
                <li
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 b-bottom c-primary-grey base-hover"
                    id="feedback"
                    style={{ fontSize: 'large' }}
                >
                    Fale conosco
                    <i className="fas fa-angle-right" />
                </li>
            </NavLink>
            <li
                className="w-100 d-flex justify-content-between align-items-center px-3 py-2 c-primary-grey b-theme-base-color base-hover"
                style={{ fontSize: 'large' }}
                onClick={handleLogout}
            >
                Sair da conta
            </li>

            <ThemeSwitcher
                className="w-100 ml-3 settings-page-theme-switcher"
                style={{ marginTop: '100px', fontWeight: 'bold' }}
                id="settings-switcher"
            />
        </div>
    )
}