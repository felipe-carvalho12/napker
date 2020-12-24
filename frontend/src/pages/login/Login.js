import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../config/settings'
import { csrftoken } from '../../config/utils'
import Logo from '../../assets/icons/Logo'


export default function Login() {

    document.title = 'Entrar / Napker'

    return (
        <form
            action={`${SERVER_URL}/login`}
            class="d-flex flex-column align-items-center primary-form"
            method="POST"
            style={{ width: '90vw', maxWidth: '600px', margin: '50px auto' }}
        >
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />

            <Logo />
            <h1 className="mt-3" style={{ fontSize: '30px' }}>Entrar no Napker</h1>

            <div class="w-75 mt-3 d-flex justify-content-center">
                <input class="form-control w-100" type="text" name="username" placeholder="Nome de usuário" />
            </div>

            <div class="w-75 mt-2 d-flex justify-content-center">
                <input class="form-control w-100" type="password" name="password" placeholder="Senha" />
            </div>

            <button class="btn btn-primary w-75 mt-2 py-2" type="submit">Entrar</button>

            <ul class="w-100 d-flex justify-content-center text-center mt-3" style={{ listStyle: 'none' }}>
                <li style={{ marginLeft: '12px' }}>
                    <Link to="/recuperar-senha">
                        <span>Esqueceu sua senha?</span>
                    </Link>
                </li>
                <li>
                    <span style={{ margin: '0 5px', color: 'var(--primary-color)' }}>•</span>
                </li>
                <li>
                    <Link to="/signup">
                        <span>Inscrever-se no Napker</span>
                    </Link>
                </li>
            </ul>
        </form>
    )
}