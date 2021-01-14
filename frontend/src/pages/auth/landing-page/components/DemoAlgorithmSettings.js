import React from 'react'

import AlgorithmSettings from '../../../../components/fixed/sidebar-right/components/home-sidebar/components/algorithm-settings/AlgorithmSettings'

export default function DemoAlgorithmSettings() {

    return (
        <>
            <div className="p-3 w-25 mr-3 b-lp-b-01" style={{ borderRadius: '40px', minHeight: '450px' }}>
                <AlgorithmSettings renderInfoIcon={false} isDemo={true} isMobile={true} minHeight='400px' />
            </div>
            <div className="w-50 h-100 ml-3">
                <h2>Experiência controlada pelo usuário, com todo o poder dos dados em suas mãos.</h2>
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
                    <p className="mt-2">
                        Ao lado temos um exemplo de como funciona essa customização do algoritmo. Para calcular a relevância de um post ou perfil para você
                        utilizamos um sistema de pesos, ou seja, são levado em consideração alguns critérios (como os que estão aqui ao lado) e quanto maior o peso do critério,
                        mais relevante ele será na hora de calcularmos a relevância de um usuário ou post para a você. Os pesos são divididos em duas categorias: perfis (pesos utilizados
                        para calcular a relevância de um perfil) e posts (pesos utilizados para calcular a relevância de um post).
                    </p>
                </div>
            </div>
        </>
    )
}