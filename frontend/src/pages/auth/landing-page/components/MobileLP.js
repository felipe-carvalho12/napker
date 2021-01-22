import React from 'react'

import { Link } from 'react-router-dom'

import Logo from '../../../../assets/icons/Logo'
import DemoAddInterests from './DemoAddInterests'
import DemoAlgorithmSettings from './DemoAlgorithmSettings'
import DemoSearchProfiles from './DemoSearchProfiles'
import Wave from './Wave'

export default function MobileLP() {

    return (
        <div className="d-flex flex-column align-items-center c-b-12" style={{ background: 'var(--p-g)', height: "100%", width: "100vw" }}>
            <div
                className="position-fixed d-flex justify-content-center align-items-center w-100 b-w-10 b-b blur-20px"
                style={{ top: '0', left: '0', zIndex: '20', height: "50px" }}
            >
                <div className="d-flex justify-content-between align-items-center w-100 px-10px">
                    <Logo size="30px" />
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/login">
                            <span className="c-b-09 fw-300 mr-10px">
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
                className="position-sticky d-flex flex-column w-100 justify-content-center align-items-center position-relative"
                style={{ top: '0', left: '0', zIndex: '0' }}
            >
                <div 
                    className="d-flex flex-column justify-content-center align-items-center w-100 pr-10px pl-20px"
                    style={{ paddingTop: "70px" }}
                >
                    <h2 className="c-w-10 fs-45 fw-700 fa-l">Por que usar o Napker?</h2>
                    <div className="d-flex flex-column align-items-center">
                        <h4 className="c-w-10 fs-21 fw-300 fa-l">
                            As grandes redes socias utilizam o gigantesco volume de dados gerados pelos usuários para alimentar algoritmos misteriosos.
                            Estes controlam a experiêcia do usuário visando mantê-lo o máximo de tempo possível na rede social e criam modelos de usuários para vender para anunciantes.
                            O Napker foi pensado como uma alternativa a essas plataformas. Com um algoritmo personalizável e um sistema de interesses públicos e privados,
                            o usuário tem total controle sobre a sua experiência no aplicativo.
                        </h4>
                        <div className="d-flex flex-column justify-content-between w-100">
                            <Link to="/login">
                                <button className="s-b-l c-b-09 b-w-10 w-100 mb-10px">
                                    Já tem uma conta?
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="s-b-l c-w-12 b-b-09 w-100">
                                    Inscrever-se
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Wave colors={["var(--w-06)", "var(--w-06)", "var(--w-06)", "var(--w-06)"]} />
            </div>
            <div 
                className="position-sticky flex-column w-100 vh-100 px-20px pt-20px d-flex blur-sat0-20px b-t" 
                style={{ top: '49px', left: '0', zIndex: '1', color: 'var(--b-09)', background: "rgba(255, 255, 255, 0.88)" }}
            >
                <h2>Experiência controlada pelo usuário, com todo o poder dos dados em suas mãos.</h2>
                <p className="mt-10px">
                    Os dados gerados nas redes sociais são valiosos pois permitem que quem tiver controle sobre
                    eles possa criar modelos de usuários de maneira muito precisa (baseado nos interesses, idade, etc)
                    e direcionar anúncios/conteúdos que condizem com esse modelo. No Napker você tem controle sobre os dados gerados na plataforma,
                    você pode customizar o algoritmo que cria esses "modelos" de usuários.
                </p>
                <p className="mt-10px">
                    Agora pensa no quão poderosa essa ferramenta pode ser. Você pode usar todo o poder dos dados
                    gerados no rede social para o que você quiser. Seja para encontrar pessoas que compartilhem dos mesmos interesses que você e fazer grandes amizades,
                    para encontrar um sócio que te complemente, para encontrar um(a) namorado(a) que tenha afinidade com você ou simplesmente para se sentir tranquilo quanto
                    o que estão fazendo com os seus dados. As possibilidades são enormes.
                </p>
            </div>
            <div 
                className="position-sticky flex-column w-100 vh-100 px-20px pt-20px d-flex blur-sat0-20px b-t" 
                style={{ top: '49px', left: '0', zIndex: '2', color: 'var(--b-09)', background: "rgba(255, 255, 255, 0.88)" }}
            >
                <div className="w-100">
                    <DemoAlgorithmSettings />
                </div>
            </div>
            <div 
                className="position-sticky flex-column w-100 vh-100 px-20px pt-20px d-flex blur-sat0-20px b-t" 
                style={{ top: '49px', left: '0', zIndex: '3', color: 'var(--b-09)', background: "rgba(255, 255, 255, 0.88)" }}
            >
                <h2>Sistema de interesses públicos e privados, conheça pessoas e faça novas amizades.</h2>
                <p className="mt-10px">
                    A maiorias das pessoas que fazem parte da sua vida apareceram nela de forma completamente aleatória. Isso pode não parecer um problema, mas
                    se você parar para pensar, muitas pessoas que teriam uma ótima relação com você vão morrer sem saber da sua existência. Talvez por terem desistido
                    de ir em uma festa onde viriam a te conhecer ou por aleatoriamente serem postos em uma turma diferente na escola. As relações na sua vida são contruídas
                    de forma passiva, o poder está com o acaso. Mas e se fosse possível criar relações de forma ativa? Onde você assume o controle e encontra essas pessoas
                    que "escapuliram" da sua vida... Pensando nisso o Napker possui um sistema de interesses públicos e privados.
                </p>
                <p className="mt-10px">
                    Os interesses públicos aparecem em seu perfil e, além de fazer ele ser recomendado a outras pessoas com esses mesmos interesses,
                    servem como um estímulo para outros usuários que possuam esses interesses se conectarem com você. Os interesses privados são interesses mais
                    particulares e servem apenas para aumentar a precisão nas recomendações de perfis e posts. Ao lado temos uma pequena demonstração de os interesses 
                    são adicionados ao perfil.
                </p>
            </div>
            <div 
                className="position-sticky flex-column w-100 vh-100 px-20px pt-20px d-flex blur-sat0-20px b-t" 
                style={{ top: '49px', left: '0', zIndex: '4', color: 'var(--b-09)', background: "rgba(255, 255, 255, 0.88)" }}
            >
                <DemoAddInterests />
            </div>
            <div 
                className="position-sticky flex-column w-100 vh-100 px-20px pt-20px d-flex blur-sat0-20px b-t" 
                style={{ top: '49px', left: '0', zIndex: '5', color: 'var(--b-09)', background: "rgba(255, 255, 255, 0.88)" }}
            >
                <h2>Pesquisa avançada de perfis baseada em interesses.</h2>
                <p className="mt-10px">
                    Os dados gerados nas redes sociais são valiosos pois permitem que quem tiver controle sobre
                    eles possa criar modelos de usuários de maneira muito precisa (baseado nos interesses, idade, etc)
                    e direcionar anúncios/conteúdos que condizem com esse modelo. No Napker você tem controle sobre os dados gerados na plataforma,
                    você pode customizar o algoritmo que cria esses "modelos" de usuários.
                </p>
                <p className="mt-10px">
                    Agora pensa no quão poderosa essa ferramenta pode ser. Você pode usar todo o poder dos dados
                    gerados no rede social para o que você quiser. Seja para encontrar pessoas que compartilhem dos mesmos interesses que você e fazer grandes amizades,
                    para encontrar um sócio que te complemente, para encontrar um(a) namorado(a) que tenha afinidade com você ou simplesmente para se sentir tranquilo quanto
                    o que estão fazendo com os seus dados. As possibilidades são enormes.
                </p>
            </div>
            <div 
                className="position-sticky flex-column w-100 vh-100 px-20px pt-20px d-flex blur-sat0-20px b-t" 
                style={{ top: '49px', left: '0', zIndex: '6', color: 'var(--b-09)', background: "rgba(255, 255, 255, 0.88)" }}
            >
                <DemoSearchProfiles />
            </div>
            <div
                className="position-sticky d-flex flex-column w-100 justify-content-start align-items-center lp-blur"
                style={{ top: '0', left: '0', zIndex: '7', height: "100vh", background: "var(--p-g)" }}
            >
                <div
                    className="d-flex flex-column w-100 justify-content-start align-items-center"
                >
                    <div 
                        className="d-flex flex-column justify-content-center align-items-center w-100 pr-10px pl-20px"
                        style={{ paddingTop: "70px" }}
                    >
                        <h2 style={{ color: "var(--w-10)", fontSize: "40px", fontWeight: "700" }}>Gostou do que viu?</h2>
                        <div className="d-flex flex-column align-items-center">
                            <h4 style={{ color: "var(--w-10)", fontSize: "20px" }}>
                                Entre no grupo de testadores no Discord para acompanhar as novidades e discutir novas mudanças.
                            </h4>
                            <div className="d-flex flex-column justify-content-between w-100">
                                <Link to="/login">
                                    <button className="s-b-l c-w-10 b-b-09 w-100 mb-10px">
                                        Já tem uma conta?
                                    </button>
                                </Link>
                                <button className="s-b-l c-b-09 b-w-10 w-100">
                                    Entrar no grupo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex flex-column h-100 w-100 justify-content-start align-items-center"
                >
                    <Wave colors={["var(--w-05)", "var(--w-05)", "var(--w-05)", "var(--w-05)"]} />
                    <div 
                        className="h-100 w-100"
                        style={{ background: "rgba(255, 255, 255, 0.88)" }}
                    >

                    </div>
                </div>
            </div>
        </div>
    )
}