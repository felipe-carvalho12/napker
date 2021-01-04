import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import DemoAlgorithmSettings from './components/DemoAlgorithmSettings'

export default function LandingPage() {

    document.title = 'Bem Vindo / Napker'

    const [page, setPage] = useState(0)
    const pages = [<DemoAlgorithmSettings />]

    return (
        <div className="d-flex flex-column align-items-center">
            <div
                className="d-flex flex-column w-100 justify-content-center align-items-center"
                style={{ background: "linear-gradient(180deg,var(--primary-color-hover) -.45%,var(--primary-color) 20%)" }}>
                <div className="d-flex flex-column w-100 justify-content-center align-items-center" style={{ padding: "50px" }}>
                    <div className="d-flex flex-column w-50 justify-content-center align-items-center" style={{ textAlign: "center", padding: "20px" }}>
                        <h2 style={{ color: "var(--theme-base-color)", fontSize: "60px", fontWeight: "700" }}>Por que usar o Napker?</h2>
                        <span style={{ color: "var(--background)", fontSize: "20px" }}>
                            As grandes redes socias utilizam o gigantesco volume de dados gerados pelos usuários para alimentar algoritmos misteriosos que não temos acesso.
                            Esses algoritmos controlam a experiêcia do usuário na rede social visando mantê-lo o máximo de tempo possível no aplicativo, e criam modelos de usuários
                            para vender para anunciantes. O Napker foi pensado como uma alternativa a essas redes sociais. Com um algoritmo personalizável e um
                            sistema de interesses públicos e privados, o usuário tem total controle sobre a sua experiência na plataforma
                        </span>
                    </div>
                    <div className="d-flex justify-content-between" style={{ width: "40%" }}>
                        <Link to="/login">
                            <button className="btn-call" style={{ color: "var(--primary-grey)", background: "var(--theme-base-color)" }}>
                                Já tem uma conta?
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn-call" style={{ color: "var(--theme-base-color)", background: "var(--primary-grey)" }}>
                                Inscrever-se
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="position-relative w-100 p-3 d-flex justify-content-center align-items-center">
                <span class="material-icons position-absolute c-primary-color icon secondary-hover" style={{ top: '50%', left: '0', width: '50px', height: '50px', fontSize: '35px', marginTop: '-25px' }}>
                    arrow_back_ios
                </span>
                <span class="material-icons position-absolute c-primary-color icon secondary-hover" style={{ top: '50%', right: '0', width: '50px', height: '50px', fontSize: '35px', marginTop: '-25px' }}>
                    arrow_forward_ios
                </span>
                <div className="d-flex justify-content-center" style={{ width: '90%', margin: '120px 0' }}>
                    {pages[page]}
                </div>
            </div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path class="wavePath-haxJK1" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 
                447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 
                L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 
                981.704672,-7.57670281 826.337463,25.5396311 Z"
                    fill="var(--primary-color)">
                </path>
            </svg>
            <div
                className="d-flex flex-column w-100 justify-content-start align-items-center"
                style={{ background: "linear-gradient(0deg,var(--primary-color-hover) -.45%,var(--primary-color) 50%)", padding: "50px", height: "400px" }}
            >
                <h2 style={{ color: "var(--theme-base-color)", fontSize: "40px", fontWeight: "700" }}>Gostou do que viu?</h2>
                <Link to="/signup">
                    <button className="btn-call" style={{ color: "var(--theme-base-color)", background: "var(--primary-grey)" }}>
                        Inscrever-se no Napker
                    </button>
                </Link>
            </div>
        </div>
    )
}