import React from 'react'
import { Link } from 'react-router-dom'

import { csrftoken } from '../../../../../config/utils'
import { SERVER_URL } from '../../../../../config/settings'
import WebSocketInstance from '../../websocket'
import SendMessageForm from './components/SendMessageForm'
import MessageListItem from './components/MessageListItem'

class Chat extends React.Component {
    initialiseChat() {
        console.log('initializing chat...')
        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.getMessages.bind(this),
                this.addMessage.bind(this),
                this.setTyping.bind(this),
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
            scrolledToBottom: false,
            myProfile: null,
            otherUsername: this.props.otherUsername,
            otherProfile: null,
            otherUserIsTyping: false,
        }
        this.initialiseChat();
    }

    handleComponentChange = () => {
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
        if (this.state.messages.length && !this.state.scrolledToBottom && document.querySelectorAll('.sent, .received').length) {
            this.scrollToBottom()
        }
    }

    componentDidMount() {
        this.handleComponentChange()
    }


    componentDidUpdate() {
        this.handleComponentChange()
        document.querySelector('#contact-filter-input') &&
            document.activeElement !== document.querySelector('#contact-filter-input') &&
            document.querySelector('#chat-message-input') &&
            document.querySelector('#chat-message-input').focus()
    }

    componentWillUnmount() {
        WebSocketInstance.disconnect()
    }

    componentWillReceiveProps(newProps) {
        if (newProps.chatId && newProps.chatId !== this.props.chatId && newProps.otherUsername && WebSocketInstance.state() !== 1) {
            this.waitForSocketConnection(() => {
                WebSocketInstance.fetchMessages(
                    newProps.username,
                    newProps.chatId
                );
            });
            WebSocketInstance.connect(newProps.chatId)
            this.readMessages(newProps)

            this.props.updateMessagesComponent()
            this.setState({
                messages: newProps.chatsMessages[newProps.chatId] ? newProps.chatsMessages[newProps.chatId] : [],
                scrolledToBottom: false,
            })
        }
        if (this.state.otherUsername !== newProps.otherUsername) {
            this.setState({
                otherUsername: newProps.otherUsername
            })
        }
        if (this.props.updateUnreadMessagesNumber) {
            this.props.updateUnreadMessagesNumber()
        }
        if (this.state.otherUsername && !newProps.otherUsername) {
            WebSocketInstance.disconnect()
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

        const key = this.props.chatId.toString()
        const obj = { ...this.props.chatsMessages }
        obj[key] = this.state.messages
        this.props.setChatsMessages(obj)
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages.slice(0, this.state.messages.length - 1), message],
            scrolledToBottom: false
        })
        this.readMessages(this.props)
        this.setState({ otherUserIsTyping: false })
    }

    setTyping(userId) {
        if (userId !== this.state.myProfile.user.id) {
            this.setState({
                otherUserIsTyping: true
            })
        }
    }

    scrollToBottom = () => {
        if (document.querySelector('#chat-log')) {
            const chatLog = document.querySelector('#chat-log')
            chatLog.scrollTop = chatLog.scrollHeight
            this.setState({
                scrolledToBottom: true
            })
        }
    };

    render() {
        return (
            <>
                {this.state.otherProfile !== null || !this.props.otherUsername ?
                    <>
                        {this.state.otherProfile ?
                            <div
                                className="d-flex flex-column justify-content-between align-items-center h-100 b-theme-base-color current-chat"
                                style={{ width: '60%', background: 'var(--tertiary-grey)' }}
                            >
                                <div className="current-chat-header">
                                    <i class="fas fa-arrow-left left-arrow-icon d-none" onClick={() => window.history.back()} />
                                    <Link to={`/user/${this.state.otherProfile.slug}`}>
                                        <img src={this.state.otherProfile.photo}
                                            className="profile-img-sm"
                                            style={{ marginRight: '5px' }}
                                        />
                                    </Link>
                                    <div className="d-flex flex-column align-items-start" style={{ height: '52px' }}>
                                        <strong>{this.state.otherProfile.first_name} {this.state.otherProfile.last_name}</strong>
                                        {this.state.otherUserIsTyping ?
                                            <p className="text-secondary d-flex">
                                                <strong>@{this.state.otherProfile.user.username}</strong>
                                                <spam className="ml-1">está digitando...</spam>
                                            </p>
                                            :
                                            <p className="text-secondary">@{this.state.otherProfile.user.username}</p>
                                        }
                                    </div>
                                </div>
                                {WebSocketInstance.state() === 1 || this.state.messages.length ?
                                    <div id="chat-log" className="h-100 chat-log">
                                        {this.state.messages.map(message => {
                                            return (
                                                <MessageListItem message={message} currentUser={this.props.username} />
                                            )
                                        })
                                        }
                                    </div>
                                    :
                                    <div className="loader-container">
                                        <div className="loader" />
                                    </div>
                                }
                                <SendMessageForm
                                    WebSocketInstance={WebSocketInstance}
                                    chatId={this.props.chatId}
                                    username={this.props.username}
                                    otherProfile={this.state.otherProfile}
                                    myProfile={this.state.myProfile}
                                    updateMessagesComponent={this.props.updateMessagesComponent}
                                    setOtherUserIsTyping={bool => this.setState({ otherUserIsTyping: bool })}
                                    addMessage={message => this.setState({
                                        messages: [...this.state.messages, message],
                                        scrolledToBottom: false
                                    })}
                                />
                            </div>
                            :
                            <div
                                className="d-flex flex-column justify-content-center align-items-center h-100 no-chat-selected"
                                style={{ width: '60%' }}
                            >
                                <div>
                                    <strong style={{ fontSize: 'larger' }}>Você não tem uma conversa selecionada</strong>
                                    <p className="text-secondary">Selecione uma existente ou comece uma nova</p>
                                    <button className="btn btn-primary" onClick={() => this.props.openModal()}>Nova conversa</button>
                                </div>
                            </div>
                        }
                    </>
                    :
                    <div className="loader-container" style={{ width: '60%' }}>
                        <div className="loader" />
                    </div>
                }
            </>
        )
    }
}

export default Chat
