import React from 'react'
import { Link } from 'react-router-dom'


export default function SecurityMenu() {
    return (
        <div className="settings-description-container b-t-r-r b-b-r-r b-theme-base-color p-10px">
            <div className="d-flex flex-column justify-content-between align-items-center w-100 ">
                <div className="d-flex flex-column w-100">
                    <li
                        className="w-100 d-flex justify-content-between align-items-center px-3 py-2 mb-2 c-primary-grey"
                        style={{ fontSize: 'large' }}
                    >
                        <strong>Segurança</strong>
                    </li>
                    <Link to="/configurações/alterar-senha" style={{ textDecoration: 'none', width: '100%' }}>
                        <li
                            className="w-100 d-flex align-items-center px-3 py-2 b-theme-base-color c-primary-grey base-hover"
                            id="change-password"
                            style={{ fontSize: 'large' }}
                        >
                            <span class="material-icons-outlined text-secondary mr-2">
                                vpn_key
                            </span>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                Alterar senha
                                <i className="fas fa-angle-right" />
                            </div>
                        </li>
                    </Link>
                    <Link to="/configurações/deletar-conta" style={{ textDecoration: 'none', width: '100%' }}>
                        <li
                            className="w-100 d-flex align-items-center px-3 py-2 b-theme-base-color c-primary-grey base-hover"
                            id="delete-account"
                            style={{ fontSize: 'large' }}
                        >
                            <span class="material-icons-outlined text-secondary mr-2">
                                sentiment_dissatisfied
                            </span>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                Apagar conta
                                <i className="fas fa-angle-right" />
                            </div>
                        </li>
                    </Link>
                </div>
            </div>
        </div>
    )
}