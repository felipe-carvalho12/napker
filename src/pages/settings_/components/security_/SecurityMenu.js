import React from 'react'
import { Link } from 'react-router-dom'


export default function SecurityMenu(props) {
    return (
        <div className="settings-description-container" style={{ background: 'var(--body-background)' }}>
            <div className="security-page-menu">
                <div className="d-flex flex-column w-100">
                    <li>
                        <strong>Segurança</strong>
                    </li>
                    <Link to="/configurações/alterar-senha" style={{ textDecoration: 'none', width: '100%' }}>
                        <li id="change-password" onClick={() => props.pageChange('change-password')}>
                            Alterar senha
                            <i className="fas fa-angle-right" />
                        </li>
                    </Link>
                    <Link to="/configurações/deletar-conta" style={{ textDecoration: 'none', width: '100%' }}>
                        <li id="delete-account" onClick={() => props.pageChange('delete-account')}>
                            Apagar conta
                            <i className="fas fa-angle-right" />
                        </li>
                    </Link>
                </div>
            </div>
        </div>
    )
}