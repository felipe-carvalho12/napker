import React from 'react'
import { Link } from 'react-router-dom'


export default function SecurityMenu() {
    return (
        <div className="settings-description-container b-t-r-r b-b-r-r b-theme-base-color b-t-r-r b-b-r-r b-theme-base-color">
            <div className="d-flex flex-column justify-content-between align-items-center w-100 ">
                <div className="d-flex flex-column w-100">
                    <li
                        className="w-100 d-flex justify-content-between align-items-center px-3 py-2 b-bottom c-primary-grey"
                        style={{ fontSize: 'large' }}
                    >
                        <strong>Segurança</strong>
                    </li>
                    <Link to="/configurações/alterar-senha" style={{ textDecoration: 'none', width: '100%' }}>
                        <li
                            className="w-100 d-flex justify-content-between align-items-center px-3 py-2 b-theme-base-color c-primary-grey base-hover box-sm"
                            id="change-password"
                            style={{ fontSize: 'large' }}
                        >
                            Alterar senha
                            <i className="fas fa-angle-right" />
                        </li>
                    </Link>
                    <Link to="/configurações/deletar-conta" style={{ textDecoration: 'none', width: '100%' }}>
                        <li
                            className="w-100 d-flex justify-content-between align-items-center px-3 py-2 b-bottom b-theme-base-color c-primary-grey base-hover box-sm"
                            id="delete-account"
                            style={{ fontSize: 'large' }}
                        >
                            Apagar conta
                            <i className="fas fa-angle-right" />
                        </li>
                    </Link>
                </div>
            </div>
        </div>
    )
}