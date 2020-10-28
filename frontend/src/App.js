import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from './components/sidebar'
import Home from './pages/home'
import Notifications from './pages/notifications'
import Messages from './pages/messages/messages'
import MyProfile from './pages/myprofile'
import Settings from './pages/settings'
import Profile from './pages/home-components/profile'
import ProfileFriends from './pages/profile-components/friends'
import ProfilePosts from './pages/profile-components/posts'

import { SERVER_URL } from './settings'

export default function App() {
    const [notificationsNumber, setNotificationsNumber] = useState(0)
    const [unreadMessagesNumber, setUnreadMessagesNumber] = useState(0)

    useEffect(() => {
        updateNotificationsNumber()
        updateUnreadMessagesNumber()
    }, [])

    const updateNotificationsNumber = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setNotificationsNumber(data.length))
    }

    const updateUnreadMessagesNumber = () => {
        fetch(`${SERVER_URL}/chat-api/all-unread-messages-number`)
            .then(response => response.json())
            .then(data => setUnreadMessagesNumber(data['unread_messages_number']))
    }

    return (
        <Router>
            <Sidebar notificationsNumber={notificationsNumber} unreadMessagesNumber={unreadMessagesNumber} />
            <div className="main-content">
                <Switch>
                    <Route path="/notificações" render={props => (
                        <Notifications {...props} updateNotificationsNumber={updateNotificationsNumber} />
                    )} />
                    <Route path="/mensagens" exact component={Messages} />
                    <Route path="/mensagens/:slug" render={props => (
                        <Messages {...props} updateUnreadMessagesNumber={updateUnreadMessagesNumber} />
                    )} />
                    <Route path="/perfil" component={MyProfile} />
                    <Route path="/configurações" component={Settings} />
                    <Route path="/user/:slug" exact render={props => (
                        <Profile {...props} updateNotificationsNumber={updateNotificationsNumber} />
                    )} />
                    <Route path="/user/:slug/amigos" component={ProfileFriends} />
                    <Route path="/user/:slug/posts" component={ProfilePosts} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    )
}