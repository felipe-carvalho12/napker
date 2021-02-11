import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { SERVER_URL } from '../../config/settings'
import {
    InvitesReceivedContext, PublicationNotificationsContext, MentionNumberContext,
    UnreadMessagesContext, AlgorithmWeightsContext, MyProfileContext, PostsIdContext
} from '../../context/app/AppContext'

import SidebarLeft from '../../components/fixed/SidebarLeft'
import SidebarRight from '../../components/fixed/sidebar-right/SidebarRight'

import Home from './home/Home'
import Notifications from './notifications/Notifications'
import Messages from './messages_/Messages'
import MyProfile from './profile/MyProfile'
import Settings from './settings_/Settings'
import Profile from './profile/Profile'
import ProfileFriends from './profile/pages/Friends'
import InterestProfiles from './profile/components/interests/pages/InterestProfiles'
import EditInterests from './profile/pages/edit_interests/EditInterests'
import Post from './home/components/posts_/pages/Post'
import NotFound from '../not-found/NotFound'

import PostFormPage from './mobile-post-form/PostFormPage'
import EditProfileProvider from '../../context/edit-profile/EditProfileContext'

export default function MainAppRouter() {
    const [, fetchMyProfile] = useContext(MyProfileContext)
    const [, fetchPostsId] = useContext(PostsIdContext)

    const [, setWeights] = useContext(AlgorithmWeightsContext)

    const [, setInvitesReceived] = useContext(InvitesReceivedContext)
    const [, setPublicationNotifications] = useContext(PublicationNotificationsContext)
    const [, setMentionNotificationsNumber] = useContext(MentionNumberContext)

    const [, setUnreadMessagesNumber] = useContext(UnreadMessagesContext)

    useEffect(() => {
        fetchMyProfile()
        fetchPostsId()
        updateNotificationsNumber()
        updateUnreadMessagesNumber()

        window.setInterval(() => {
            updateNotificationsNumber()
        }, 60000)
        window.setInterval(() => {
            updateUnreadMessagesNumber()
        }, 10000)

        fetch(`${SERVER_URL}/profile-api/get-weights`)
            .then(response => response.json())
            .then(data => setWeights(data))
    }, [])

    const updateNotificationsNumber = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites-number`)
            .then(response => response.json())
            .then(data => setInvitesReceived(data))
        fetch(`${SERVER_URL}/post-api/publication-notifications-number`)
            .then(response => response.json())
            .then(data => setPublicationNotifications(data))
        fetch(`${SERVER_URL}/post-api/mention-notifications-number`)
            .then(response => response.json())
            .then(data => setMentionNotificationsNumber(data))
    }

    const updateUnreadMessagesNumber = () => {
        fetch(`${SERVER_URL}/chat-api/all-unread-messages-number`)
            .then(response => response.json())
            .then(data => setUnreadMessagesNumber(data['unread_messages_number']))
    }

    return (
        <div className="wrapper">
            <div className="ls-wrapper">
                <div className="ls-container">
                    <div className="sb-fixed-container">
                        <SidebarLeft />
                    </div>
                </div>
            </div>
            <div className="mc-wrapper">
                <div className="main-content">
                    <Switch>
                        <Route path="/home">
                            <SidebarRight page="home" />
                        </Route>
                        <Route path="/perfil">
                            <SidebarRight page="profile" />
                        </Route>
                        <Route path="/user/:username">
                            <SidebarRight page="profile" />
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/home" />
                        </Route>
                        <Route path="/login" exact>
                            <Redirect to="/home" />
                        </Route>
                        <Route path="/signup" exact>
                            <Redirect to="/home" />
                        </Route>

                        <Route path="/home">
                            <Home />
                        </Route>

                        <Route path="/notificações" render={props => (
                            <Notifications {...props} updateNotificationsNumber={updateNotificationsNumber} />
                        )} />
                        <Route path="/mensagens" exact component={Messages} />
                        <Route path="/mensagens/:username" render={props => (
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
                        <Route path="/configurações/cores" exact render={props => (
                            <Settings {...props} page={'colors'} />
                        )} />
                        <Route path="/user/:username" exact render={props => (
                            <Profile {...props} updateNotificationsNumber={updateNotificationsNumber} />
                        )} />
                        <Route path="/user/:username/amigos" component={ProfileFriends} />
                        <Route path="/post/:id" exact component={Post} />
                        <Route path="/interesses/:interest" component={InterestProfiles} />

                        <Route path="/postar" component={PostFormPage} />

                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}