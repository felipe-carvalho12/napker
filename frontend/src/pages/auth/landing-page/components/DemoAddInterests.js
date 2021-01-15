import React from 'react'

import PublicInterests from '../../../main-app/profile/pages/edit_interests/components/PublicInterests'
import PrivateInterests from '../../../main-app/profile/pages/edit_interests/components/PrivateInterests'


export default function DemoAddInterests() {

    return (
        <>
            <div className="w-50 h-100 ml-3">
                <h2>Sistema de interesses públicos e privados, conheça pessoas e faça novas amizades.</h2>
                <div>
                    <p className="mt-2">
                        A maiorias das pessoas que fazem parte da sua vida apareceram nela de forma completamente aleatória. Isso pode não parecer um problema, mas
                        se você parar para pensar, muitas pessoas que teriam uma ótima relação com você vão morrer sem saber da sua existência. Talvez por terem desistido
                        de ir em uma festa onde viriam a te conhecer ou por aleatoriamente serem postos em uma turma diferente na escola. As relações na sua vida são contruídas
                        de forma passiva, o poder está com o acaso. Mas e se fosse possível criar relações de forma ativa? Onde você assume o controle e encontra essas pessoas
                        que "escapuliram" da sua vida... Pensando nisso o Napker possui um sistema de interesses públicos e privados.
                    </p>
                    <p className="mt-2">
                        Os interesses públicos aparecem em seu perfil e, além de fazer ele ser recomendado a outras pessoas com esses mesmos interesses,
                        servem como um estímulo para outros usuários que possuam esses interesses se conectarem com você. Os interesses privados são interesses mais
                        particulares e servem apenas para aumentar a precisão nas recomendações de perfis e posts. Ao lado temos uma pequena demonstração de os interesses 
                        são adicionados ao perfil.
                    </p>
                </div>
            </div>
            <div className="p-3 w-25 ml-3 align-self-end b-b-01" style={{ borderRadius: '40px', minHeight: '450px' }}>
                <div className="pb-3" style={{ textAlign: 'start' }}>
                    <PublicInterests />

                    <div className="w-100 my-2 b-bottom" />

                    <PrivateInterests />
                </div>
            </div>
        </>
    )
}