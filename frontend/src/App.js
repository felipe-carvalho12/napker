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
import Post from './pages/home-components/post'

import { SERVER_URL } from './settings'

export default function App() {
    const [invitesReceivedNumber, setInvitesReceived] = useState(0)
    const [unvisualizedLikes, setUnvisulaizedLikes] = useState(0)
    let notificationsNumber = invitesReceivedNumber + unvisualizedLikes
    const [unreadMessagesNumber, setUnreadMessagesNumber] = useState(0)

    useEffect(() => {
        updateNotificationsNumber()
        updateUnreadMessagesNumber()
    }, [])

    const updateNotificationsNumber = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvitesReceived(data.length))
        fetch(`${SERVER_URL}/post-api/unvisualized-likes`)
            .then(response => response.json())
            .then(data => setUnvisulaizedLikes(data.length))
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
                    <Route path="/post/:id" component={Post}/>
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    )
}