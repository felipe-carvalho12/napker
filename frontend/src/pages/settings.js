import React from 'react'
import Header from '../components/header'

export default function Settings() {

    document.title = 'Configurações / Napker'

    return (
        <>
            <Header page="Configurações" />
            <div className="content">
                Configurações
            </div>
        </>
    )
}