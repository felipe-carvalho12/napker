import React from 'react'


export default function DemoSearchProfiles() {
    const isMobile = visualViewport.width <= 980

    return (
        <>
            <div
                className="mt-10px d-flex flex-row align-items-center w-100 p-2 b-theme-base-color tag-container"
                style={{ borderRadius: '10px', border: '2px solid var(--primary-color)' }}
            >
                <span className="fw-500 c-p-c-0">elon musk</span>
                <span className="mx-1">
                    e
                </span>
                <span className="fw-500 c-p-c-0">marte</span>
            </div>
            <div className="ml-3 text-secondary" style={{ marginBottom: '20px' }}>
                Pesquisando perfis que possuem os interesses "elon musk" <strong>e</strong> "marte".
            </div>
            <div
                className="mt-10px d-flex flex-row align-items-center w-100 p-2 b-theme-base-color tag-container"
                style={{ borderRadius: '10px', border: '2px solid var(--primary-color)' }}
            >
                <span className="fw-500 c-p-c-0">programação</span>
                <span className="mx-1">ou</span>
                <span className="fw-500 c-p-c-0">python</span>
                <span className="mx-1">ou</span>
                <span className="fw-500 c-p-c-0">javascript</span>
            </div>
            <div className="ml-3 text-secondary" style={{ marginBottom: '20px' }}>
                Pesquisando perfis que possuem o interesse "programação" <strong>ou</strong> "python" <strong>ou</strong> "javascript".
            </div>
            <div
                className="mt-10px d-flex flex-row align-items-center w-100 p-2 b-theme-base-color tag-container"
                style={{ borderRadius: '10px', border: '2px solid var(--primary-color)' }}
            >
                    <div className="d-flex align-items-center">
                        <span className="fs-31 fw-300">(</span>
                        <span className="fw-500 c-p-c-0">programação</span>
                        <span className="mx-1">ou</span>
                        <span className="fw-500 c-p-c-0">python</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="mx-1">ou</span>
                        <span className="fw-500 c-p-c-0">javascript</span>
                        <span className="fs-31 fw-300">)</span>
                    </div>
                <span className="mx-1">e</span>
                <div className="d-flex align-items-center">
                    <span className="fs-31 fw-300">(</span>
                    <span className="fw-500 c-p-c-0">elon musk</span>
                    <span className="mx-1">ou</span>
                    <span className="fw-500 c-p-c-0">marte</span>
                    <span className="fs-31 fw-300">)</span>
                </div>
            </div>
            <div className="ml-3 text-secondary" style={{ marginBottom: '20px' }}>
                Pesquisando perfis que possuem o interesse "programação" <strong>ou</strong> "python" <strong>ou</strong> "javascript" 
                <strong> e</strong> o interesse "elon musk" <strong>ou</strong> "marte".
            </div>
        </>
    )
}