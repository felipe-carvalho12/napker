import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/main/header'
import { SERVER_URL } from '../settings'
import { csrftoken } from '../utils'

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
        <div>
            <Header page="Notificações" />
            <div className="content">
                <div>
                    {invites !== null && unvisualizedPostLikes && visualizedPostLikes !== null && unvisualizedComments !== null && visualizedComments !== null ?
                        <div>
                            {invites.length || unvisualizedPostLikes.length || visualizedPostLikes.length || unvisualizedComments.length || !!visualizedComments.length ?
                                <div className="notifications-container">
                                    {!!invites.length &&
                                        <div>
                                            {invites.map(i => {
                                                return (
                                                    <li
                                                        className="friend-request-row"
                                                        id={`fr-${i.sender.id}`}
                                                        key={i.sender.id}
                                                        onClick={() => window.location.href = `/user/${i.sender.slug}`}
                                                    >
                                                        <div className="friend-request-col">
                                                            <img src={`${SERVER_URL}${i.sender.photo}`}
                                                                className="profile-img-med"
                                                                style={{ marginRight: '10px' }}
                                                            />
                                                            <div className="d-flex flex-column align-items-start">
                                                                <strong>{i.sender.first_name} {i.sender.last_name}</strong>
                                                                <p className="text-secondary">@{i.sender.user.username}</p>
                                                            </div>
                                                        </div>
                                                        <div className="friend-request-col">
                                                            {i.sender.bio}
                                                        </div>
                                                        <div className="friend-request-col" style={{ justifyContent: 'space-between' }}>
                                                            <button className="btn btn-primary btn-reply-fr mr-1" data-senderid={i.sender.id} data-reply='accept' onClick={replyRequest}>Confirmar</button>
                                                            <button className="btn btn-grey btn-reply-fr" data-senderid={i.sender.id} data-reply='decline' onClick={replyRequest}>Excluir</button>
                                                        </div>
                                                    </li>
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
                                                            <li className="notification-row" key={like.profile.id}>
                                                                <div className="d-flex align-items-center">
                                                                    <i class="fas fa-heart notification-like" />
                                                                    <Link to={`/user/${like.profile.slug}`}>
                                                                        <img src={`${SERVER_URL}${like.profile.photo}`}
                                                                            className="profile-img-sm"
                                                                            style={{ marginRight: '10px' }}
                                                                        />
                                                                    </Link>
                                                                    <p className="text-secondary d-inline-block">
                                                                        {like.created.split('-').reverse().join('/')}
                                                                    </p>
                                                                    <div className="notification-text-container">
                                                                        <div className="notification-text">
                                                                            novo
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="notification-message">
                                                                    <p>
                                                                        <Link to={`/user/${like.profile.slug}`} style={{ color: "#000" }}>
                                                                            @{like.profile.user.username}
                                                                        </Link> curtiu seu post.
                                                                    </p>
                                                                </div>
                                                                <div className="notification-post-content">
                                                                    {like.post.content}
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </>
                                            }

                                            {!!unvisualizedComments.length &&
                                                <>
                                                    {unvisualizedComments.map(comment => {
                                                        return (
                                                            <li className="notification-row" key={comment.author.id}>
                                                                <div className="d-flex align-items-center">
                                                                    <i class="fas fa-comment notification-comment" />
                                                                    <Link to={`/user/${comment.author.slug}`}>
                                                                        <img src={`${SERVER_URL}${comment.author.photo}`}
                                                                            className="profile-img-sm"
                                                                            style={{ marginRight: '10px' }}
                                                                        />
                                                                    </Link>
                                                                    <p className="text-secondary d-inline-block">
                                                                        {comment.created.split('-').reverse().join('/')}
                                                                    </p>
                                                                    <div className="notification-text-container">
                                                                        <div className="notification-text">
                                                                            novo
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                <div className="notification-message">
                                                                    <p>
                                                                        <Link to={`/user/${comment.author.slug}`} style={{ color: "#000" }}>
                                                                            @{comment.author.user.username}
                                                                        </Link> comentou seu post.
                                                                </p>
                                                                </div>
                                                                <div className="notification-comment-container">
                                                                    <div className="notification-comment-content">
                                                                        {comment.content}
                                                                    </div>
                                                                    <Link to={`/post/${comment.post.id}`}>
                                                                        <button className="btn btn-primary">
                                                                            Ver Post
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </li>
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
                                                            <li className="notification-row" key={like.profile.id}>
                                                                <div className="d-flex align-items-center">
                                                                    <i class="fas fa-heart notification-like" />
                                                                    <Link to={`/user/${like.profile.slug}`}>
                                                                        <img src={`${SERVER_URL}${like.profile.photo}`}
                                                                            className="profile-img-sm"
                                                                            style={{ marginRight: '10px' }}
                                                                        />
                                                                    </Link>
                                                                    <p className="text-secondary d-inline-block">
                                                                        {like.created.split('-').reverse().join('/')}
                                                                    </p>
                                                                </div>
                                                                <div className="notification-message">
                                                                    <p>
                                                                        <Link to={`/user/${like.profile.slug}`} style={{ color: "#000" }}>
                                                                            @{like.profile.user.username}
                                                                        </Link> curtiu seu post.
                                                                    </p>
                                                                </div>
                                                                <div className="notification-post-content">
                                                                    {like.post.content}
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </>
                                            }

                                            {!!visualizedComments.length &&
                                                <>
                                                    {visualizedComments.map(comment => {
                                                        return (
                                                            <li className="notification-row" key={comment.author.id}>
                                                                <div className="d-flex align-items-center">
                                                                    <i class="fas fa-comment notification-comment" />
                                                                    <Link to={`/user/${comment.author.slug}`}>
                                                                        <img src={`${SERVER_URL}${comment.author.photo}`}
                                                                            className="profile-img-sm"
                                                                            style={{ marginRight: '10px' }}
                                                                        />
                                                                    </Link>
                                                                    <p className="text-secondary d-inline-block">
                                                                        {comment.created.split('-').reverse().join('/')}
                                                                    </p>
                                                                </div>
                                                                <div className="notification-message">
                                                                    <p>
                                                                        <Link to={`/user/${comment.author.slug}`} style={{ color: "#000" }}>
                                                                            @{comment.author.user.username}
                                                                        </Link> comentou seu post.
                                                                    </p>
                                                                </div>
                                                                <div className="notification-comment-container">
                                                                    <div className="notification-comment-content">
                                                                        {comment.content}
                                                                    </div>
                                                                    <Link to={`/post/${comment.post.id}`}>
                                                                        <button className="btn btn-primary">
                                                                            Ver Post
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </>
                                            }
                                        </>
                                    }

                                </div> :
                                <div className="no-notifications-container">
                                    <h3>Você não tem nenhuma notificação</h3>
                                </div>
                            }


                        </div> :
                        <div className="notifications-loader-container">
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}