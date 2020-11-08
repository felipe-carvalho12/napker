import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import { SERVER_URL } from '../settings'
import { csrftoken } from '../utils'

export default function Notifications(props) {
    const [invites, setInvites] = useState(null)
    const [postLikes, setPostLikes] = useState(null)
    const [comments, setComments] = useState(null)

    document.title = 'Notificações / Napker'

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvites(data))
        fetch(`${SERVER_URL}/post-api/unvisualized-post-likes`)
            .then(response => response.json())
            .then(data => setPostLikes(data))
        fetch(`${SERVER_URL}/post-api/unvisualized-post-comments`)
            .then(response => response.json())
            .then(data => setComments(data))
    }, [])

    useEffect(() => {
        if (postLikes && postLikes.length) {
            fetch(`${SERVER_URL}/post-api/visualize-likes`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.updateNotificationsNumber()
                })
        }
    }, [postLikes])

    useEffect(() => {
        if (comments && comments.length) {
            fetch(`${SERVER_URL}/post-api/visualize-comments`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.updateNotificationsNumber()
                })
        }
    }, [comments])

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
        console.log(document.getElementById(btn.dataset.senderid))
        document.getElementById(btn.dataset.senderid).remove()
    }

    return (
        <>
            <Header page="Notificações" />
            <div className="content">
                <>
                    {invites !== null && postLikes !== null && comments !== null ?
                        <div className="list-group">
                            {!!invites.length || !!postLikes.length || !!comments.length ?
                                <div id="notification-list">
                                    {!!invites.length &&
                                        <div className="notifications-section">
                                            <h4>Solicitações de amizade</h4>
                                            {invites.map(i => {
                                                return (
                                                    <li
                                                        className="list-group-item profile-row"
                                                        id={i.sender.id}
                                                        key={i.sender.id}
                                                        onClick={() => window.location.href = `/user/${i.sender.slug}`}
                                                    >
                                                        <div className="d-flex justify-content-between">
                                                            <div className="profile-col">
                                                                <img src={`${SERVER_URL}${i.sender.photo}`}
                                                                    className="profile-img-med"
                                                                    style={{ marginRight: '10px' }}
                                                                />
                                                                <div className="main-profile-data">
                                                                    <strong>{i.sender.first_name} {i.sender.last_name}</strong>
                                                                    <p className="text-secondary">@{i.sender.user.username}</p>
                                                                </div>
                                                            </div>
                                                            <div className="profile-col">
                                                                {i.sender.bio}
                                                            </div>
                                                            <div className="profile-col" style={{ justifyContent: 'space-between' }}>
                                                                <button className="btn btn-primary btn-reply-fr" data-senderid={i.sender.id} data-reply='accept' onClick={replyRequest}>Confirmar</button>
                                                                <button className="btn btn-grey btn-reply-fr" data-senderid={i.sender.id} data-reply='decline' onClick={replyRequest}>Excluir</button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    }

                                    <br />

                                    {!!postLikes.length &&
                                        <div className="notifications-section">
                                            <h4>Curtidas</h4>
                                            {postLikes.map(like => {
                                                return (
                                                    <li className="list-group-item profile-row" key={like.profile.id}>
                                                        <div className="d-flex justify-content-between">
                                                            <div className="profile-col">
                                                                <Link to={`/user/${like.profile.slug}`}>
                                                                    <img src={`${SERVER_URL}${like.profile.photo}`}
                                                                        className="profile-img-med"
                                                                        style={{ marginRight: '10px' }}
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="profile-col" style={{ fontSize: 'larger' }}>
                                                                <p>
                                                                    <Link to={`/user/${like.profile.slug}`} style={{ color: "#000" }}>
                                                                        @{like.profile.user.username}
                                                                    </Link> curtiu o seu post.
                                                                </p>
                                                            </div>
                                                            <div className="profile-col" style={{ justifyContent: 'center' }}>
                                                                <Link to={`/post/${like.post.id}`}>
                                                                    <button className="btn btn-primary">Ver post</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    }

                                    <br />

                                    {!!comments.length &&
                                        <div className="notifications-section">
                                            <h4>Comentários</h4>
                                            {comments.map(comment => {
                                                return (
                                                    <li className="list-group-item profile-row" key={comment.author.id}>
                                                        <div className="d-flex justify-content-between">
                                                            <div className="profile-col">
                                                                <Link to={`/user/${comment.author.slug}`}>
                                                                    <img src={`${SERVER_URL}${comment.author.photo}`}
                                                                        className="profile-img-med"
                                                                        style={{ marginRight: '10px' }}
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="profile-col" style={{ fontSize: 'larger' }}>
                                                                <p>
                                                                    <Link to={`/user/${comment.author.slug}`} style={{ color: "#000" }}>
                                                                        @{comment.author.user.username}
                                                                    </Link> comentou seu post.
                                                </p>
                                                            </div>
                                                            <div className="profile-col" style={{ justifyContent: 'center' }}>
                                                                <Link to={`/post/${comment.post.id}`}>
                                                                    <button className="btn btn-primary">Ver post</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </div>
                                    }
                                </div> :
                                <h3 style={{ marginTop: '100px' }}>Você não tem nenhuma notificação</h3>
                            }
                        </div> :
                        <div className="posts-loader-container">
                            <div className="loader" />
                        </div>
                    }
                </>
            </div>
        </>
    )
}