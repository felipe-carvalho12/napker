import React from 'react'
import { NavLink } from 'react-router-dom'

import { handleLogout } from '../../../../config/utils'
import ThemeSwitcher from '../../../../components/ThemeSwitcher'

export default function SettingsMenu() {

    return (
        <div className="d-flex flex-column align-items-center h-100 settings-page-menu p-2 b-r" style={{ width: '40%' }}>
            <li
                className="w-100"
                id="blocked-profiles"
                style={{ fontSize: 'large' }}
            >
                <NavLink
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 mb-1 c-primary-grey base-hover box-sm"
                    to="/configurações/perfis-bloqueados"
                    style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)', borderRadius: "5px" }}
                    activeStyle={{ background: 'var(--theme-base-color-hover)' }}
                >
                    Perfis bloqueados
                    <i className="fas fa-angle-right" />
                </NavLink>
            </li>
            <li
                className="w-100"
                id="security"
                style={{ fontSize: 'large' }}
            >
                <NavLink
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 mb-1 c-primary-grey base-hover box-sm"
                    to="/configurações/segurança"
                    style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)', borderRadius: "5px" }}
                    activeStyle={{ background: 'var(--theme-base-color-hover)' }}
                >
                    Segurança
                    <i className="fas fa-angle-right" />
                </NavLink>
            </li>
            <li
                className="w-100"
                id="faq"
                style={{ fontSize: 'large' }}
            >
                <NavLink
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 mb-1 c-primary-grey base-hover box-sm"
                    to="/configurações/faq"
                    style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)', borderRadius: "5px" }}
                    activeStyle={{ background: 'var(--theme-base-color-hover)' }}
                >
                    FAQ
                    <i className="fas fa-angle-right" />
                </NavLink>
            </li>
            <li
                className="w-100"
                id="feedback"
                style={{ fontSize: 'large' }}
            >
                <NavLink
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 mb-1 c-primary-grey base-hover box-sm"
                    to="/configurações/fale-conosco"
                    style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)', borderRadius: "5px" }}
                    activeStyle={{ background: 'var(--theme-base-color-hover)' }}
                >
                    Fale conosco
                    <i className="fas fa-angle-right" />
                </NavLink>
            </li>
            <li
                className="w-100"
                id="feedback"
                style={{ fontSize: 'large' }}
            >
                <NavLink
                    className="w-100 d-flex justify-content-between align-items-center px-3 py-2 mb-1 c-primary-grey base-hover box-sm"
                    to="/configurações/cores"
                    style={{ textDecoration: 'none', width: '100%', background: 'var(--theme-base-color)', borderRadius: "5px" }}
                    activeStyle={{ background: 'var(--theme-base-color-hover)' }}
                >
                    Customizar Cores
                    <i className="fas fa-angle-right" />
                </NavLink>
            </li>
            <li
                className="w-100"
                className="w-100 d-flex justify-content-between align-items-center px-3 py-2 c-primary-grey b-theme-base-color base-hover box-sm"
                style={{ fontSize: 'large', borderRadius: "5px" }}
                onClick={handleLogout}
            >
                Sair da conta
            </li>
        </div>
    )
}