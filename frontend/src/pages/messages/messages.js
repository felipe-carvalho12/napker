import React from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../../components/header'
import Chat from './chat'
import { SERVER_URL } from '../../settings'

class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            chatId: null
        }
    }

    componentWillMount() {
        document.title = 'Mensagens / Napker'
    }

    handleComponentChange() {
        if (!this.state.username) {
            fetch(`${SERVER_URL}/profile-api/logged-user`)
                .then(response => response.json())
                .then(data => this.setState({
                    username: data.username
                }))
        }
        if (!this.state.chatId) {
            const participants = {username: this.state.username, other_username: this.props.match.params.otherUsername}
            fetch(`${SERVER_URL}/chat-api/chat-id/${JSON.stringify(participants)}`)
                .then(response => response.json())
                .then(data => this.setState({
                    chatId: data['chat_id'].parseInt()
                }))
        }
    }

    componentDidMount() {
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
                            <Link to={`/mensagens/felipe`} style={{ color: '#000', textDecoration: 'none' }}>
                                <li className="list-item profile-chat-item">
                                    <img src={`${SERVER_URL}/media/felipe.jpg`} alt="" style={{ borderRadius: '50%' }} />
                                    <strong>Felipe Carvalho</strong>
                                    <p className="text-secondary" style={{ marginLeft: '5px' }}>@felipe</p>
                                </li>
                            </Link>
                            <Link to={`/mensagens/zuck`} style={{ color: '#000', textDecoration: 'none' }}>
                                <li className="list-item profile-chat-item">
                                    <img src={`${SERVER_URL}/media/mark.jpeg`} alt="" style={{ borderRadius: '50%' }} />
                                    <strong>Mark Zuckerberg</strong>
                                    <p className="text-secondary" style={{ marginLeft: '5px' }}>@zuck</p>
                                </li>
                            </Link>
                        </div>
                    </div>
                    <Chat username={this.state.username} otherUsername={this.props.match.params.otherUsername} chatId={this.state.chatId} />
                </div>
            </>
        )
    }
}

export default Messages