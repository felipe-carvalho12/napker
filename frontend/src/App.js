import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from './components/sidebar'
import Home from './pages/home'
import Notifications from './pages/notifications'
import Messages from './pages/messages/messages'
import MyProfile from './pages/myprofile'
import Settings from './pages/settings'
import Profile from './pages/home-components/profile'

import { SERVER_URL } from './settings'

export default function App() {
    const [notificationsNumber, setNotificationsNumber] = useState(0)

    useEffect(() => {
        updateNotificationsNumber()
    }, [])

    const updateNotificationsNumber = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setNotificationsNumber(data.length))
    }

    return (
        <Router>
            <Sidebar notificationsNumber={notificationsNumber} />
            <div className="main-content">
                <Switch>
                    <Route path="/notificações" render={props => (
                        <Notifications {...props} updateNotificationsNumber={updateNotificationsNumber} />
                    )} />
                    <Route path="/mensagens" exact component={Messages} />
                    <Route path="/mensagens/:otherUsername" component={Messages} />
                    <Route path="/perfil" component={MyProfile} />
                    <Route path="/configurações" component={Settings} />
                    <Route path="/user/:slug" component={Profile} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    )
}