import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from './components/sidebar'
import Home from './pages/home'
import Notifications from './pages/notifications'
import Messages from './pages/messages'
import MyProfile from './pages/myprofile'
import Settings from './pages/settings'
import Profile from './pages/home-components/profile'

export default function App() {
    return (
        <Router>
            <Sidebar />
            <div className="main-content">
                <Switch>
                    <Route path="/notificações" component={Notifications} />
                    <Route path="/mensagens" component={Messages} />
                    <Route path="/perfil" component={MyProfile} />
                    <Route path="/configurações" component={Settings} />
                    <Route path="/user/:slug" component={Profile} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    )
}