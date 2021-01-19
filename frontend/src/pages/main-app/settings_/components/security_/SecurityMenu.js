import React from 'react'
import { Link } from 'react-router-dom'


export default function SecurityMenu() {
    return (
        <div className="settings-description-container b-t-r-r b-b-r-r b-theme-base-color">
            <div className="d-flex flex-column justify-content-between align-items-center w-100 ">
                <div className="d-flex flex-column w-100">
                    <h3 className="c-primary-color p-30px">Segurança</h3>
                    <Link to="/configurações/alterar-senha" style={{ textDecoration: 'none', width: '100%' }}>
                        <li
                            className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
                            id="change-password"
                            style={{ fontSize: 'large' }}
                        >
                            <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px mt-10px">
                                vpn_key
                            </span>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div className="d-flex flex-column align-items-start">
                                    <span className="c-p-c-0 fw-500 fs-15 mr-10px">Alterar senha</span>
                                    <span className="c-secondary-grey fw-300 fs-13 mr-10px">Você pode alterar a sua senha a qualquer momento.</span>
                                </div>
                                <i className="fas fa-angle-right" />
                            </div>
                        </li>
                    </Link>
                    <Link to="/configurações/deletar-conta" style={{ textDecoration: 'none', width: '100%' }}>
                        <li
                            className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
                            id="delete-account"
                            style={{ fontSize: 'large' }}
                        >
                            <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px mt-10px">
                                sentiment_dissatisfied
                            </span>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div className="d-flex flex-column align-items-start">
                                    <span className="c-p-c-0 fw-500 fs-15 mr-10px">Apagar conta</span>
                                    <span className="c-secondary-grey fw-300 fs-13 mr-10px">Iremos sentir falta de você.</span>
                                </div>
                                <i className="fas fa-angle-right" />
                            </div>
                        </li>
                    </Link>
                </div>
            </div>
        </div>
    )
}