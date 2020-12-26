import React from 'react'

import Logo from '../../../../assets/icons/Logo'


export default function EmailSent() {

    return (
        <div
            class="position-absolute d-flex flex-column align-items-start"
            style={{ top: '15%', left: '10%' }}
        >
            <Logo size="35pt" />
            <h3 className="my-3">Tudo certinho!</h3>
            <p className="pb-3" style={{ fontSize: 'large' }}>Enviamos um email para você com um link para você criar uma nova senha...</p>
            <p
                className="pt-3 hover-underline hover-pointer"
                style={{ color: 'var(--primary-color)', fontSize: 'large' }}
                onClick={() => window.alert('Verifique se o email está na caixa de spam.')}
            >
                Não recebi o email
            </p>
        </div>
    )
}