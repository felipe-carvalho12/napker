import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {

    document.title = 'Bem Vindo / Napker'

    return (
        <div className="d-flex flex-column align-items-center" style={{ width: "100vw" }}>
            <div
                className="d-flex flex-column w-100 justify-content-center align-items-center"
                style={{ background: "linear-gradient(180deg,var(--primary-color-hover) -.45%,var(--primary-color) 20%)" }}>
                <div className="d-flex flex-column w-100 justify-content-center align-items-center" style={{ padding: "50px" }}>
                    <div className="d-flex flex-column w-50 justify-content-center" style={{ textAlign: "center", padding: "20px" }}>
                        <h2 style={{ color: "var(--theme-base-color)", fontSize: "60px", fontWeight: "700" }}>Por que usar o Napker?</h2>
                        <span style={{ color: "var(--background)", fontSize: "20px" }}>
                            MARK ZUCKERBERG: Well, yeah. I think in a lot of ways, over the last few years, we have changed, significantly, how we've run the company. We are, you know, dealing with a lot of major social issues, right, everything from policing harmful content, to protecting the integrity of elections, to making sure that data privacy controls are strong. And the big journey that we've been on, over the last few years, is really getting much more proactive about seeking out where there might be issues and making sure we're investing appropriately to handle them. You know, we now are doing way more on each of those fronts, in order to identify issues that come up and get ahead.
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
                                Inscrever-se no Napker
                            </button>
                        </Link>
                    </div>
                </div>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path class="wavePath-haxJK1" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383
                     C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983
                      1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="var(--fixed-components-background)">
                    </path>
                </svg>
            </div>
            <div className="d-flex flex-column align-self-center" style={{ width: "60%" }}>
                <div className="d-flex w-100 justify-content-between" style={{ padding: "30px" }}>
                    <div className="d-flex h-100 justify-content-center align-items-center" style={{ width: "40%" }}>
                        Imagem do lekinho
                    </div>
                    <div className="d-flex h-100 justify-content-center align-items-center" style={{ width: "40%" }}>
                        STEPHANOPOULOS: The issues keep coming. Even as we were just about to sit down,
                        I got a bulletin from Bloomberg News. I'll pull it up right now.
                        It says that "Facebook user data is still showing up in places it shouldn't.
                        Researchers at a cybersecurity firm found troves of user information hiding in plain sight,"
                        apparently, millions of records on the Amazon cloud. Are we going to keep seeing surprises like this?
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-between" style={{ padding: "30px" }}>
                    <div className="d-flex h-100 justify-content-center align-items-center" style={{ width: "40%" }}>
                        Imagem do lekinho
                    </div>
                    <div className="d-flex h-100 justify-content-center align-items-center" style={{ width: "40%" }}>
                        ZUCKERBERG: Well, I just saw that. So we're still looking into this.
                        And you know, in general, we work with developers to make sure that
                        they're respecting people's information and using it in only ways that they want.
                        But one of the reasons why I started -- why I wrote this op-ed, over the weekend,
                        around areas where I think regulation would be helpful.
                        Where it would be useful to spell out clearly what the responsibilities
                        that we want companies and people and governments to have are, I think, as we work
                        through a lot of these issues, there are a lot of decisions that I just think people
                        don't want a single private company to be making, right? So for example...
                    </div>
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