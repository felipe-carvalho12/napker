import React from 'react'

export default function MessageListItem(props) {
    const message = props.message
    const currentUser = props.currentUser

    const renderTimestamp = timestamp => {
        const ts = new Date(timestamp)
        const day = ts.getDate() >= 10 ? ts.getDate() : `0${ts.getDate()}`
        const month = ts.getMonth() >= 10 ? ts.getMonth() : `0${ts.getMonth()}`
        const hour = ts.getHours() >= 10 ? ts.getHours() : `0${ts.getHours()}`
        const minute = ts.getMinutes() >= 10 ? ts.getMinutes() : `0${ts.getMinutes()}`
        return `${day}/${month}/${ts.getFullYear()} - ${hour}:${minute}`
    }

    return (
        <li
            key={message.id}
            className={message.author === currentUser ? "sent" : "received"}
        >
            <p>
                {message.content}
                <br />
                <small>
                    {renderTimestamp(message.timestamp)} {message.author === currentUser ?
                        message.read ?
                            <i class="fas fa-check-double" />
                            :
                            <i class="fas fa-check" />
                        :
                        ''
                    }
                </small>
            </p>
        </li>
    )
}