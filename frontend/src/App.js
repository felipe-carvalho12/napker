import React, { useEffect, useState } from 'react'

import Home from './components/home'
import Notifications from './components/notifications'
import Messages from './components/messages'
import Profile from './components/profile'
import Settings from './components/settings'

export default function App() {
    const [header, setHeader] = useState('Home')
    const components = {
        'Home': Home(),
        'Notificações': Notifications(),
        'Mensagens': Messages(),
        'Perfil': Profile(),
        'Configurações': Settings(),
    }

    useEffect(() => {
        document.querySelector('.header > strong').innerText = header
        document.title = `${header} / Napker`
        window.history.pushState({header: header}, '', header.toLowerCase())  //fix it!
    }, [header])

    window.onpopstate = e => {
        setHeader(e.state.header)
    }

    document.querySelectorAll('.menu').forEach(el => el.onclick = () => {
        setHeader(el.id.charAt(0).toUpperCase() + el.id.slice(1))
    })

    return (
        <>
        {components[header]}
        </>
    )
}