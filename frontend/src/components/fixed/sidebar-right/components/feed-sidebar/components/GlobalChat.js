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
        <div className="position-relative d-flex flex-column justify-content-between align-items-center w-100 h-100">
            <div className="d-flex justify-content-center align-items-center w-100 b-bottom" style={{ height: 'var(--header-heigth)' }}>
                <h4>Chat global</h4>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100 py-2 b-bottom">
                <h6>Hashtag em alta:</h6>
                <h5 style={{ color: 'var(--primary-color)' }} >#napker</h5>
            </div>
            <div className="chat-log">
                <li className="received">
                    <p>
                        <h6 className="fw-bold mb-1">Devs Napker</h6>
                        Olá tester! Ficamos felizes de ter você aqui.
                    </p>
                </li>
                <li className="received">
                    <p>
                        <h6 className="fw-bold mb-1">Devs Napker</h6>
                        O chat global ainda está em desenvolvimento...
                        <br />
                        <br />
                        Nosso objetivo com ele é que os usuários conversem entre si sobre a hashtag mais usada no dia.
                        Dessa forma, criaremos mais uma forma de engajamento e interação do usuário com a plataforma.
                    </p>
                </li>
                <li className="received">
                    <p>
                        <h6 className="fw-bold mb-1">Devs Napker</h6>
                        Depois passa no grupo pra nos dizer o que achou dessa ideia. ;)
                    </p>
                </li>
            </div>
            <div
                className="d-flex justify-content-center align-items-center w-100 px-1 pt-2 pb-4 my-3 border-bottom"
                style={{ borderTop: '2px solid var(--border-color)', background: '#fff' }}
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