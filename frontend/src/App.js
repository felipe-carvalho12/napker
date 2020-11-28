import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from './components/fixed/Sidebar'
import BottomMenu from './components/fixed/BottomMenu'
import Home from './pages/Home'
import Notifications from './pages/Notifications'
import Messages from './pages/messages_page/Messages'
import MyProfile from './pages/MyProfile'
import Settings from './pages/settings_page/SettingsMenu'
import Profile from './pages/home-components/Profile'
import ProfileFriends from './pages/profile-components/Friends'
import InterestProfiles from './pages/profile-components/InterestProfiles'
import EditInterests from './pages/profile-components/edit-interests/EditInterests'
import Post from './pages/home-components/Post'

import PostFormPage from './pages/PostFormPage'

import { SERVER_URL } from './config/settings'

export default function App() {
    const [invitesReceivedNumber, setInvitesReceived] = useState(0)
    const [unvisualizedLikesNumber, setUnvisulaizedLikes] = useState(0)
    const [unvisualizedCommentsNumber, setUnvisulaizedComments] = useState(0)
    let notificationsNumber = invitesReceivedNumber + unvisualizedLikesNumber + unvisualizedCommentsNumber
    const [unreadMessagesNumber, setUnreadMessagesNumber] = useState(0)

    useEffect(() => {
        updateNotificationsNumber()
        updateUnreadMessagesNumber()
        window.setInterval(() => {
            updateNotificationsNumber()
            updateUnreadMessagesNumber()
        }, 6000)
    }, [])

    const updateNotificationsNumber = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvitesReceived(data.length))
        fetch(`${SERVER_URL}/post-api/unvisualized-post-likes`)
            .then(response => response.json())
            .then(data => setUnvisulaizedLikes(data.length))
        fetch(`${SERVER_URL}/post-api/unvisualized-post-comments`)
            .then(response => response.json())
            .then(data => setUnvisulaizedComments(data.length))
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
                    <Route path="/home" component={Home} />
                    <Route path="/notificações" render={props => (
                        <Notifications {...props} updateNotificationsNumber={updateNotificationsNumber} />
                    )} />
                    <Route path="/mensagens" exact component={Messages} />
                    <Route path="/mensagens/:slug" render={props => (
                        <Messages {...props} updateUnreadMessagesNumber={updateUnreadMessagesNumber} />
                    )} />
                    <Route path="/perfil" exact component={MyProfile} />
                    <Route path="/perfil/meus-interesses" component={EditInterests} />
                    <Route path="/configurações" exact component={Settings} />
                    <Route path="/configurações/perfis-bloqueados" exact render={props => (
                        <Settings {...props} page={'blocked-profiles'} />
                    )} />
                    <Route path="/configurações/alterar-senha" exact render={props => (
                        <Settings {...props} page={'change-password'} />
                    )} />
                    <Route path="/configurações/deletar-conta" exact render={props => (
                        <Settings {...props} page={'delete-account'} />
                    )} />
                    <Route path="/user/:slug" exact render={props => (
                        <Profile {...props} updateNotificationsNumber={updateNotificationsNumber} />
                    )} />
                    <Route path="/user/:slug/amigos" component={ProfileFriends} />
                    <Route path="/post/:id" exact component={Post} />
                    <Route path="/post/:id/comentar" render={props => (
                        <Post {...props} commentModalIsOpen={true} />
                    )} />
                    <Route path="/interesses/:interest" component={InterestProfiles} />

                    <Route path="/postar" component={PostFormPage} />
                </Switch>
                <BottomMenu notificationsNumber={notificationsNumber} unreadMessagesNumber={unreadMessagesNumber} />
            </div>
        </Router>
    )
}