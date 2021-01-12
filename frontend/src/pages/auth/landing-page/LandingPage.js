import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../../assets/icons/Logo'
import DemoAddInterests from './components/DemoAddInterests'
import DemoAlgorithmSettings from './components/DemoAlgorithmSettings'
import DemoSearchProfiles from './components/DemoSearchProfiles'
import Wave from './components/Wave'

export default function LandingPage() {

    document.title = 'Bem Vindo / Napker'

    return (
        <div className="d-flex flex-column align-items-center" style={{ color: 'var(--lp-b-12)', background: 'var(--lp-w-12)' }}>
            <div
                className="position-fixed d-flex justify-content-center align-items-center w-100"
                style={{ top: '0', left: '0', zIndex: '10000', background: "var(--lp-b-02)" }}
            >
                <div className="d-flex justify-content-between align-items-center w-75 p-3">
                    <Logo />
                    <div className="d-flex justify-content-between">
                        <Link to="/login">
                            <button className="btn btn-primary m-0 mr-2">
                                Já tem uma conta?
                        </button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-primary m-0">
                                Inscrever-se
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className="d-flex flex-column w-100 justify-content-center align-items-center position-relative b-primary-color"
                style={{ zIndex: '20000' }}
            >
                <div className="w-100" style={{ background: "linear-gradient(180deg,var(--lp-c-b4) -.45%,var(--primary-color) 40%)", padding: "50px" }}>
                    <div className="d-flex flex-column w-150 justify-content-center align-items-center" style={{ textAlign: "center", padding: "20px" }}>
                        <h2 style={{ color: "var(--lp-b-09)", fontSize: "60px", fontWeight: "700" }}>Por que usar o Napker?</h2>
                        <div className="d-flex flex-column align-items-center">
                            <h4 style={{ color: "var(--lp-b-08)", fontSize: "20px" }}>
                                As grandes redes socias utilizam o gigantesco volume de dados gerados pelos usuários para alimentar algoritmos misteriosos que não temos acesso.
                                Esses algoritmos controlam a experiêcia do usuário na rede social visando mantê-lo o máximo de tempo possível no aplicativo, e criam modelos de usuários
                                para vender para anunciantes. O Napker foi pensado como uma alternativa a essas redes sociais. Com um algoritmo personalizável e um
                                sistema de interesses públicos e privados, o usuário tem total controle sobre a sua experiência na plataforma
                            </h4>
                            <div className="d-flex justify-content-between p-3" style={{ width: "50%" }}>
                                <Link to="/login">
                                    <button className="btn-call" style={{ color: "var(--lp-b-09)", background: "var(--lp-w-12)" }}>
                                        Já tem uma conta?
                                </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="btn-call" style={{ color: "var(--lp-w-12)", background: "var(--lp-b-09)" }}>
                                        Inscrever-se
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <div className="w-100 d-flex flex-column justify-content-center align-items-center b-theme-base-color">
                    <div className="w-100 px-2 d-flex justify-content-center" style={{ padding: '120px 0 90px', color: 'var(--lp-b-09)' }}>
                        <DemoAlgorithmSettings />
                    </div>
                    <Wave color="var(--lp-b-02)" />
                </div>
                <div className="w-100 d-flex flex-column justify-content-center align-items-center b-tertiary-grey">
                    <div className="w-100 px-2 d-flex justify-content-center" style={{ padding: '120px 0 90px', color: 'var(--lp-b-09)' }}>
                        <DemoAddInterests />
                    </div>
                    <Wave color="var(--theme-base-color)" />
                </div>
                <div className="w-100 d-flex justify-content-center b-theme-base-color">
                    <div className="w-100 d-flex justify-content-center" style={{ padding: '120px 12.5% 90px', color: 'vvar(--lp-b-09)' }}>
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
                <div className="d-flex flex-column align-items-center">
                    <h4 style={{ color: "var(--background)", fontSize: "20px", padding: '25px' }}>
                        Entre no grupo de testadores no Discord para acompanhar as novidades e discutir novas mudanças.
                    </h4>
                    <div className="d-flex justify-content-between mt-2" style={{ width: "80%" }}>
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
        </div>
    )
}