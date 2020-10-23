import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../settings'
import WebSocketInstance from './websocket'

class Chat extends React.Component {
    initialiseChat() {
        this.waitForSocketConnection(() => {
            WebSocketInstance.fetchMessages(
                this.state.username,
                this.props.chatId
            );
        });
        WebSocketInstance.connect(this.props.chatId);
    }

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            username: this.props.username,
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

    messageChangeHandler = event => {
        this.setState({ message: event.target.value });
    };

    sendMessageHandler = e => {
        e.preventDefault();
        const messageObject = {
            from: this.state.username,
            content: this.state.message,
            chatId: this.props.chatId
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({ message: "" });
    };

    renderTimestamp = timestamp => {  // ignore for now
        let prefix = "";
        const timeDiff = Math.round(
            (new Date().getTime() - new Date(timestamp).getTime()) / 60000
        );
        if (timeDiff < 1) {
            // less than one minute ago
            prefix = "just now...";
        } else if (timeDiff < 60 && timeDiff > 1) {
            // less than sixty minutes ago
            prefix = `${timeDiff} minutes ago`;
        } else if (timeDiff < 24 * 60 && timeDiff > 60) {
            // less than 24 hours ago
            prefix = `${Math.round(timeDiff / 60)} hours ago`;
        } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
            // less than 7 days ago
            prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
        } else {
            prefix = `${new Date(timestamp)}`;
        }
        return prefix;
    };

    renderMessages = messages => { // use mine
        const currentUser = this.props.username;
        return messages.map((message, i, arr) => (
            <li
                key={message.id}
                style={{ marginBottom: arr.length - 1 === i ? "300px" : "15px" }}
                className={message.author === currentUser ? "sent" : "received"}
            >
                <p>
                    {message.content}
                    <br />
                    <small>{this.renderTimestamp(message.timestamp)}</small>
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
            console.log('fetching profile...')
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
        }
        if (this.state.otherUsername != newProps.otherUsername) {
            this.setState({
                otherUsername: newProps.otherUsername
            })
        }
    }

    render() {
        return (
            <>
                {this.state.otherProfile ?
                    <div className="d-flex flex-column justify-content-between align-items-center current-chat">
                        <div className="current-chat-header">
                            <Link to="/user/felipe">
                                <img src={`${SERVER_URL}${this.state.otherProfile.photo}`} className="header-profile-img" />
                            </Link>
                            <div className="d-flex flex-column align-items-start" style={{ height: '52px' }}>
                                <strong>{this.state.otherProfile.first_name} {this.state.otherProfile.last_name}</strong>
                                <p className="text-secondary">@{this.state.otherProfile.user.username}</p>
                            </div>
                        </div>
                        <div id="chat-log"></div>
                        <form className="send-message-container" onSubmit={this.sendMessageHandler}>
                            <input placeholder="Mensagem" className="message-input" id="chat-message-input" onChange={this.messageChangeHandler} />
                            <button className="btn btn-primary" id="chat-message-submit">
                                <i class="fas fa-paper-plane" style={{ position: 'relative', right: '10%' }} />
                            </button>
                        </form>
                    </div> :
                    <div className="d-flex flex-column justify-content-center align-items-center current-chat">
                        <div>
                            <strong style={{ fontSize: 'larger' }}>Você não tem uma conversa selecionada</strong>
                            <p className="text-secondary">Selecione uma existente ou comece uma nova</p>
                            <button className="btn btn-primary">Nova conversa</button>
                        </div>
                    </div>}
            </>
        )
    }
}

export default Chat