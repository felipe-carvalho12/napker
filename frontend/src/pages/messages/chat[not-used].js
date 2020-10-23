import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../../settings'

export default function Chat(props) {
    const [loggedUsername, setLoggedUsername] = useState(null)
    const [profile, setProfile] = useState(null)
    const otherUsername = props.username
    if (otherUsername) {
        const chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${otherUsername}/`)
        if (!profile || profile.user.username !== otherUsername) {
            fetch(`${SERVER_URL}/profile-api/user/${otherUsername}`)
                .then(response => response.json())
                .then(data => setProfile(data))
        }

        if (!loggedUsername) {
            fetch(`${SERVER_URL}/profile-api/logged-user`)
                .then(response => response.json())
                .then(data => setLoggedUsername(data.username))
        }

        if (document.querySelector('#chat-log')) { // DOMContent loaded
            chatSocket.onopen = function (e) {
                chatSocket.send(JSON.stringify({'command': 'fetch-messages'}))
            }

            chatSocket.onmessage = function (e) {
                const data = JSON.parse(JSON.parse(e.data))
                if (data.command === 'messages') {
                    for (let message of data.messages) {
                        createMessage(message)
                    }
                } else if (data.command === 'new-message') {
                    createMessage(data.message)
                }
            }
            chatSocket.onclose = function (e) {
                console.error('Chat socket closed unexpectedly')
            }

            function createMessage(message) {
                console.log('message', message)
                const author = message.author
                const messageliTag = document.createElement('li')
                const pTag = document.createElement('p')
                pTag.textContent = message.content
                messageliTag.append(pTag)
                if (author === loggedUsername) {
                    messageliTag.className = 'sent'
                } else {
                    messageliTag.className = 'received'
                }
                document.querySelector('#chat-log').append(messageliTag)
                updateScroll()
            }

            function updateScroll(){
                var element = document.getElementById("chat-log");
                element.scrollTop = element.scrollHeight;
            }

            document.querySelector('#chat-message-input').focus()
            document.querySelector('#chat-message-input').onkeyup = function (e) {
                if (e.keyCode === 13) {  // enter, return
                    document.querySelector('#chat-message-submit').click()
                }
            }

            document.querySelector('#chat-message-submit').onclick = function (e) {
                const messageInputDom = document.querySelector('#chat-message-input')
                const message = messageInputDom.value;
                chatSocket.send(JSON.stringify({
                    'command': 'new-message',
                    'from': loggedUsername,
                    'message': message
                }))
                messageInputDom.value = ''
            }
        }
    }

    return (
        <>
            {otherUsername && profile ?
                <div className="d-flex flex-column justify-content-between align-items-center current-chat">
                    <div className="current-chat-header">
                        <Link to="/user/felipe">
                            <img src={`${SERVER_URL}${profile.photo}`} className="header-profile-img" />
                        </Link>
                        <div className="d-flex flex-column align-items-start" style={{ height: '52px' }}>
                            <strong>{profile.first_name} {profile.last_name}</strong>
                            <p className="text-secondary">@{profile.user.username}</p>
                        </div>
                    </div>
                    <div id="chat-log"></div>
                    <div className="send-message-container">
                        <input placeholder="Mensagem" className="message-input" id="chat-message-input" />
                        <button className="btn btn-primary" id="chat-message-submit">
                            <i class="fas fa-paper-plane" style={{ position: 'relative', right: '10%' }} />
                        </button>
                    </div>
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