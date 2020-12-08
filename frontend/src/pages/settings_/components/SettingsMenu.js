import React from 'react'
import { Link } from 'react-router-dom'

import { handleLogout } from '../../../config/utils'

export default function SettingsMenu(props) {

    return (
        <div className="settings-page-menu">
            <div className="d-flex flex-column w-100">
                <Link to="/configurações/perfis-bloqueados" style={{ textDecoration: 'none', width: '100%' }}>
                    <li id="blocked-profiles" onClick={() => props.pageChange('blocked-profiles')}>
                        Perfis bloqueados
                        <i className="fas fa-angle-right" />
                    </li>
                </Link>
                <Link to="/configurações/segurança" style={{ textDecoration: 'none', width: '100%' }}>
                    <li id="security" onClick={() => props.pageChange('security')}>
                        Segurança
                        <i className="fas fa-angle-right" />
                    </li>
                </Link>
            </div>
            <li className="logout-btn" onClick={handleLogout}>
                Sair da conta
            </li>
        </div>
    )
}