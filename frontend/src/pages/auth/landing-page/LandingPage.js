import React from 'react'
import { Link } from 'react-router-dom'
import DemoAddInterests from './components/DemoAddInterests'

import DemoAlgorithmSettings from './components/DemoAlgorithmSettings'
import DemoSearchProfiles from './components/DemoSearchProfiles'
import Wave from './components/Wave'

export default function LandingPage() {

    document.title = 'Bem Vindo / Napker'

    return (
        <div className="d-flex flex-column align-items-center">
            <div
                className="d-flex flex-column w-100 justify-content-center align-items-center"
                style={{ background: "linear-gradient(180deg,var(--primary-color-hover) -.45%,var(--primary-color) 20%)" }}>
                <div className="d-flex flex-column w-100 justify-content-center align-items-center" style={{ padding: "50px" }}>
                    <div className="d-flex flex-column w-50 justify-content-center align-items-center" style={{ textAlign: "center", padding: "20px" }}>
                        <h2 style={{ color: "var(--theme-base-color)", fontSize: "60px", fontWeight: "700" }}>Por que usar o Napker?</h2>
                        <h4 style={{ color: "var(--background)", fontSize: "20px" }}>
                            As grandes redes socias utilizam o gigantesco volume de dados gerados pelos usuários para alimentar algoritmos misteriosos que não temos acesso.
                            Esses algoritmos controlam a experiêcia do usuário na rede social visando mantê-lo o máximo de tempo possível no aplicativo, e criam modelos de usuários
                            para vender para anunciantes. O Napker foi pensado como uma alternativa a essas redes sociais. Com um algoritmo personalizável e um
                            sistema de interesses públicos e privados, o usuário tem total controle sobre a sua experiência na plataforma
                        </h4>
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
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <div className="w-100 d-flex flex-column justify-content-center align-items-center b-theme-base-color">
                    <div className="w-100 px-2 d-flex justify-content-center" style={{ padding: '120px 0 90px' }}>
                        <DemoAlgorithmSettings />
                    </div>
                    <Wave color="var(--tertiary-grey)" />
                </div>
                <div className="w-100 d-flex flex-column justify-content-center align-items-center b-tertiary-grey">
                    <div className="w-100 px-2 d-flex justify-content-center" style={{ padding: '120px 0 90px' }}>
                        <DemoAddInterests />
                    </div>
                    <Wave color="var(--theme-base-color)" />
                </div>
                <div className="w-100 d-flex justify-content-center b-theme-base-color">
                    <div className="w-100 d-flex justify-content-center" style={{ padding: '120px 12.5% 90px' }}>
                        <DemoSearchProfiles />
                    </div>
                    <Wave color="var(--primary-color)" />
                </div>
            </div>
            <div
                className="d-flex flex-column w-100 justify-content-start align-items-center"
                style={{ background: "linear-gradient(0deg,var(--primary-color-hover) -.45%,var(--primary-color) 50%)", padding: "50px", height: "300px" }}
            >
                <h2 style={{ color: "var(--theme-base-color)", fontSize: "40px", fontWeight: "700" }}>Gostou do que viu?</h2>
                <h4 style={{ color: "var(--background)", fontSize: "20px", padding: '25px' }}>
                    Entre no grupo de testadores no Discord para acompanhar as novidades e discutir novas mudanças.
                </h4>
                <div className="d-flex justify-content-between" style={{ width: "40%" }}>
                    <Link to="/signup">
                        <button className="btn-call" style={{ color: "var(--theme-base-color)", background: "var(--primary-grey)" }}>
                            Inscrever-se no Napker
                        </button>
                    </Link>
                    <button className="btn-call" style={{ color: "var(--primary-grey)", background: "var(--theme-base-color)" }}>
                        Entrar no grupo
                    </button>
                </div>
            </div>
        </div>
    )
}