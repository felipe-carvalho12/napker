import React, { useState } from 'react'
import Picker from 'emoji-picker-react'

import { openCloseEmojiList } from '../../../../../../config/utils'

export default function SendMessageForm(props) {
    const WebSocketInstance = props.WebSocketInstance
    const chatId = props.chatId
    const username = props.username
    const otherProfile = props.otherProfile
    const myProfile = props.myProfile
    const updateMessagesComponent = props.updateMessagesComponent

    const [message, setMessage] = useState('')

    const messageChangeHandler = e => {
        setMessage(e.target.value)
        const el = document.querySelector('#chat-message-submit')
        el.disabled = e.target.value.trim() === ''
    }

    const onEmojiSelect = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji)
        document.querySelector('#chat-message-submit').disabled = false
    }

    const sendMessageHandler = e => {
        e.preventDefault()
        const messageObject = {
            from: username,
            content: message,
            chatId: chatId
        };
        setMessage('')
        if (otherProfile.blocked_users.map(u => u.id).includes(myProfile.user.id)) {
            window.alert(`Você não pode enviar mensagens para ${otherProfile.first_name}.
            ${otherProfile.first_name} te bloqueou.`)
            return
        }
        if (myProfile.blocked_users.map(u => u.id).includes(otherProfile.user.id)) {
            window.alert(`Você não pode enviar mensagens para ${otherProfile.first_name}.
            Você bloqueou ${otherProfile.first_name}.`)
            return
        }
        WebSocketInstance.newChatMessage(messageObject)
        document.querySelector('#chat-message-submit').disabled = true
        openCloseEmojiList(true)
        updateMessagesComponent()
    }

    return (
        <>
            <div className="emoji-list-container chat-emoji-list" id="emoji-list-container">
                <Picker onEmojiClick={onEmojiSelect} />
            </div>
            <form
                className="d-flex justify-content-center align-items-center w-100 p-1"
                style={{ borderTop: '2px solid var(--border-color)' }}
                onSubmit={sendMessageHandler}
            >
                <label
                    className="far fa-smile"
                    id="emoji-button"
                    onClick={() => openCloseEmojiList(false)}
                />
                <input
                    placeholder="Mensagem"
                    className="message-input"
                    id="chat-message-input"
                    value={message}
                    autoFocus={document.querySelector('#contact-filter-input').value === ''}
                    onChange={messageChangeHandler}
                />
                <button
                    className="btn btn-primary d-flex justify-content-center align-items-center"
                    id="chat-message-submit"
                    style={{ height: '35px' }}
                    disabled
                >
                    <i class="fas fa-chevron-right" style={{ fontSize: 'large' }} />
                </button>
            </form>
        </>
    )
}