import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

import Header from '../../components/header'
import Chat from './chat'
import { SERVER_URL } from '../../settings'

class Messages extends React.Component {
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
    }

    componentWillReceiveProps(newProps) {
        if (newProps === this.props) return
        const participants = { username: this.state.username, other_username: newProps.match.params.slug }
        fetch(`${SERVER_URL}/chat-api/chat-id/${JSON.stringify(participants)}`)
            .then(response => response.json())
            .then(data => this.setState({
                chatId: data['chat_id']
            }))
    }

    handleComponentChange() {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                myProfile: data,
                username: data.user.username
            })
        })
        if (!this.state.activeChatsProfiles && this.state.activeChatsProfiles !== []) {
            this.fetchActiveChatProfiles()
        }
    }

    componentWillMount() {
        document.title = 'Mensagens / Napker'
        this.handleComponentChange()
    }

    componentDidUpdate() {
        this.handleComponentChange()
    }

    fetchActiveChatProfiles = () => {
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
                for (let p of data) {
                    if (p.blocked_users.map(u => u.id).includes(this.state.myProfile.user.id) ||
                    this.state.myProfile.blocked_users.map(u => u.id).includes(p.user.id)) {
                        data.pop(data.indexOf(p))
                    }
                }
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
                <Header page="Mensagens" />
                <div className="content d-flex messages-wrapper">
                    <Modal show={this.state.addingNewChat}
                        onHide={() => this.setState({ addingNewChat: false })}
                        size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title><strong>Nova conversa</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '0' }}>
                            <input className="modal-search-input"
                                placeholder="Pesquisar pessoas"
                                onChange={e => this.setModalSearch(e.target.value)}
                            />
                            <div className="list-group" style={{ height: '400px', overflow: 'hidden', overflowY: 'scroll' }}>
                                {this.state.modalProfiles && this.state.modalProfiles.map(profile => {
                                    return (
                                        <Link to={`/mensagens/${profile.slug}`}
                                            style={{ color: '#000', textDecoration: 'none' }}
                                            onClick={() => this.setState({
                                                addingNewChat: false
                                            })}
                                        >
                                            <li className="list-group-item profile-row modal-profile-li" key={profile.id}>
                                                <div className="d-flex justify-content-between">
                                                    <div className="profile-col">
                                                        <img src={`${SERVER_URL}${profile.photo}`}
                                                            className="profile-img-med"
                                                            style={{ marginRight: '10px' }}
                                                        />
                                                        <div className="main-profile-data">
                                                            <strong>{profile.first_name} {profile.last_name}</strong>
                                                            <p className="text-secondary">@{profile.user.username}</p>
                                                        </div>
                                                    </div>
                                                    <div className="profile-col">
                                                        {profile.bio}
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })}
                            </div>
                        </Modal.Body>
                    </Modal>
                    <div className="d-flex flex-column chats-list">
                        <div className="search-input-container">
                            <input placeholder="Pesquisar pessoas" className="search-input" onChange={e => this.setContactSearch(e.target.value)} />
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
                    <Chat username={this.state.username}
                        otherUsername={this.props.match.params.slug}
                        chatId={this.state.chatId}
                        openModal={this.openModal}
                        updateUnreadMessagesNumber={this.props.updateUnreadMessagesNumber}
                        updateMessagesComponent={this.fetchActiveChatProfiles}
                    />
                </div>
            </>
        )
    }
}

export default Messages