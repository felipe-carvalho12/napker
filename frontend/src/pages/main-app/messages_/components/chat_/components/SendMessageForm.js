import React, { useEffect, useRef, useState } from 'react'

import { EditorState, ContentState, convertToRaw } from "draft-js"
import Editor from "draft-js-plugins-editor"
import createEmojiPlugin from "draft-js-emoji-plugin"

import { emojiTheme } from '../../../../home/components/posts_/components/components/post-textbox/themes/index'


const emojiPlugin = createEmojiPlugin({
    theme: {...emojiTheme, emojiSelectPopover: `${emojiTheme.emojiSelectPopover} send-message-emoji-popover`},
    selectButtonContent: (
        <i className="far fa-smile icon smile m-0 p-0 hover-bg-none" />
    )
})
const plugins = [emojiPlugin]

let shouldClearEditor = false

export default function SendMessageForm(props) {
    const WebSocketInstance = props.WebSocketInstance
    const chatId = props.chatId
    const username = props.username
    const otherProfile = props.otherProfile
    const myProfile = props.myProfile
    const updateMessagesComponent = props.updateMessagesComponent
    const setOtherUserIsTyping = props.setOtherUserIsTyping
    const addMessage = props.addMessage

    const editor = useRef(null)

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [message, setMessage] = useState('')

    let counter = 5
    let typingInterval

    useEffect(() => {
        typingInterval = window.setInterval(decreaseCounter, 1000)
    }, [])

    useEffect(() => {
        if (shouldClearEditor) {
            setEditorState(EditorState.push(editorState, ContentState.createFromText('')))
        }
    }, [shouldClearEditor])

    const decreaseCounter = () => {
        if (counter > 0) counter--
        else {
            setOtherUserIsTyping(false)
            counter = 5
        }
    }

    const messageChangeHandler = newEditorState => {
        setEditorState(newEditorState)
        setMessage(renderContentAsRawJs())
        const el = document.querySelector('#chat-message-submit')
        if (el) el.disabled = newEditorState.getCurrentContent().getPlainText().trim() === ''

        myProfile && WebSocketInstance.setIsTyping(myProfile.user.id)
        counter = 5
    }

    const sendMessageHandler = e => {
        e.preventDefault()
        if (!JSON.parse(message).blocks.reduce((total, block) => total + block.text.length, 0)) {
            window.alert('A mensagem não pode estar em branco!')
            return
        }
        shouldClearEditor = true
        addMessage({
            author: username,
            content: message,
            id: Math.round(Math.random() * -1000000),
            read: false,
            timestamp: Date.now()
        })
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

    const renderContentAsRawJs = () => {
        const contentState = editorState.getCurrentContent()
        const raw = convertToRaw(contentState)

        return JSON.stringify(raw)
    }

    const { EmojiSelect, EmojiSuggestions } = emojiPlugin

    return (
        <>
            <form
                className="d-flex justify-content-center align-items-center w-100 b-theme-base-color px-1 py-3 b-b-r-r b-t"
                onSubmit={sendMessageHandler}
            >
                <EmojiSuggestions />
                <div className="w-75 position-relative mr-2">
                    <div
                        className="message-input box-shadow pr-30px w-100"
                        onClick={() => editor.current.focus()}
                    >
                        <Editor
                            editorState={editorState}
                            onChange={messageChangeHandler}
                            plugins={plugins}
                            ref={editor}
                            placeholder="Mensagem"
                        />
                        <div className="position-absolute" style={{ right: '5px' }}>
                            <EmojiSelect />
                        </div>
                    </div>
                </div>
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