import React from 'react'


export default function StrongMention(props) {
    return (
        <strong className="c-primary-color" style={{ background: 'none' }}>{props.decoratedText}</strong>
    )
}