import React from 'react'

export default function NotFound() {

    document.title = 'Página não encontrada / Napker'

    return (
        <div 
            className="d-flex flex-column align-items-center justify-content-center c-b-12 b-w-12" 
            style={{ 
                color: 'var(--b-12)', 
                background: 'var(--background)',
                height: "100vh",
                width: "925px"
            }}
        >
            <span className="c-p-c-0 fw-500 fs-45 mr-10px">404</span>
            <span className="c-secondary-grey fw-300 fs-21 fa-l mr-10px">O caminho que você digitou não foi encontrado.</span>
        </div>
    )
}