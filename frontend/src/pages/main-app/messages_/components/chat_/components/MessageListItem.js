import React, { useState } from 'react'
import { EditorState, convertFromRaw } from "draft-js"
import Editor from "draft-js-plugins-editor"
import createEmojiPlugin from "draft-js-emoji-plugin"

import { renderTimestamp } from '../../../../../../config/utils'
import { emojiTheme } from '../../../../home/components/posts_/components/post-textbox/themes/index'



const emojiPlugin = createEmojiPlugin({ theme: emojiTheme })
const plugins = [emojiPlugin]

export default function MessageListItem(props) {
    const message = props.message
    const currentUser = props.currentUser

    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(message.content))))

    return (
        <div className={`mb-3 d-flex flex-column align-items-${message.author === currentUser ? "end" : "start"}`}>
            <li
                key={message.id}
                className={`w-100 mb-1 ${message.author === currentUser ? "sent" : "received"}`}
            >
                <p className="m-0">
                    <Editor
                        editorState={editorState}
                        onChange={newEditorState => setEditorState(newEditorState)}
                        plugins={plugins}
                    />
                </p>
            </li>
            <small className="fw-400">
                {renderTimestamp(message.timestamp)} {message.author === currentUser ?
                    message.read ?
                        <i class="fas fa-check-double" />
                        :
                        <i class="fas fa-check" />
                    :
                    ''
                }
            </small>
        </div>
    )
}