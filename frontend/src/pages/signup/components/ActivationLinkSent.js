import React from 'react'
import Logo from '../../../assets/icons/Logo'


export default function ActivationLinkSent() {

    return (
        <div
            class="position-absolute d-flex flex-column align-items-start"
            style={{ top: '15%', left: '10%' }}
        >
            <Logo size="35pt" />
            <h3 className="my-3">Tudo certinho! Agora basta ativar a sua conta...</h3>
            <p className="pb-3" style={{ fontSize: 'large' }}>Enviamos um link de ativação para o seu email. Clique nele para ativar a sua conta.</p>
            <p className="pt-3 hover-underline hover-pointer" id="email-not-sent" style={{ color: 'var(--primary-color)', fontSize: 'large' }}>Não recebi o email</p>
        </div>
    )
}