import React from 'react'


export default function EmojiPicker(props) {

    return (
        <label
            className="far fa-smile smile"
            id="emoji-button"
            style={props.style}
            onClick={() => window.alert('Para abrir a lista de emojis: \n No Windows: Windows + . \n No Mac: Command + Ctrl + Espaço \n No Linux: Depende da versão')}
        >
        </label>
    )
} 