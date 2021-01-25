import React from 'react'
import { Link } from 'react-router-dom'
import { convertFromRaw, EditorState } from "draft-js"


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

    const setLastChatMessage = messageContent => {
        lastChatMessage = EditorState.createWithContent(convertFromRaw(JSON.parse(messageContent))).getCurrentContent().getPlainText()
    }

    return (
        <>
            {profile !== undefined &&
                <Link to={`/mensagens/${profile.user.username}`} style={{ color: '#000', textDecoration: 'none' }}>
                    {resetUnreadMessagesCounter()}
                    <li className="list-item d-flex justify-content-start p-2 b-theme-base-color c-primary-grey base-hover box-med" style={{ whiteSpace: 'nowrap' }}>
                        <img src={profile.photo}
                            className="profile-img-sm"
                            style={{ marginRight: '10px' }}
                        />
                        <div className="d-flex flex-column align-items-start">
                            <div className="d-flex" style={{ maxHeight: '30px' }}>
                                <strong style={{ height: 'fit-content' }}>{profile.first_name} {profile.last_name}</strong>
                                {activeChats[activeChatsProfiles.map(p => p.user.username).indexOf(profile.user.username)].messages.map((message, i, messages) => {
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
                            <p className="text-secondary">{lastChatMessage.slice(0, 25)}{lastChatMessage.length > 25 && '...'}</p>
                        </div>
                    </li>
                </Link>
            }
        </>
    )
}