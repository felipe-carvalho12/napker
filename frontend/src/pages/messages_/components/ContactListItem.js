import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'

export default function ContactListItem(props) {
    const profile = props.profile
    const activeChats = props.activeChats
    const activeChatsProfiles = props.activeChatsProfiles
    let unreadMessagesCounter
    let lastChatMessage

    const resetUnreadMessagesCounter = () => {
        unreadMessagesCounter = 0
    }

    const incrementUnreadMessagesCounter = () => {
        unreadMessagesCounter++
    }

    const setLastChatMessage = message => {
        lastChatMessage = message
    }

    return (
        <>
            {profile !== undefined &&
                <Link to={`/mensagens/${profile.slug}`} style={{ color: '#000', textDecoration: 'none' }}>
                    {resetUnreadMessagesCounter()}
                    <li className="list-item profile-chat-item" style={{ whiteSpace: 'nowrap' }}>
                        <img src={`${SERVER_URL}${profile.photo}`}
                            className="profile-img-med"
                            style={{ marginRight: '10px' }}
                        />
                        <div className="d-flex flex-column align-items-start">
                            <div className="d-flex" style={{ maxHeight: '30px' }}>
                                <strong style={{ height: 'fit-content' }}>{profile.first_name} {profile.last_name}</strong>
                                {activeChats[activeChatsProfiles.indexOf(profile)].messages.map((message, i, messages) => {
                                    if (messages[messages.length - 1] === message) setLastChatMessage(message.content)
                                    if (message.read || message.contact.user.username !== profile.user.username) return
                                    incrementUnreadMessagesCounter()
                                })}
                                {unreadMessagesCounter > 0 &&
                                    <div className="notification-text-container">
                                        <div className="notification-text">
                                            {unreadMessagesCounter}
                                        </div>
                                    </div>
                                }
                                <p className="text-secondary" style={{ marginLeft: '5px' }}>@{profile.user.username}</p>
                            </div>
                            <p className="text-secondary">{lastChatMessage.slice(0, 40)}</p>
                        </div>
                    </li>
                </Link>
            }
        </>
    )
}