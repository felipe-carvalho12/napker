import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from './components/sidebar'
import Home from './pages/home'
import Notifications from './pages/notifications'
import Messages from './pages/messages'
import MyProfile from './pages/myprofile'
import Settings from './pages/settings'

export default function App(props) {
    document.querySelectorAll('.menu').forEach(el => el.onclick = () => {
        //setHeader(el.id.charAt(0).toUpperCase() + el.id.slice(1))
        window.location.replace(`/${el.id}`)
    })

    return (
        <Router>
            <Sidebar />
            <div className="main-content">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/notificações" component={Notifications} />
                    <Route path="/mensagens" component={Messages} />
                    <Route path="/perfil" component={MyProfile} />
                    <Route path="/configurações" component={Settings} />
                </Switch>
            </div>
        </Router>
    )
}