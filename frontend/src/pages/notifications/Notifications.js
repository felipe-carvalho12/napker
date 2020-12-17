import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../config/settings'
import { csrftoken } from '../../config/utils'
import Header from '../../components/fixed/Header'
import InviteNotification from './components/InviteNotification'
import LikeProfileNotification from './components/LikeProfileNotification'
import CommentProfileNotification from './components/CommentProfileNotification'
import NewLabel from './components/NewLabel'
import BottomMenu from '../../components/fixed/bottom-menu/BottomMenu'

export default function Notifications(props) {
    const [invites, setInvites] = useState(null)
    const [unvisualizedPostLikes, setUnvisualizedPostLikes] = useState(null)
    const [visualizedPostLikes, setVisualizedPostLikes] = useState(null)
    const [unvisualizedComments, setUnvisualizedComments] = useState(null)
    const [visualizedComments, setVisualizedComments] = useState(null)

    let notificationsFetchInterval

    document.title = 'Notificações / Napker'

    const fetchNotifications = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvites(data))
        fetch(`${SERVER_URL}/post-api/unvisualized-post-likes`)
            .then(response => response.json())
            .then(data => setUnvisualizedPostLikes(data))
        fetch(`${SERVER_URL}/post-api/unvisualized-post-comments`)
            .then(response => response.json())
            .then(data => setUnvisualizedComments(data))
        fetch(`${SERVER_URL}/post-api/post-likes-visualized-last-2-days`)
            .then(response => response.json())
            .then(data => setVisualizedPostLikes(data))
        fetch(`${SERVER_URL}/post-api/post-comments-visualized-last-2-days`)
            .then(response => response.json())
            .then(data => setVisualizedComments(data))
    }

    useEffect(() => {
        fetchNotifications()
        notificationsFetchInterval = window.setInterval(fetchNotifications, 3000)
        return () => window.clearInterval(notificationsFetchInterval)
    }, [])

    useEffect(() => {
        if (unvisualizedPostLikes && unvisualizedPostLikes.length) {
            fetch(`${SERVER_URL}/post-api/visualize-likes`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.updateNotificationsNumber()
                })
        }
    }, [unvisualizedPostLikes])

    useEffect(() => {
        if (unvisualizedComments && unvisualizedComments.length) {
            fetch(`${SERVER_URL}/post-api/visualize-comments`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.updateNotificationsNumber()
                })
        }
    }, [unvisualizedComments])

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
                    {invites !== null && unvisualizedPostLikes && visualizedPostLikes !== null && unvisualizedComments !== null && visualizedComments !== null ?
                        <div>
                            {invites.length || unvisualizedPostLikes.length || visualizedPostLikes.length || unvisualizedComments.length || !!visualizedComments.length ?
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

                                    {(!!unvisualizedPostLikes.length || !!unvisualizedComments.length) &&
                                        <>
                                            {!!unvisualizedPostLikes.length &&
                                                <>
                                                    {unvisualizedPostLikes.map(like => {
                                                        return (
                                                            <LikeProfileNotification like={like}>
                                                                <NewLabel />
                                                            </LikeProfileNotification>
                                                        )
                                                    })}
                                                </>
                                            }

                                            {!!unvisualizedComments.length &&
                                                <>
                                                    {unvisualizedComments.map(comment => {
                                                        return (
                                                            <CommentProfileNotification comment={comment}>
                                                                <NewLabel />
                                                            </CommentProfileNotification>
                                                        )
                                                    })}
                                                </>
                                            }
                                        </>
                                    }

                                    {(!!visualizedPostLikes.length || !!visualizedComments.length) &&
                                        <>
                                            {!!visualizedPostLikes.length &&
                                                <>
                                                    {visualizedPostLikes.map(like => {
                                                        return (
                                                            <LikeProfileNotification like={like} />
                                                        )
                                                    })}
                                                </>
                                            }

                                            {!!visualizedComments.length &&
                                                <>
                                                    {visualizedComments.map(comment => {
                                                        return (
                                                            <CommentProfileNotification comment={comment} />
                                                        )
                                                    })}
                                                </>
                                            }
                                        </>
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