import React from 'react'
import { Link } from 'react-router-dom'


export default function LinkMention(props) {
    return (
        <Link to={`/user/${props.mention.name}`} onClick={e => e.stopPropagation()}>
            <strong className="c-primary-color" style={{ background: 'none' }}>{props.decoratedText}</strong>
        </Link>
    )
}