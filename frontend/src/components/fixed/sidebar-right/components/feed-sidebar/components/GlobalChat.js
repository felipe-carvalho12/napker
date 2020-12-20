import React, { useState } from 'react'
import Picker from 'emoji-picker-react'

import { openCloseEmojiList } from '../../../../../../config/utils'

export default function GlobalChat() {
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

    return (
        <div className="position-relative w-100 h-100">
            <div className="d-flex justify-content-center align-items-center b-bottom" style={{ height: 'var(--header-heigth)' }}>
                <h4>Chat global</h4>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center py-2 b-bottom">
                <h6>Hashtag em alta:</h6>
                <h5 style={{ color: 'var(--primary-color)' }} >#napker</h5>
            </div>
            <div>

            </div>
            <div
                className="position-absolute d-flex justify-content-center align-items-center w-100 px-1 py-2 my-3 border-bottom"
                style={{ borderTop: '2px solid var(--border-color)', bottom: '30px' }}
            >
                <input
                    placeholder="Mensagem"
                    className="message-input w-80"
                    id="chat-message-input"
                    value={message}
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
            </div>
        </div>
    )
}