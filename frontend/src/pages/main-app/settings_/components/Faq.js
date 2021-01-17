import React from 'react'
import { Link } from 'react-router-dom'


export default function Faq() {

    return (
        <div className="settings-description-container b-t-r-r b-b-r-r b-theme-base-color">
            <h3 className="c-primary-color p-30px">FAQ</h3>
            <Link to="/configurações/alterar-senha" style={{ textDecoration: 'none', width: '100%' }}>
                <li
                    className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
                    style={{ fontSize: 'large' }}
                >
                    <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px mt-10px">
                        vpn_key
                    </span>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <div className="d-flex flex-column align-items-start">
                            <span className="c-p-c-0 fw-500 fs-15 mr-10px">Como alterar minha senha?</span>
                            <span className="c-secondary-grey fw-300 fs-13 fa-l mr-10px">Você pode alterar a sua senha a qualquer momento clicando aqui ou pelo menu de segurança.</span>
                        </div>
                        <i className="fas fa-angle-right" />
                    </div>
                </li>
            </Link>
            <Link to="/perfil/meus-interesses" style={{ textDecoration: 'none', width: '100%' }}>
                <li
                    className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
                    style={{ fontSize: 'large' }}
                >
                    <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px mt-10px">
                        psychology
                    </span>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <div className="d-flex flex-column align-items-start">
                            <span className="c-p-c-0 fw-500 fs-15 mr-10px">O que são interesses?</span>
                            <span className="c-secondary-grey fw-300 fs-13 fa-l mr-10px">Você pode alterar a sua senha a qualquer momento.</span>
                        </div>
                        <i className="fas fa-angle-right" />
                    </div>
                </li>
            </Link>
            <Link to="/perfil/meus-interesses" style={{ textDecoration: 'none', width: '100%' }}>
                <li
                    className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
                    style={{ fontSize: 'large' }}
                >
                    <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px mt-10px">
                        compare_arrows
                    </span>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div className="d-flex flex-column align-items-start">
                                    <span className="c-p-c-0 fw-500 fs-15 mr-10px">Como alterar interesses?</span>
                                    <span className="c-secondary-grey fw-300 fs-13 fa-l mr-10px">Você pode alterar a sua senha a qualquer momento.</span>
                                </div>
                                <i className="fas fa-angle-right" />
                            </div>
                </li>
            </Link>
            <Link to="/perfil/meus-interesses" style={{ textDecoration: 'none', width: '100%' }}>
                <li
                    className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
                    style={{ fontSize: 'large' }}
                >
                    <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px mt-10px">
                        lock
                    </span>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div className="d-flex flex-column align-items-start">
                                    <span className="c-p-c-0 fw-500 fs-15 mr-10px">O que são interesses públicos/privados?</span>
                                    <span className="c-secondary-grey fw-300 fs-13 fa-l mr-10px">Você pode alterar a sua senha a qualquer momento.</span>
                                </div>
                                <i className="fas fa-angle-right" />
                            </div>
                </li>
            </Link>
            <Link to="/home" style={{ textDecoration: 'none', width: '100%' }}>
                <li
                    className="w-100 d-flex align-items-center px-3 py-2 c-primary-grey base-hover"
                    style={{ fontSize: 'large' }}
                >
                    <span class="material-icons-outlined c-secondary-grey align-self-start fs-27 mr-10px mt-10px">
                        pan_tool
                    </span>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <div className="d-flex flex-column align-items-start">
                                    <span className="c-p-c-0 fw-500 fs-15 mr-10px">Como denunciar usuários?</span>
                                    <span className="c-secondary-grey fw-300 fs-13 fa-l mr-10px">Você pode alterar a sua senha a qualquer momento.</span>
                                </div>
                                <i className="fas fa-angle-right" />
                            </div>
                </li>
            </Link>
        </div>
    )
}