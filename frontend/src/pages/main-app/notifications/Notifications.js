import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'
import Header from '../../../components/fixed/Header'
import InviteNotification from './components/InviteNotification'
import PostNotification from './components/post-notification/PostNotification'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'


let didVisualizedLikes = false
let didVisualizedComments = false
let notificationsFetchInterval

export default function Notifications(props) {
    const [invites, setInvites] = useState(null)
    const [postNotifications, setPostNotifications] = useState(null)

    document.title = 'Notificações / Napker'

    const fetchNotifications = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvites(data))
        fetch(`${SERVER_URL}/post-api/post-notifications`)
            .then(response => response.json())
            .then(data => setPostNotifications(data))
    }

    useEffect(() => {
        fetchNotifications()
        notificationsFetchInterval = window.setInterval(fetchNotifications, 3000)
        return () => window.clearInterval(notificationsFetchInterval)
    }, [])

    useEffect(() => {
        if (!didVisualizedLikes && postNotifications && postNotifications[0].likes && postNotifications[0].likes.length) {
            fetch(`${SERVER_URL}/post-api/visualize-likes`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    didVisualizedLikes = true
                    props.updateNotificationsNumber()
                })
        }
        if (!didVisualizedComments && postNotifications && postNotifications[0].comments && postNotifications[0].comments.length) {
            fetch(`${SERVER_URL}/post-api/visualize-comments`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    didVisualizedComments = true
                    props.updateNotificationsNumber()
                })
        }
    }, [postNotifications])

    const replyRequest = e => {
        e.stopPropagation()
        const btn = e.target
        const requestBody = {
            'senderid': btn.dataset.senderid,
            'reply': btn.dataset.reply
        }
        fetch(`${SERVER_URL}/profile-api/reply-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.updateNotificationsNumber()
            })
        document.getElementById(`fr-${btn.dataset.senderid}`).remove()
        fetchNotifications()
    }

    return (
        <>
            <Header page="Notificações" />
            <div className="content">
                <div>
                    {invites !== null && postNotifications !== null ?
                        <div>
                            {invites.length || postNotifications.length ?
                                <div className="notifications-container">
                                    {!!invites.length &&
                                        <div>
                                            {invites.map(invite => {
                                                return (
                                                    <InviteNotification
                                                        invite={invite}
                                                        replyRequest={replyRequest}
                                                    />
                                                )
                                            })}
                                        </div>
                                    }


                                    {!!postNotifications.length &&
                                        <div>
                                            {postNotifications.map(notification => {
                                                return (
                                                    <PostNotification notification={notification} />
                                                )
                                            })}
                                        </div>
                                    }

                                </div> :
                                <div className="d-flex justify-content-center mt-5">
                                    <h3>Você não tem nenhuma notificação</h3>
                                </div>
                            }

                        </div> :
                        <div className="d-flex justify-content-center mt-5">
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
            <BottomMenu />
        </>
    )
}