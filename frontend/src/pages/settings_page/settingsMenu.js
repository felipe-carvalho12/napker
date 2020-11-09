import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/header'
import { SERVER_URL } from '../../settings'
import BlockUser from './blockUser'
import ChangePassword from './changePassword'
import DeleteAccount from './deleteAccount'

export default function Settings(props) {
    if (!props.page) props.page = 'block-user'

    document.title = 'Configurações / Napker'

    useEffect(() => {
        document.getElementById(props.page).classList.add('active')
    }, [])

    const pageChange = page => {
        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active')
        })
        document.getElementById(page).classList.add('active')
    }

    return (
        <>
            <Header page="Configurações" />
            <div className="content">
                <div className="settings-page-container">
                    <div className="settings-page-menu">
                        <Link to="/configurações/bloquear-usuário" style={{ textDecoration: 'none', width: '100%' }}>
                            <li id="block-user" onClick={() => pageChange('block-user')}>
                                Bloquear usuário
                            <i className="fas fa-angle-right"></i>
                            </li>
                        </Link>
                        <Link to="/configurações/alterar-senha" style={{ textDecoration: 'none', width: '100%' }}>
                            <li id="change-password" onClick={() => pageChange('change-password')}>
                                Mudar senha
                            <i className="fas fa-angle-right"></i>
                            </li>
                        </Link>
                        <Link to="/configurações/deletar-conta" style={{ textDecoration: 'none', width: '100%' }}>
                            <li id="delete-account" onClick={() => pageChange('delete-account')}>
                                Apagar conta
                            <i className="fas fa-angle-right"></i>
                            </li>
                        </Link>
                    </div>
                    {props.page === 'block-user' ?
                        <BlockUser />
                        :
                        <>
                            {props.page === 'change-password' ?
                                <ChangePassword />
                                :
                                <DeleteAccount />
                            }
                        </>
                    }
                </div>
            </div>
        </>
    )
}