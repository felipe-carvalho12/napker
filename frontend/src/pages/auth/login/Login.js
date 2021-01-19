import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'
import Logo from '../../../assets/icons/Logo'


export default function Login() {
    const [errMessage, setErrMessage] = useState(null)
    
    const usernameRef = useRef()
    const passwordRef = useRef()
    const submitButtonRef = useRef()

    document.title = 'Entrar / Napker'

    const handleInputChange = () => {
        submitButtonRef.current.disabled = usernameRef.current.value === ''  || passwordRef.current.value === ''
    }

    const handleLogin = e => {
        e.preventDefault()
        fetch(`${SERVER_URL}/post-login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'username': usernameRef.current.value,
                'password': passwordRef.current.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'logged in') window.location.href = '/home'
                else {
                    usernameRef.current.value = ''
                    passwordRef.current.value = ''
                    submitButtonRef.current.disabled = true
                    setErrMessage(data)
                }
            })
    }

    return (
        <form
            className="d-flex flex-column align-items-center primary-form"
            style={{ width: '90vw', maxWidth: '600px', margin: '50px auto' }}
            onSubmit={handleLogin}
        >
            <Logo size="30pt" />
            <h1 className="mt-3" style={{ fontSize: '30px' }}>Entrar no Napker</h1>

            {errMessage !== null &&
                <div className="w-75 mt-1">
                    <span className="word-break" style={{ color: '#f00' }}>{errMessage}</span>
                </div>
            }

            <div className="w-75 mt-3 d-flex justify-content-center">
                <input ref={usernameRef} className="form-control w-100" type="text" placeholder="Nome de usuário" onChange={handleInputChange} />
            </div>

            <div className="w-75 mt-10px d-flex justify-content-center">
                <input ref={passwordRef} className="form-control w-100" type="password" placeholder="Senha" onChange={handleInputChange} />
            </div>

            <button
                ref={submitButtonRef}
                className="btn btn-primary w-75 mt-10px py-2"
                disabled
            >Entrar
            </button>

            <ul className="w-100 d-flex justify-content-center text-center mt-3" style={{ listStyle: 'none' }}>
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