import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../config/settings'
import { csrftoken } from '../../config/utils'
import Logo from '../../assets/icons/Logo'


export default function Signup() {

    document.title = 'Criar conta / Napker'

    return (
        <form
            action={`${SERVER_URL}/signup`}
            class="d-flex flex-column align-items-center primary-form"
            method="POST"
            style={{ width: '90vw', maxWidth: '600px', margin: '50px auto' }}
        >
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />

            <Logo />
            <h1 className="mt-3" style={{ fontSize: '30px' }}>Criar conta</h1>

            <div class="w-75 mt-3 d-flex justify-content-center">
                <input class="form-control" type="text" name="first-name" placeholder="Nome" style={{ marginRight: '4px' }} />
                <input class="form-control" type="text" name="last-name" placeholder="Sobrenome" style={{ marginLeft: '4px' }} />
            </div>

            <div class="w-75 mt-2 d-flex justify-content-center align-items-center">
                <input class="form-control" type="text" name="username" id="username" placeholder="Nome de usuário" style={{ marginRight: '4px' }} />
                <span class="d-none" id="username-taken" style={{ color: '#f00' }}>Nome de usuário já existe</span>

                <input class="form-control" type="date" name="birth-date" placeholder="Data de nascimento" style={{ marginLeft: '4px' }} />
            </div>

            <div class="w-75 mt-2 d-flex justify-content-center">
                <input class="form-control" type="email" name="email" id="email" placeholder="Email" />
                <span class="d-none" id="email-taken" style={{ color: '#f00' }}>Email já utilizado</span>
            </div>

            <div class="w-75 mt-2 d-flex justify-content-center">
                <input class="form-control" type="password" name="password" id="password" placeholder="Senha" style={{ marginRight: '4px' }} />
                <input class="form-control" type="password" name="passwordc" id="passwordc" placeholder="Confirmar senha" style={{ marginLeft: '4px' }} />
                <span class="d-none" id="invalid-password-1" style={{ color: '#f00' }}>As senhas devem ser iguais</span>
                <span class="d-none" id="invalid-password-2" style={{ color: '#f00' }}>A senha deve ter no mínimo 8 caracteres</span>
            </div>

            <button class="btn btn-primary w-75 mt-2 py-2" type="submit" id="submit-btn">Continuar</button>

            <ul class="w-100 d-flex justify-content-center mt-3" style={{ listStyle: 'none' }}>
                <li>
                    <Link to="/login">
                        <span className="mr-1">Já tem uma conta?</span>
                        <i class="fas fa-arrow-right"></i>
                    </Link>
                </li>
            </ul>
        </form>
    )
}