import React from 'react'
import { Link } from 'react-router-dom'

import { csrftoken } from '../../utils'
import { SERVER_URL } from '../../settings'
import WebSocketInstance from './websocket'

class Chat extends React.Component {
    initialiseChat() {
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this)
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
            otherUsername: this.props.otherUsername,
            otherProfile: null
        }
        this.initialiseChat();
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

    setMessages(messages) {
        this.setState({ messages: messages.reverse() })
    }

    addMessage(message) {
        this.setState({ messages: [...this.state.messages, message] })
    }

    messageChangeHandler = event => {
        this.setState({ message: event.target.value });
    };

    sendMessageHandler = e => {
        e.preventDefault();
        const messageObject = {
            from: this.props.username,
            content: this.state.message,
            chatId: this.props.chatId
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({ message: "" });
        this.props.updateMessagesComponent()
        
    };

    renderTimestamp = timestamp => {
        const ts = new Date(timestamp)
        return `${ts.getDate()}/${ts.getMonth()}/${ts.getFullYear()} - ${ts.getHours()}:${ts.getMinutes()}`
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
                        {this.renderTimestamp(message.timestamp)} {message.author === currentUser ? message.read ? '✓✓' : '✓' : ''}
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

    handleComponentChange = () => {
        this.scrollToBottom();
        if (this.state.otherUsername && (!this.state.otherProfile || this.state.otherProfile.user.username !== this.state.otherUsername)) {
            fetch(`${SERVER_URL}/profile-api/user/${this.state.otherUsername}`)
                .then(response => response.json())
                .then(data => this.setState({
                    otherProfile: data
                }))
        }
    }

    componentDidMount() {
        this.handleComponentChange()
    }

    componentDidUpdate() {
        this.handleComponentChange()
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
        }
        if (this.state.otherUsername != newProps.otherUsername) {
            this.setState({
                otherUsername: newProps.otherUsername
            })
        }
        if (newProps.chatId) {
            fetch(`${SERVER_URL}/chat-api/read-messages`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ chat_id: newProps.chatId })
            })
                .then(response => response.json())
                .then(data => console.log(data))
        }
        if (this.props.updateUnreadMessagesNumber) {
            this.props.updateUnreadMessagesNumber()
        }
    }

    render() {
        return (
            <>
                {this.state.otherProfile ?
                    <div className="d-flex flex-column justify-content-between align-items-center current-chat">
                        <div className="current-chat-header">
                            <Link to={`/user/${this.state.otherProfile.slug}`}>
                                <img src={`${SERVER_URL}${this.state.otherProfile.photo}`} className="header-profile-img" />
                            </Link>
                            <div className="d-flex flex-column align-items-start" style={{ height: '52px' }}>
                                <strong>{this.state.otherProfile.first_name} {this.state.otherProfile.last_name}</strong>
                                <p className="text-secondary">@{this.state.otherProfile.user.username}</p>
                            </div>
                        </div>
                        <div id="chat-log">
                            {this.state.messages ? this.renderMessages(this.state.messages) : ''}
                        </div>
                        <form className="send-message-container" onSubmit={this.sendMessageHandler}>
                            <input placeholder="Mensagem" className="message-input" id="chat-message-input" value={this.state.message} onChange={this.messageChangeHandler} />
                            <button className="btn btn-primary" id="chat-message-submit">
                                <i class="fas fa-paper-plane" style={{ position: 'relative', right: '10%' }} />
                            </button>
                        </form>
                    </div> :
                    <div className="d-flex flex-column justify-content-center align-items-center current-chat">
                        <div>
                            <strong style={{ fontSize: 'larger' }}>Você não tem uma conversa selecionada</strong>
                            <p className="text-secondary">Selecione uma existente ou comece uma nova</p>
                            <button className="btn btn-primary" onClick={() => this.props.openModal()}>Nova conversa</button>
                        </div>
                    </div>}
            </>
        )
    }
}

export default Chat