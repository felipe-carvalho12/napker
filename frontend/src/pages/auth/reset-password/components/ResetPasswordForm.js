import React, { useRef } from 'react'

import { SERVER_URL } from '../../../../config/settings'
import { csrftoken } from '../../../../config/utils'
import Logo from '../../../../assets/icons/Logo'


export default function ResetPasswordForm(props) {
    const emailRef = useRef()
    const submitButtonRef = useRef()

    const handleInputChange = () => {
        submitButtonRef.current.disabled = emailRef.current.value === ''
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.setResetPasswordPage('page-loader')
        fetch(`${SERVER_URL}/post-reset-password`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'email': emailRef.current.value,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data == 'email sent') {
                    props.setResetPasswordPage('email-sent')
                } else {
                    props.setResetPasswordPage('email-does-not-exists')
                }
            })
    }

    return (
        <div style={{ width: '98vw', height: '90vh', background: 'var(--theme-base-color)' }}>
            <form
                className="d-flex flex-column align-items-center primary-form"
                style={{ width: '90%', maxWidth: '600px', margin: '50px auto' }}
                onSubmit={handleSubmit}
            >
                <Logo size="30pt" />
                <h1 className="mt-3" style={{ fontSize: '30px' }}>Esqueceu sua senha?</h1>

                <p>Por favor confirme o email ligado a sua conta.</p>

                {props.errMessage !== null &&
                    <div className="w-75 d-flex justify-content-center">
                        <span className="word-break" style={{ color: '#f00' }}>{props.errMessage}</span>
                    </div>
                }

                <div className="w-75 mt-3 d-flex justify-content-center">
                    <input ref={emailRef} className="form-control w-100" type="email" placeholder="Email" onChange={handleInputChange} />
                </div>

                <button
                    ref={submitButtonRef}
                    className="btn btn-primary w-75 mt-10px py-2"
                    disabled
                >Confirmar
            </button>

                <ul className="w-100 d-flex justify-content-center text-center mt-3" style={{ listStyle: 'none' }}>
                    <li className="hover-underline hover-pointer" style={{ color: 'var(--primary-color)' }} onClick={() => window.history.back()}>
                        <i class="fas fa-arrow-left"></i>
                        <span className="ml-1">Voltar</span>
                    </li>
                </ul>
            </form>
        </div>
    )
}