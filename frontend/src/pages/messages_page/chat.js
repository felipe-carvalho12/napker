import React from 'react'
import Picker from 'emoji-picker-react'
import { Link } from 'react-router-dom'

import { csrftoken, openCloseEmojiList } from '../../utils'
import { SERVER_URL } from '../../settings'
import WebSocketInstance from './Websocket'

class Chat extends React.Component {
    initialiseChat() {
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.getMessages.bind(this),
                this.addMessage.bind(this),
                this.getUpdatedMessages.bind(this)
            )
            WebSocketInstance.fetchMessages(
                this.props.username,
                this.props.chatId
            );
        });
        if (this.props.chatId) WebSocketInstance.connect(this.props.chatId)
    }

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            myProfile: null,
            otherUsername: this.props.otherUsername,
            otherProfile: null
        }
        this.initialiseChat();
    }

    handleComponentChange = () => {
        this.scrollToBottom();
        if (this.state.otherUsername && (!this.state.otherProfile || this.state.otherProfile.user.username !== this.state.otherUsername)) {
            fetch(`${SERVER_URL}/profile-api/user/${this.state.otherUsername}`)
                .then(response => response.json())
                .then(data => this.setState({
                    otherProfile: data
                }))
        }
        if (!this.state.myProfile) {
            fetch(`${SERVER_URL}/profile-api/myprofile`)
                .then(response => response.json())
                .then(data => this.setState({ myProfile: data }))
        }
    }

    componentDidMount() {
        this.handleComponentChange()
    }


    componentDidUpdate() {
        this.handleComponentChange()
        document.querySelector('#chat-message-input') && document.querySelector('#chat-message-input').focus()
    }

    componentWillUnmount() {
        WebSocketInstance.disconnect()
    }

    componentWillReceiveProps(newProps) {
        if (this.props.chatId !== newProps.chatId) {
            WebSocketInstance.disconnect();
            this.waitForSocketConnection(() => {
                WebSocketInstance.fetchMessages(
                    this.props.username,
                    newProps.chatId
                );
            });
            WebSocketInstance.connect(newProps.chatId);

            this.props.updateMessagesComponent()
            this.setState({
                message: '',
                otherUsername: newProps.otherUsername
            })
        }
        if (newProps.chatId) {
            this.readMessages(newProps)
        }
        if (this.props.updateUnreadMessagesNumber) {
            this.props.updateUnreadMessagesNumber()
        }
    }

    readMessages = props => {
        fetch(`${SERVER_URL}/chat-api/read-messages`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ chat_id: props.chatId })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                WebSocketInstance.readMessages(this.props.chatId)
            })
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(function () {
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made");
                callback();
                return;
            } else {
                console.log("wait for connection...");
                component.waitForSocketConnection(callback);
            }
        }, 100);
    }

    getMessages(messages) {
        this.setState({ messages: messages.reverse() })
    }

    addMessage(message) {
        this.setState({ messages: [...this.state.messages, message] })
        this.readMessages(this.props)
    }

    getUpdatedMessages(messages) {
        this.setState({ messages: messages.reverse() })
    }

    messageChangeHandler = e => {
        this.setState({ message: e.target.value })
        const el = document.querySelector('#chat-message-submit')
        el.disabled = e.target.value.trim() === ''
    };

    sendMessageHandler = e => {
        e.preventDefault()
        const messageObject = {
            from: this.props.username,
            content: this.state.message,
            chatId: this.props.chatId
        };
        this.setState({ message: '' })
        if (this.state.otherProfile.blocked_users.map(u => u.id).includes(this.state.myProfile.user.id)) {
            window.alert(`Você não pode enviar mensagens para @${this.state.otherUsername}.
            ${this.state.otherProfile.first_name} te bloqueou.`)
            return
        }
        if (this.state.myProfile.blocked_users.map(u => u.id).includes(this.state.otherProfile.user.id)) {
            window.alert(`Você não pode enviar mensagens para @${this.state.otherUsername}.
            Você bloqueou ${this.state.otherProfile.first_name}.`)
            return
        }
        WebSocketInstance.newChatMessage(messageObject)
        document.querySelector('#chat-message-submit').disabled = true
        openCloseEmojiList(true)
        this.props.updateMessagesComponent()
    };

    renderTimestamp = timestamp => {
        const ts = new Date(timestamp)
        const day = ts.getDate() >= 10 ? ts.getDate() : `0${ts.getDate()}`
        const month = ts.getMonth() >= 10 ? ts.getMonth() : `0${ts.getMonth()}`
        const hour = ts.getHours() >= 10 ? ts.getHours() : `0${ts.getHours()}`
        const minute = ts.getMinutes() >= 10 ? ts.getMinutes() : `0${ts.getMinutes()}`
        return `${day}/${month}/${ts.getFullYear()} - ${hour}:${minute}`
    };

    renderMessages = messages => {
        const currentUser = this.props.username;
        return messages.map(message => (
            <li
                key={message.id}
                className={message.author === currentUser ? "sent" : "received"}
            >
                <p>
                    {message.content}
                    <br />
                    <small>
                        {this.renderTimestamp(message.timestamp)} {message.author === currentUser ?
                            message.read ?
                                <i class="fas fa-check-double" />
                                :
                                <i class="fas fa-check" />
                            :
                            ''
                        }
                    </small>
                </p>
            </li>
        ));
    };

    scrollToBottom = () => {
        if (document.querySelector('#chat-log')) {
            const chatLog = document.querySelector('#chat-log')
            chatLog.scrollTop = chatLog.scrollHeight
        }
    };

    onEmojiSelect = (event, emojiObject) => {
        this.setState({ message: this.state.message + emojiObject.emoji })
        document.querySelector('#chat-message-submit').disabled = false
    }

    render() {
        return (
            <>
                {this.state.otherProfile !== null || !this.props.otherUsername ?
                    <>
                        {this.state.otherProfile ?
                            <div className="d-flex flex-column justify-content-between align-items-center current-chat">
                                <div className="current-chat-header">
                                    <Link to={`/user/${this.state.otherProfile.slug}`}>
                                        <img src={`${SERVER_URL}${this.state.otherProfile.photo}`}
                                            className="profile-img-sm"
                                            style={{ marginRight: '5px' }}
                                        />
                                    </Link>
                                    <div className="d-flex flex-column align-items-start" style={{ height: '52px' }}>
                                        <strong>{this.state.otherProfile.first_name} {this.state.otherProfile.last_name}</strong>
                                        <p className="text-secondary">@{this.state.otherProfile.user.username}</p>
                                    </div>
                                </div>
                                <div id="chat-log">
                                    {this.state.messages ? this.renderMessages(this.state.messages) : ''}
                                </div>
                                <div className="emoji-list-container chat-emoji-list" id="emoji-list-container">
                                    <Picker onEmojiClick={this.onEmojiSelect} />
                                </div>
                                <form className="send-message-container" onSubmit={this.sendMessageHandler}>
                                    <label
                                        className="far fa-smile"
                                        id="emoji-button"
                                        onClick={() => openCloseEmojiList(false)}
                                    />
                                    <input
                                        placeholder="Mensagem"
                                        className="message-input"
                                        id="chat-message-input"
                                        value={this.state.message}
                                        autoFocus={document.querySelector('#contact-filter-input').value === ''}
                                        onChange={this.messageChangeHandler}
                                    />
                                    <button
                                        className="btn btn-primary chat-message-submit"
                                        id="chat-message-submit"
                                        disabled
                                    >
                                        <i class="fas fa-chevron-right" />
                                    </button>
                                </form>
                            </div>
                            :
                            <div className="d-flex flex-column justify-content-center align-items-center current-chat">
                                <div>
                                    <strong style={{ fontSize: 'larger' }}>Você não tem uma conversa selecionada</strong>
                                    <p className="text-secondary">Selecione uma existente ou comece uma nova</p>
                                    <button className="btn btn-primary" onClick={() => this.props.openModal()}>Nova conversa</button>
                                </div>
                            </div>
                        }
                    </>
                    :
                    <div className="chat-loader-container">
                        <div className="loader" />
                    </div>
                }
            </>
        )
    }
}

export default Chat
