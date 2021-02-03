import React, { useContext, useEffect, useState } from 'react'

import { SERVER_URL, DEBUG } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'
import { MyProfileContext } from '../../../context/app/AppContext'
import Header from '../../../components/fixed/Header'
import InviteNotification from './components/InviteNotification'
import PublicationNotification from './components/post-notification/PublicationNotification'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'
import MentionNotification from './components/MentionNotification'


let notificationsFetchInterval

export default function Notifications(props) {
    const [, updateMyProfile] = useContext(MyProfileContext)
    const [invites, setInvites] = useState(null)
    const [mentionNotifications, setMentionNotifications] = useState(null)
    const [commentMentionNotifications, setCommentMentionNotifications] = useState(null)
    const [postNotifications, setPostNotifications] = useState(null)
    const [commentNotifications, setCommentNotifications] = useState(null)

    const [didVisualizedLikes, setDidVisualizedLikes] = useState(false)
    const [didVisualizedComments, setDidVisualizedComments] = useState(false)
    const [didVisualizedMentions, setDidVisualizedMentions] = useState(false)

    const isMobile = visualViewport.width <= 980

    document.title = 'Notificações / Napker'

    const fetchNotifications = () => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvites(data))
        fetch(`${SERVER_URL}/post-api/post-mention-notifications`)
            .then(response => response.json())
            .then(data => setMentionNotifications(data))
        fetch(`${SERVER_URL}/post-api/comment-mention-notifications`)
            .then(response => response.json())
            .then(data => setCommentMentionNotifications(data))
        fetch(`${SERVER_URL}/post-api/post-notifications`)
            .then(response => response.json())
            .then(data => setPostNotifications(data))
        fetch(`${SERVER_URL}/post-api/comment-notifications`)
            .then(response => response.json())
            .then(data => setCommentNotifications(data))
    }

    useEffect(() => {
        fetchNotifications()
        notificationsFetchInterval = window.setInterval(fetchNotifications, 3000)
        return () => window.clearInterval(notificationsFetchInterval)
    }, [])

    useEffect(() => {
        if (!didVisualizedMentions && mentionNotifications && mentionNotifications.length) {
            fetch(`${SERVER_URL}/post-api/visualize-mentions`)
                .then(response => response.json())
                .then(data => {
                    DEBUG && console.log(data)
                    setDidVisualizedMentions(true)
                    props.updateNotificationsNumber()
                })
        }
        if (!didVisualizedLikes && postNotifications && postNotifications.length) {
            fetch(`${SERVER_URL}/post-api/visualize-likes`)
                .then(response => response.json())
                .then(data => {
                    DEBUG && console.log(data)
                    setDidVisualizedLikes(true)
                    props.updateNotificationsNumber()
                })
        }
        if (!didVisualizedComments && postNotifications && postNotifications.length) {
            fetch(`${SERVER_URL}/post-api/visualize-comments`)
                .then(response => response.json())
                .then(data => {
                    DEBUG && console.log(data)
                    setDidVisualizedComments(true)
                    props.updateNotificationsNumber()
                })
        }
    }, [postNotifications, commentNotifications])

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
                updateMyProfile()
            })
        document.getElementById(`fr-${btn.dataset.senderid}`).remove()
        fetchNotifications()
    }

    const publicationContentFormatter = rawContent => {
        const blocks = rawContent.blocks
        const length = blocks.reduce((total, block) => total + block.text.length, 0)

        if (length <= 240) return rawContent

        let totalLength = 0
        let reachedMaxLength = false
        const formattedBlocks = blocks.map(block => {
            if (reachedMaxLength) return

            totalLength += block.text.length
            if (totalLength > 240) {
                const remaining = 240 - (totalLength - block.text.length)
                reachedMaxLength = true
                return { ...block, text: block.text.slice(0, remaining) + '...' }
            }
            return block
        })

        rawContent.blocks = formattedBlocks

        return rawContent
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
                    {invites !== null && mentionNotifications !== null && commentMentionNotifications !== null && postNotifications !== null && commentNotifications !== null ?
                        <div>
                            {invites.length || mentionNotifications.length || commentMentionNotifications.length || postNotifications.length || commentNotifications.length ?
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

                                    {!!mentionNotifications.length &&
                                        <div>
                                            {mentionNotifications.map(mention => {
                                                return (
                                                    <MentionNotification type="post" mention={mention} publicationContentFormatter={publicationContentFormatter} />
                                                )
                                            })}
                                        </div>
                                    }

                                    {!!commentMentionNotifications.length &&
                                        <div>
                                            {commentMentionNotifications.map(mention => {
                                                return (
                                                    <MentionNotification type="comment" mention={mention} publicationContentFormatter={publicationContentFormatter} />
                                                )
                                            })}
                                        </div>
                                    }

                                    {!!postNotifications.length &&
                                        <div>
                                            {postNotifications.map(notification => {
                                                return (
                                                    <PublicationNotification type="post" notification={notification} publicationContentFormatter={publicationContentFormatter} />
                                                )
                                            })}
                                        </div>
                                    }

                                    {!!commentNotifications.length &&
                                        <div>
                                            {commentNotifications.map(notification => {
                                                return (
                                                    <PublicationNotification type="comment" notification={notification} publicationContentFormatter={publicationContentFormatter} />
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