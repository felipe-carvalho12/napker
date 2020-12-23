import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { SERVER_URL } from './config/settings'
import { onExpandableTextareaInput } from './config/utils'
import {
    InvitesReceivedContext, UnvisualizedCommentsContext,
    UnvisualizedLikesContext, UnreadMessagesContext
} from './context/app/AppContext'

import SidebarLeft from './components/fixed/SidebarLeft'
import SidebarRight from './components/fixed/sidebar-right/SidebarRight'
import Home from './pages/home/Home'
import Notifications from './pages/notifications/Notifications'
import Messages from './pages/messages_/Messages'
import MyProfile from './pages/profile/MyProfile'
import Settings from './pages/settings_/Settings'
import Profile from './pages/profile/Profile'
import ProfileFriends from './pages/profile/pages/Friends'
import InterestProfiles from './pages/profile/components/interests/pages/InterestProfiles'
import EditInterests from './pages/profile/pages/edit_interests/EditInterests'
import Post from './pages/home/components/posts_/pages/post_/Post'

import PostFormPage from './pages/PostFormPage'
import EditProfileProvider from './context/edit-profile/EditProfileContext'

export default function App() {
    const [, setInvitesReceived] = useContext(InvitesReceivedContext)
    const [, setUnvisulaizedComments] = useContext(UnvisualizedCommentsContext)
    const [, setUnvisulaizedLikes] = useContext(UnvisualizedLikesContext)

    const [, setUnreadMessagesNumber] = useContext(UnreadMessagesContext)

    // global event listeners
    document.addEventListener('input', onExpandableTextareaInput)
    document.addEventListener('click', e => {
        if (!e.target.classList.contains('view-more-select') && !e.target.classList.contains('view-more-icon')) {
            document.querySelectorAll('.view-more-select').forEach(el => {
                el.style.display = 'none'
            })
        }
    })

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
            <SidebarLeft />
            <div className="main-content">
                <Switch>
                    <Route path="/home" render={props => (
                        <Home {...props} />
                    )} />
                    <Route path="/notificações" render={props => (
                        <Notifications {...props} updateNotificationsNumber={updateNotificationsNumber} />
                    )} />
                    <Route path="/mensagens" exact component={Messages} />
                    <Route path="/mensagens/:slug" render={props => (
                        <Messages {...props} updateUnreadMessagesNumber={updateUnreadMessagesNumber} />
                    )} />
                    <Route path="/perfil" exact render={props => (
                        <EditProfileProvider>
                            <MyProfile />
                        </EditProfileProvider>
                    )} />
                    <Route path="/perfil/meus-interesses" component={EditInterests} />
                    <Route path="/configurações" exact component={Settings} />
                    <Route path="/configurações/perfis-bloqueados" exact render={props => (
                        <Settings {...props} page={'blocked-profiles'} />
                    )} />
                    <Route path="/configurações/segurança" exact render={props => (
                        <Settings {...props} page={'security'} />
                    )} />
                    <Route path="/configurações/alterar-senha" exact render={props => (
                        <Settings {...props} page={'change-password'} />
                    )} />
                    <Route path="/configurações/deletar-conta" exact render={props => (
                        <Settings {...props} page={'delete-account'} />
                    )} />
                    <Route path="/configurações/faq" exact render={props => (
                        <Settings {...props} page={'faq'} />
                    )} />
                    <Route path="/configurações/fale-conosco" exact render={props => (
                        <Settings {...props} page={'feedback'} />
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
            </div>
            <Switch>
                <Route path="/:path" component={SidebarRight} />
            </Switch>
        </Router>
    )
}