import React from 'react'


export default function MentionComponent(props) {
    return (
        <strong className="c-primary-color" style={{ background: 'none' }}>{props.decoratedText}</strong>
    )
}