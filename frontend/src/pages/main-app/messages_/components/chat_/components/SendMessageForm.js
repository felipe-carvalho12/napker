import React, { useEffect, useState } from 'react'

import EmojiPicker from '../../../../../../components/EmojiPicker'


export default function SendMessageForm(props) {
    const WebSocketInstance = props.WebSocketInstance
    const chatId = props.chatId
    const username = props.username
    const otherProfile = props.otherProfile
    const myProfile = props.myProfile
    const updateMessagesComponent = props.updateMessagesComponent
    const setOtherUserIsTyping = props.setOtherUserIsTyping

    const [message, setMessage] = useState('')

    let counter = 5
    let typingInterval

    useEffect(() => {
        typingInterval = window.setInterval(decreaseCounter, 1000)

    }, [])

    const decreaseCounter = () => {
        if (counter > 0) counter--
        else {
            setOtherUserIsTyping(false)
            counter = 5
        }
    }

    const messageChangeHandler = e => {
        setMessage(e.target.value)
        const el = document.querySelector('#chat-message-submit')
        el.disabled = e.target.value.trim() === ''

        WebSocketInstance.setIsTyping(myProfile.user.id)
        counter = 5
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
        updateMessagesComponent()
    }

    return (
        <>
            <form
                className="d-flex justify-content-center align-items-center w-100 px-1 py-3 b-theme-base-color"
                style={{ borderTop: '2px solid var(--border-color)' }}
                onSubmit={sendMessageHandler}
            >
                <EmojiPicker />
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