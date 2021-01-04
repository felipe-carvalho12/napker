import React from 'react'


export default function DemoSearchProfiles() {

    return (
        <>
            <div className="p-3 w-50 mr-3 d-flex flex-column b-secondary-color" style={{ borderRadius: '40px', minHeight: '450px' }}>
                <div>
                    <div
                        className="mt-2 d-flex flex-row align-items-center w-100 p-2 b-theme-base-color tag-container"
                        style={{ borderRadius: '20px', border: '2px solid var(--primary-color)' }}
                    >
                        <div class="tag">
                            <span>elon musk</span>
                            <i class="material-icons">×</i>
                        </div>
                        <span className="mx-1">
                            e
                        </span>
                        <div class="tag">
                            <span>marte</span>
                            <i class="material-icons">×</i>
                        </div>
                    </div>
                    <div className="ml-3 text-secondary" style={{ marginBottom: '20px' }}>
                        Pesquisando perfis que possuem os interesses "elon musk" <strong>e</strong> "marte".
                    </div>
                </div>
                <div>
                    <div
                        className="mt-2 d-flex flex-row align-items-center w-100 p-2 b-theme-base-color tag-container"
                        style={{ borderRadius: '20px', border: '2px solid var(--primary-color)' }}
                    >
                        <div class="tag">
                            <span>programação</span>
                            <i class="material-icons">×</i>
                        </div>
                        <span className="mx-1">ou</span>
                        <div class="tag">
                            <span>python</span>
                            <i class="material-icons">×</i>
                        </div>
                        <span className="mx-1">ou</span>
                        <div class="tag">
                            <span>javascript</span>
                            <i class="material-icons">×</i>
                        </div>
                    </div>
                    <div className="ml-3 text-secondary" style={{ marginBottom: '20px' }}>
                        Pesquisando perfis que possuem o interesse "programação" <strong>ou</strong> "python" <strong>ou</strong> "javascript".
                    </div>
                </div>
                <div>
                    <div
                        className="mt-2 d-flex flex-row align-items-center w-100 p-2 b-theme-base-color tag-container"
                        style={{ borderRadius: '20px', border: '2px solid var(--primary-color)' }}
                    >
                        <div className="d-flex align-items-center">
                            <span style={{ fontSize: '30px', fontWeight: '300' }}>(</span>
                            <div class="tag">
                                <span>programação</span>
                                <i class="material-icons">×</i>
                            </div>
                            <span className="mx-1">ou</span>
                            <div class="tag">
                                <span>python</span>
                                <i class="material-icons">×</i>
                            </div>
                            <span className="mx-1">ou</span>
                            <div class="tag">
                                <span>javascript</span>
                                <i class="material-icons">×</i>
                            </div>
                            <span style={{ fontSize: '30px', fontWeight: '300' }}>)</span>
                        </div>
                        <span className="mx-1">e</span>
                        <div className="d-flex align-items-center">
                            <span style={{ fontSize: '30px', fontWeight: '300' }}>(</span>
                            <div class="tag">
                                <span>elon musk</span>
                                <i class="material-icons">×</i>
                            </div>
                            <span className="mx-1">ou</span>
                            <div class="tag">
                                <span>marte</span>
                                <i class="material-icons">×</i>
                            </div>
                            <span style={{ fontSize: '30px', fontWeight: '300' }}>)</span>
                        </div>
                    </div>
                    <div className="ml-3 text-secondary" style={{ marginBottom: '20px' }}>
                        Pesquisando perfis que possuem o interesse "programação" <strong>ou</strong> "python" <strong>ou</strong> "javascript" 
                        <strong> e</strong> o interesse "elon musk" <strong>ou</strong> "marte".
                    </div>
                </div>
            </div>
            <div className="w-50 h-100 ml-3">
                <h2>Pesquisa avançada de perfis baseada em interesses.</h2>
                <div>
                    <p className="mt-2">
                        Os dados gerados nas redes sociais são valiosos pois permitem que quem tiver controle sobre
                        eles possa criar modelos de usuários de maneira muito precisa (baseado nos interesses, idade, etc)
                        e direcionar anúncios/conteúdos que condizem com esse modelo. No Napker você tem controle sobre os dados gerados na plataforma,
                        você pode customizar o algoritmo que cria esses "modelos" de usuários.
                    </p>
                    <p className="mt-2">
                        Agora pensa no quão poderosa essa ferramenta pode ser. Você pode usar todo o poder dos dados
                        gerados no rede social para o que você quiser. Seja para encontrar pessoas que compartilhem dos mesmos interesses que você e fazer grandes amizades,
                        para encontrar um sócio que te complemente, para encontrar um(a) namorado(a) que tenha afinidade com você ou simplesmente para se sentir tranquilo quanto
                        o que estão fazendo com os seus dados. As possibilidades são enormes.
                    </p>
                </div>
            </div>
        </>
    )
}