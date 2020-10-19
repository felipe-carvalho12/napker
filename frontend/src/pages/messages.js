import React from 'react'
import Header from '../components/header'

export default function Messages() {

    document.title = 'Mensagens / Napker'

    return (
        <>
            <Header page="Mensagens" />
            <div className="content">
                Mensagens
            </div>
        </>
    )
}