import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/fixed/header'
import ModalContactSearch from './components/ModalContactSearch'
import Chat from './components/Chat'
import { SERVER_URL } from '../../config/settings'

export default class MessagesPageBifurcator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myProfile: null,
            username: null,
            chatId: null,
            activeChats: null,
            activeChatsProfiles: null,
            addingNewChat: false,
            modalProfiles: [],
        }
        this.rerenderingInterval = null
    }

    handleReceiveProps = props => {
        const participants = { username: this.state.username, other_username: props.match.params.slug }
        fetch(`${SERVER_URL}/chat-api/chat-id/${JSON.stringify(participants)}`)
            .then(response => response.json())
            .then(data => this.setState({
                chatId: data['chat_id']
            }))
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
        this.rerenderingInterval = window.setInterval(this.fetchActiveChatProfiles, 3000)
    }

    componentWillUnmount() {
        window.clearInterval(this.rerenderingInterval)
    }

    componentDidUpdate() {
        this.handleComponentChange()
    }

    fetchActiveChatProfiles = () => {
        console.log('fetching profiles...')
        fetch(`${SERVER_URL}/chat-api/active-chats-profiles`)
            .then(response => response.json())
            .then(data => {
                if (!this.state.username) return
                this.setState({
                    activeChats: data.chats.reverse(),
                    activeChatsProfiles: data.profiles.reverse()
                })
            })
    }

    openModal = () => {
        this.setState({
            addingNewChat: true
        })
    }

    setModalSearch = query => {
        if (query === '') {
            this.setState({
                modalProfiles: []
            })
            return
        }
        fetch(`${SERVER_URL}/profile-api/users/${query}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    modalProfiles: data
                })
            })
    }

    setContactSearch = query => {
        if (query === '') {
            this.fetchActiveChatProfiles()
            return
        }
        if (this.state.activeChatsProfiles) {
            const filteredProfiles = this.state.activeChatsProfiles.filter(p => p.user.username.includes(query))
            this.setState({
                activeChatsProfiles: filteredProfiles
            })
        }
    }

    resetUnreadMessagesCounter = () => {
        this.unreadMessagesCounter = 0
    }

    incrementUnreadMessagesCounter = () => {
        this.unreadMessagesCounter++
    }

    setLastChatMessage = message => {
        this.lastChatMessage = message
    }
    render() {
        return (
            <>
                <div className="default-messages-page">
                    <Header page="Mensagens" />
                    <div className="content d-flex messages-wrapper">
                        <ModalContactSearch
                            addingNewChat={this.state.addingNewChat}
                            modalProfiles={this.state.modalProfiles}
                            closeModal={() => this.setState({ addingNewChat: false })}
                        />
                        <div className="chats-list">
                            <div className="search-input-container">
                                <input className="search-input contact-filter-input" placeholder="Pesquisar pessoas" onChange={e => this.setContactSearch(e.target.value)} />
                                <i className="fas fa-plus add-icon" onClick={this.openModal}></i>
                            </div>
                            <div className="list-group chats-container">
                                {this.state.activeChatsProfiles !== null ?
                                    this.state.activeChatsProfiles.map(profile => {
                                        return (
                                            <Link to={`/mensagens/${profile.slug}`} style={{ color: '#000', textDecoration: 'none' }}>
                                                {this.resetUnreadMessagesCounter()}
                                                <li className="list-item profile-chat-item" style={{ whiteSpace: 'nowrap' }}>
                                                    <img src={`${SERVER_URL}${profile.photo}`}
                                                        className="profile-img-med"
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <div className="d-flex flex-column align-items-start">
                                                        <div className="d-flex" style={{ maxHeight: '30px' }}>
                                                            <strong style={{ height: 'fit-content' }}>{profile.first_name} {profile.last_name}</strong>
                                                            {this.state.activeChats[this.state.activeChatsProfiles.indexOf(profile)].messages.map(message => {
                                                                const messages = this.state.activeChats[this.state.activeChatsProfiles.indexOf(profile)].messages
                                                                if (messages[messages.length - 1] === message) this.setLastChatMessage(message.content)
                                                                if (message.read || message.contact.user.username !== profile.user.username) return
                                                                this.incrementUnreadMessagesCounter()
                                                            })}
                                                            {this.unreadMessagesCounter ?
                                                                <div className="notification-text-container">
                                                                    <div className="notification-text">
                                                                        {this.unreadMessagesCounter}
                                                                    </div>
                                                                </div>
                                                                : ''
                                                            }
                                                            <p className="text-secondary" style={{ marginLeft: '5px' }}>@{profile.user.username}</p>
                                                        </div>
                                                        <p className="text-secondary">{this.lastChatMessage.slice(0, 40)}</p>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                    }) :
                                    <div className="messages-loader-container">
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
                </div>
                <div className="mobile-messages-page">
                    <div className="content d-flex messages-wrapper">
                        <ModalContactSearch
                            addingNewChat={this.state.addingNewChat}
                            modalProfiles={this.state.modalProfiles}
                            closeModal={() => this.setState({ addingNewChat: false })}
                        />
                        <div className="chats-list">
                            <div className="search-input-container">
                                <input className="search-input contact-filter-input" placeholder="Pesquisar pessoas" onChange={e => this.setContactSearch(e.target.value)} />
                                <i className="fas fa-plus add-icon" onClick={this.openModal}></i>
                            </div>
                            <div className="list-group chats-container">
                                {this.state.activeChatsProfiles !== null ?
                                    this.state.activeChatsProfiles.map(profile => {
                                        return (
                                            <Link to={`/mensagens/${profile.slug}`} style={{ color: '#000', textDecoration: 'none' }}>
                                                {this.resetUnreadMessagesCounter()}
                                                <li className="list-item profile-chat-item" style={{ whiteSpace: 'nowrap' }}>
                                                    <img src={`${SERVER_URL}${profile.photo}`}
                                                        className="profile-img-med"
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <div className="d-flex flex-column align-items-start">
                                                        <div className="d-flex" style={{ maxHeight: '30px' }}>
                                                            <strong style={{ height: 'fit-content' }}>{profile.first_name} {profile.last_name}</strong>
                                                            {this.state.activeChats[this.state.activeChatsProfiles.indexOf(profile)].messages.map(message => {
                                                                const messages = this.state.activeChats[this.state.activeChatsProfiles.indexOf(profile)].messages
                                                                if (messages[messages.length - 1] === message) this.setLastChatMessage(message.content)
                                                                if (message.read || message.contact.user.username !== profile.user.username) return
                                                                this.incrementUnreadMessagesCounter()
                                                            })}
                                                            {this.unreadMessagesCounter ?
                                                                <div className="notification-text-container">
                                                                    <div className="notification-text">
                                                                        {this.unreadMessagesCounter}
                                                                    </div>
                                                                </div>
                                                                : ''
                                                            }
                                                            <p className="text-secondary" style={{ marginLeft: '5px' }}>@{profile.user.username}</p>
                                                        </div>
                                                        <p className="text-secondary">{this.lastChatMessage.slice(0, 40)}</p>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                    }) :
                                    <div className="messages-loader-container">
                                        <div className="loader" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {!!this.props.match.params.slug &&
                        <div className="mobile-chat-page">
                            <Chat
                                backArrow={true}
                                username={this.state.username}
                                otherUsername={this.props.match.params.slug}
                                chatId={this.state.chatId}
                                openModal={this.openModal}
                                updateUnreadMessagesNumber={this.props.updateUnreadMessagesNumber}
                                updateMessagesComponent={this.fetchActiveChatProfiles}
                            />
                        </div>
                    }
                </div>
            </>
        )
    }
}