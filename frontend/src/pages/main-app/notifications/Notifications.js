import React, { useEffect, useState } from 'react'

import { SERVER_URL, DEBUG } from '../../../config/settings'
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
    const isMobile = visualViewport.width <= 980

    document.title = 'Notificações / Napker'

    const fetchNotifications = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvites(data))
        console.log(invites)
        fetch(`${SERVER_URL}/post-api/post-notifications`)
            .then(response => response.json())
            .then(data => setPostNotifications(data))
        console.log(postNotifications)
    }

    useEffect(() => {
        fetchNotifications()
        notificationsFetchInterval = window.setInterval(fetchNotifications, 3000)
        return () => window.clearInterval(notificationsFetchInterval)
    }, [])

    useEffect(() => {
        if (!didVisualizedLikes && postNotifications && postNotifications[0] && postNotifications[0].likes && postNotifications[0].likes.length) {
            fetch(`${SERVER_URL}/post-api/visualize-likes`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    didVisualizedLikes = true
                    props.updateNotificationsNumber()
                })
        }
        if (!didVisualizedComments && postNotifications && postNotifications[0] && postNotifications[0].comments && postNotifications[0].comments.length) {
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
        fetch(`${SERVER_URL}/profile-api/reply-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'senderid': btn.dataset.senderid,
                'reply': btn.dataset.reply
            })
        })
            .then(response => response.json())
            .then(data => {
                DEBUG && console.log(data)
                props.updateNotificationsNumber()
            })
        document.getElementById(`fr-${btn.dataset.senderid}`).remove()
        fetchNotifications()
    }

    return (
        <div className="content-container">
            {isMobile ?
                <Header
                    page="Notificações"
                    className="b-theme-base-color box-med blur-20px"
                    style={{ position: "sticky", top: "1vw", padding: "var(--sz-2)", zIndex: "1000", borderRadius: '0' }}
                />
                :
                <div className="b-theme-base-color box-med blur-20px" style={{ position: "sticky", top: "1vw", padding: "0 var(--sz-2)", zIndex: "1000" }}>
                    <Header page="Notificações" />
                </div>
            }
            <div className="content m-vw-x">
                <div>
                    {invites !== null && postNotifications !== null ?
                        <div>
                            {invites.length || postNotifications.length ?
                                <div className="notifications-container">
                                    {!!invites.length &&
                                        <div>
                                            {invites.map((invite, index) => {
                                                return (
                                                    <InviteNotification
                                                        invite={invite}
                                                        replyRequest={replyRequest}
                                                        style={{ borderTopLeftRadius: !index && '0', borderTopRightRadius: !index && '0' }}
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

                                </div>
                                :
                                <div className="d-flex justify-content-center mt-5">
                                    <span className="c-secondary-grey fw-300 fs-21 fa-l mr-10px">Você não tem nenhuma notificação.</span>
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
        </div>
    )
}