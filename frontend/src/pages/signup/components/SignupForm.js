import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'
import Logo from '../../../assets/icons/Logo'


export default function SignupForm(props) {
    const [errMessage, setErrMessage] = useState(null)

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const usernameRef = useRef()
    const birthDateRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordcRef = useRef()

    const submitButtonRef = useRef()

    const handleInputChange = () => {
        submitButtonRef.current.disabled = (
            firstNameRef.current.value === '' || lastNameRef.current.value === '' ||
            usernameRef.current.value === '' || emailRef.current.value === '' || birthDateRef.current.value === '' ||
            passwordRef.current.value === '' || passwordcRef.current.value === ''
        )
    }

    const handleSignup = e => {
        e.preventDefault()
        fetch(`${SERVER_URL}/post-signup`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'first-name': firstNameRef.current.value,
                'last-name': lastNameRef.current.value,
                'username': usernameRef.current.value,
                'email': emailRef.current.value,
                'birth-date': birthDateRef.current.value,
                'password': passwordcRef.current.value,
                'passwordc': passwordRef.current.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'account created') {
                    props.setSignupPage('interests')
                    props.setMyUserId(data.userId)
                } else {
                    firstNameRef.current.value = ''
                    lastNameRef.current.value = ''
                    usernameRef.current.value = ''
                    birthDateRef.current.value = ''
                    emailRef.current.value = ''
                    passwordRef.current.value = ''
                    passwordcRef.current.value = ''
                    submitButtonRef.current.disabled = true
                    setErrMessage(data)
                }
            })
    }

    return (
        <form
            class="d-flex flex-column align-items-center primary-form"
            style={{ width: '90vw', maxWidth: '600px', margin: '50px auto' }}
            onSubmit={handleSignup}
        >
            <Logo />
            <h1 className="mt-3" style={{ fontSize: '30px' }}>Criar conta</h1>

            {errMessage !== null &&
                <div className="d-flex justify-content-center w-75 mt-1">
                    <span className="word-break" style={{ color: '#f00' }}>{errMessage}</span>
                </div>
            }

            <div class="w-75 mt-3 d-flex justify-content-center">
                <input
                    ref={firstNameRef}
                    class="form-control"
                    type="text"
                    placeholder="Nome"
                    style={{ marginRight: '4px' }}
                    onChange={handleInputChange}
                />
                <input
                    ref={lastNameRef}
                    class="form-control"
                    type="text"
                    placeholder="Sobrenome"
                    style={{ marginLeft: '4px' }}
                    onChange={handleInputChange}
                />
            </div>

            <div class="w-75 mt-2 d-flex justify-content-center align-items-center">
                <input
                    ref={usernameRef}
                    class="form-control"
                    type="text"
                    id="username"
                    placeholder="Nome de usuário"
                    style={{ marginRight: '4px' }}
                    onChange={handleInputChange}

                />
                <span class="d-none" id="username-taken" style={{ color: '#f00' }}>Nome de usuário já existe</span>

                <input
                    ref={birthDateRef}
                    class="form-control"
                    type="date"
                    placeholder="Data de nascimento"
                    style={{ marginLeft: '4px' }}
                    onChange={handleInputChange}
                />
            </div>

            <div class="w-75 mt-2 d-flex justify-content-center">
                <input
                    ref={emailRef}
                    class="form-control"
                    type="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                />
                <span class="d-none" id="email-taken" style={{ color: '#f00' }}>Email já utilizado</span>
            </div>

            <div class="w-75 mt-2 d-flex justify-content-center">
                <input
                    ref={passwordRef}
                    class="form-control"
                    type="password"
                    id="password"
                    placeholder="Senha"
                    style={{ marginRight: '4px' }}
                    onChange={handleInputChange}
                />
                <input
                    ref={passwordcRef}
                    class="form-control"
                    type="password"
                    id="passwordc"
                    placeholder="Confirmar senha"
                    style={{ marginLeft: '4px' }}
                    onChange={handleInputChange}
                />

                <span class="d-none" id="invalid-password-1" style={{ color: '#f00' }}>As senhas devem ser iguais</span>
                <span class="d-none" id="invalid-password-2" style={{ color: '#f00' }}>A senha deve ter no mínimo 8 caracteres</span>
            </div>

            <button ref={submitButtonRef} class="btn btn-primary w-75 mt-2 py-2" id="submit-btn" disabled>Continuar</button>

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