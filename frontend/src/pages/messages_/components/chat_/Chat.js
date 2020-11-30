import React from 'react'
import { Link } from 'react-router-dom'

import { csrftoken } from '../../../../config/utils'
import { SERVER_URL } from '../../../../config/settings'
import WebSocketInstance from '../../Websocket'
import SendMessageForm from './components/SendMessageForm'
import MessageListItem from './components/MessageListItem'

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
        if (this.state.otherUsername && !newProps.otherUsername) {
            this.setState({
                otherUsername: undefined,
                otherProfile: undefined
            })
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

    scrollToBottom = () => {
        if (document.querySelector('#chat-log')) {
            const chatLog = document.querySelector('#chat-log')
            chatLog.scrollTop = chatLog.scrollHeight
        }
    };

    render() {
        return (
            <>
                {this.state.otherProfile !== null || !this.props.otherUsername ?
                    <>
                        {this.state.otherProfile ?
                            <div className="current-chat">
                                <div className="current-chat-header">
                                    <i class="fas fa-arrow-left left-arrow-icon" onClick={() => window.history.back()} />
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
                                    {this.state.messages.map(message => {
                                            return (
                                                <MessageListItem message={message} currentUser={this.props.username} />
                                            )
                                        })
                                    }
                                </div>
                                <SendMessageForm
                                    WebSocketInstance={WebSocketInstance}
                                    chatId={this.props.chatId}
                                    username={this.props.username}
                                    otherProfile={this.state.otherProfile}
                                    myProfile={this.state.myProfile}
                                    updateMessagesComponent={this.props.updateMessagesComponent}
                                />
                            </div>
                            :
                            <div className="current-chat no-chat-selected">
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
