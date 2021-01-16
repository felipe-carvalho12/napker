import { green, grey } from '@material-ui/core/colors'
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
        <div className="d-flex flex-column align-items-center c-b-12 b-w-12" style={{ color: 'var(--b-12)', background: 'var(--w-12)' }}>
            <div
                className="position-fixed d-flex justify-content-center align-items-center w-100 b-w-10 b-b blur"
                style={{ top: '0', left: '0', zIndex: '10000', height: "50px" }}
            >
                <div className="d-flex justify-content-between align-items-center w-75">
                    <Logo size="30px" />
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/login">
                            <span className="c-b-09 fw-300 mr-2">
                                Já tem uma conta?
                            </span>
                        </Link>
                        <Link to="/signup" >
                            <button className="p-b-s b-primary-color c-w-12">
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
                <div className="d-flex flex-column justify-content-center  align-items-center w-100" style={{ background: "var(--p-g)" }}>
                    <div className="d-flex flex-column justify-content-center  align-items-center w-100" style={{ padding: "50px" }}>
                        <div className="d-flex flex-column w-75 justify-content-center align-items-center" style={{ textAlign: "center", padding: "20px" }}>
                            <h2 style={{ color: "var(--w-10)", fontSize: "60px", fontWeight: "700" }}>Por que usar o Napker?</h2>
                            <div className="d-flex flex-column align-items-center">
                                <h4 style={{ color: "var(--w-10)", fontSize: "20px" }}>
                                    As grandes redes socias utilizam o gigantesco volume de dados gerados pelos usuários para alimentar algoritmos misteriosos.
                                    Estes controlam a experiêcia do usuário visando mantê-lo o máximo de tempo possível na rede social e criam modelos de usuários para vender para anunciantes.
                                    O Napker foi pensado como uma alternativa a essas plataformas. Com um algoritmo personalizável e um sistema de interesses públicos e privados,
                                    o usuário tem total controle sobre a sua experiência no aplicativo.
                                </h4>
                                <div className="d-flex justify-content-between p-3">
                                    <Link to="/login">
                                        <button className="s-b-l c-b-09 b-w-10 mr-3">
                                            Já tem uma conta?
                                        </button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="s-b-l c-w-12 b-b-09 ml-3">
                                            Inscrever-se
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Wave colors={["var(--s-b-00)", "var(--w-10)"]} />
                </div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <div className="position-sticky w-100 vh-100 px-2 d-flex justify-content-center b-s-b-00" style={{ top: '0', left: '0', zIndex: '0', padding: '120px 0 90px', color: 'var(--b-09)' }}>
                    <DemoAlgorithmSettings />
                </div>
                <div className="position-sticky w-100 b-t blur" style={{ top: '0', left: '0', zIndex: '1' }}>
                    <div className="vh-100 w-100 d-flex flex-column justify-content-start align-items-center b-b-00">
                        <div className="w-100 px-2 d-flex justify-content-center" style={{ padding: '120px 0 90px', color: 'var(--b-09)' }}>
                            <DemoAddInterests />
                        </div>
                    </div>
                </div>
                <div className="position-sticky w-100 b-t blur" style={{ top: '0', left: '0', zIndex: '2' }}>
                    <div className="vh-100 w-100 d-flex justify-content-center b-b-01">
                        <div className="w-100 d-flex justify-content-center" style={{ padding: '120px 12.5% 90px', color: 'var(--b-09)' }}>
                            <DemoSearchProfiles />
                        </div>
                    </div>
                </div>
                <div
                    className="position-sticky d-flex flex-column w-100 justify-content-start align-items-center blur"
                    style={{ top: '0', left: '0', zIndex: '3', height: "50vh", background: "var(--p-g)" }}
                >
                    <div
                        className="position-sticky d-flex flex-column w-100 justify-content-start align-items-center"
                        style={{ padding: "50px", height: "100%" }}
                    >
                        <h2 style={{ color: "var(--w-10)", fontSize: "40px", fontWeight: "700" }}>Gostou do que viu?</h2>
                        <div className="d-flex flex-column align-items-center">
                            <h4 style={{ color: "var(--w-10)", fontSize: "20px", padding: '25px' }}>
                                Entre no grupo de testadores no Discord para acompanhar as novidades e discutir novas mudanças.
                            </h4>
                            <div className="d-flex justify-content-between mt-2" style={{ width: "80%" }}>
                                <Link to="/signup">
                                    <button className="s-b-l b-b-09 c-w-12">
                                        Inscrever-se no Napker
                                    </button>
                                </Link>
                                <button className="s-b-l c-b-09 b-w-10">
                                    Entrar no grupo
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="position-sticky d-flex vw-50 flex-column w-100 justify-content-start align-items-center"
                        style={{ top: '0', left: '0', zIndex: '4' }}
                    >
                        <Wave colors={["var(--s-w-12)", "var(--w-10)"]} />
                        <div className="vh-50 w-100 d-flex flex-column justify-content-start align-items-center b-w-10">
                            <div className="vh-50 w-100 d-flex flex-column justify-content-start align-items-center b-w-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}