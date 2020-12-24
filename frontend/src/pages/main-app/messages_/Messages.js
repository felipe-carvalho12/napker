import React from 'react'

import { SERVER_URL } from '../../../config/settings'
import Header from '../../../components/fixed/header'
import ModalContactSearch from './components/ModalContactSearch'
import Chat from './components/chat_/Chat'
import ContactListItem from './components/ContactListItem'
import ContactFilterInput from './components/ContactFilterInput'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'
import WebSocketInstance from './Websocket'

export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myProfile: null,
            username: null,
            chatId: null,
            activeChats: null,
            activeChatsProfiles: null,
            renderedActiveChatsProfiles: null,
            addingNewChat: false,
            modalProfiles: [],
        }
        this.rerenderingInterval = null
        this.hasFilteredProfiles = false
    }

    handleReceiveProps = props => {
        if (props.match.params.slug) {
            if (props.match.params.slug !== this.props.match.params.slug && WebSocketInstance.state() === 1) {
                WebSocketInstance.disconnect()
            }
            const participants = { username: this.state.username, other_username: props.match.params.slug }
            fetch(`${SERVER_URL}/chat-api/chat-id/${JSON.stringify(participants)}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({ chatId: data['chat_id'] })
                })
        } else if (this.state.chatId) {
            this.setState({
                chatId: null
            })

        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps === this.props) return
        this.handleReceiveProps(newProps)
    }

    handleComponentChange() {
        if (!this.state.username) {
            fetch(`${SERVER_URL}/profile-api/logged-user`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        username: data.username
                    })
                    if (this.props.match.params.slug) {
                        this.handleReceiveProps(this.props)
                    }
                })
        }
        if (!this.state.activeChatsProfiles && this.state.activeChatsProfiles !== []) {
            this.fetchActiveChatProfiles()
        }
    }

    componentWillMount() {
        document.title = 'Mensagens / Napker'
        this.handleComponentChange()
        this.rerenderingInterval = window.setInterval(this.fetchActiveChatProfiles, 4000)
    }

    componentWillUnmount() {
        window.clearInterval(this.rerenderingInterval)
    }

    componentDidUpdate() {
        this.handleComponentChange()
    }

    fetchActiveChatProfiles = () => {
        fetch(`${SERVER_URL}/chat-api/active-chats-profiles`)
            .then(response => response.json())
            .then(data => {
                if (!this.state.username) return
                if (!this.hasFilteredProfiles) {
                    this.setState({
                        activeChats: data.chats,
                        activeChatsProfiles: data.profiles,
                        renderedActiveChatsProfiles: data.profiles
                    })
                }
            })
    }

    openModal = () => {
        this.setState({
            addingNewChat: true
        })
    }

    render() {
        return (
            <>
                <Header page="Mensagens" />
                <div className="content d-flex messages-wrapper">
                    <ModalContactSearch
                        addingNewChat={this.state.addingNewChat}
                        setParentState={this.setState.bind(this)}
                        modalProfiles={this.state.modalProfiles}
                    />
                    <div className="chats-list h-100">
                        <ContactFilterInput
                            activeChatsProfiles={this.state.activeChatsProfiles}
                            setHasFilteredProfiles={bool => this.hasFilteredProfiles = bool}
                            fetchActiveChatProfiles={this.fetchActiveChatProfiles}
                            setParentState={this.setState.bind(this)}
                            openModal={this.openModal}
                        />
                        <div className="list-group chats-container">
                            {this.state.renderedActiveChatsProfiles !== null ?
                                this.state.renderedActiveChatsProfiles.map(profile => {
                                    return (
                                        <ContactListItem
                                            profile={profile}
                                            activeChats={this.state.activeChats}
                                            activeChatsProfiles={this.state.activeChatsProfiles}
                                        />
                                    )
                                })
                                :
                                <div className="loader-container">
                                    <div className="loader" />
                                </div>
                            }
                        </div>
                    </div>
                    <Chat
                        username={this.state.username}
                        otherUsername={this.props.match.params.slug}
                        chatId={this.state.chatId}
                        openModal={this.openModal}
                        updateUnreadMessagesNumber={this.props.updateUnreadMessagesNumber}
                        updateMessagesComponent={this.fetchActiveChatProfiles}
                    />
                </div>
                {!this.props.match.params.slug &&
                    <BottomMenu />
                }
            </>
        )
    }
}