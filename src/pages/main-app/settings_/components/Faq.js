import React from 'react'


export default function Faq() {

    return (
        <div className="settings-description-container">
            <div style={{ padding: '15px', borderBottom: '1px solid var(--border-color)' }}>
                <h3>FAQ</h3>
            </div>
            <div className="faq-content">
                <div className="faq-center">
                    <details>
                        <summary>
                            <h2>Como alterar minha senha?</h2>
                        </summary>
                        <p>O usuário deverá entrar no menu configurações e abrir a sessão [Segurança], onde encontrará a possibilidade de [Alterar Senha], acompanhada de instruções.</p>
                    </details>
                    <details open>
                        <summary>
                            <h2>O que são interesses?</h2>
                        </summary>
                        <p>Lorem ipsum dolor sit amet, vocent viderer tamquam his ad, mei ut atqui gubergren. Aperiri appareat reprehendunt an cum, ullum dicta debet has te. Has posse doming scribentur ex, qui ea rebum soleat. Vel aeterno aperiri in.</p>
                    </details>
                    <details>
                        <summary>
                            <h2>Como alterar interesses?</h2>
                        </summary>
                        <p>Lorem ipsum dolor sit amet, vocent viderer tamquam his ad, mei ut atqui gubergren. Aperiri appareat reprehendunt an cum, ullum dicta debet has te. Has posse doming scribentur ex, qui ea rebum soleat. Vel aeterno aperiri in.</p>
                    </details>
                    <details>
                        <summary>
                            <h2>O que são interesses públicos/privados?</h2>
                        </summary>
                        <p>Lorem ipsum dolor sit amet, vocent viderer tamquam his ad, mei ut atqui gubergren. Aperiri appareat reprehendunt an cum, ullum dicta debet has te. Has posse doming scribentur ex, qui ea rebum soleat. Vel aeterno aperiri in.</p>
                    </details>
                    <details>
                        <summary>
                            <h2>Como denunciar usuários?</h2>
                        </summary>
                        <p>Lorem ipsum dolor sit amet, vocent viderer tamquam his ad, mei ut atqui gubergren. Aperiri appareat reprehendunt an cum, ullum dicta debet has te. Has posse doming scribentur ex, qui ea rebum soleat. Vel aeterno aperiri in.</p>
                    </details>
                </div>
            </div>
        </div>

    )
}