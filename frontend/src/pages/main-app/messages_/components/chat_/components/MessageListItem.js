import React from 'react'

import { renderTimestamp } from '../../../../../../config/utils'


export default function MessageListItem(props) {
    const message = props.message
    const currentUser = props.currentUser

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