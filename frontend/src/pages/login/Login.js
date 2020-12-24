import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL, LOGO_URL } from '../../config/settings'
import { csrftoken } from '../../config/utils'


export default function Login() {

    return (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center" style={{ background: 'var(--theme-base-color)' }}>
            <form action={`${SERVER_URL}/login`} class="d-flex flex-column" method="POST">
                <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                <div>
                    <img src={`${SERVER_URL}${LOGO_URL}`} style={{ width: '50px' }} />
                </div>
                <div>Entrar no Napker</div>
                <div class="form-group">
                    <span class="input-icon"><i class="fas fa-user"></i></span>
                    <input class="form-control" type="text" name="username" placeholder="Nome de usuário" />
                </div>
                <div class="form-group">
                    <span class="input-icon"><i class="fas fa-lock"></i></span>
                    <input class="form-control" type="password" name="password" placeholder="Senha" />
                </div>

                <button class="btn btn-primary" type="submit">Entrar</button>

                <ul class="form-options">
                    <li>
                        <span>Esqueceu sua senha?</span>
                    </li>
                    <li>
                        <Link to="/signup">
                            <span>Criar conta</span>
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}