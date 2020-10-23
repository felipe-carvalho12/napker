import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../components/header'
import Chat from './chat'
import { SERVER_URL } from '../../settings'

class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            chatId: null,
            activeChatsProfiles: null
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps === this.props) return
        const participants = { username: this.state.username, other_username: newProps.match.params.otherUsername }
        fetch(`${SERVER_URL}/chat-api/chat-id/${JSON.stringify(participants)}`)
            .then(response => response.json())
            .then(data => this.setState({
                chatId: data['chat_id']
            }))
    }

    handleComponentChange() {
        if (!this.state.username) {
            fetch(`${SERVER_URL}/profile-api/logged-user`)
                .then(response => response.json())
                .then(data => this.setState({
                    username: data.username
                }))
        }
        if (!this.state.activeChatsProfiles && this.state.activeChatsProfiles !== []) {
            console.log('fetching...')
            fetch(`${SERVER_URL}/chat-api/active-chats-profiles`)
                .then(response => response.json())
                .then(data => {
                    if (!this.state.username) return
                    console.log(data)
                    this.setState({
                        activeChatsProfiles: data
                    })
                })
        }
    }

    componentWillMount() {
        document.title = 'Mensagens / Napker'
        this.handleComponentChange()
    }

    componentDidUpdate() {
        this.handleComponentChange()
    }

    render() {
        return (
            <>
                <Header page="Mensagens" />
                <div className="content d-flex messages-wrapper">
                    <div className="d-flex flex-column chats-list">
                        <div className="search-input-container">
                            <input placeholder="Pesquisar pessoas" className="search-input" />
                        </div>
                        <div className="list-group chats-container">
                            {this.state.activeChatsProfiles && this.state.activeChatsProfiles.map(profile => {
                                console.log('rendering', profile)
                                return (
                                    <Link to={`/mensagens/${profile.user.username}`} style={{ color: '#000', textDecoration: 'none' }}>
                                        <li className="list-item profile-chat-item">
                                            <img src={`${SERVER_URL}${profile.photo}`} alt="" style={{ borderRadius: '50%' }} />
                                            <strong>{profile.first_name} {profile.last_name}</strong>
                                            <p className="text-secondary" style={{ marginLeft: '5px' }}>@{profile.user.username}</p>
                                        </li>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <Chat username={this.state.username} otherUsername={this.props.match.params.otherUsername} chatId={this.state.chatId} />
                </div>
            </>
        )
    }
}

export default Messages