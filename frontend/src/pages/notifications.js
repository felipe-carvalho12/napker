import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import { SERVER_URL } from '../settings'
import { csrftoken } from '../utils'

export default function Notifications(props) {
    const [invites, setInvites] = useState([])
    const [likes, setLikes] = useState([])
    let notificationsNumber = invites.length + likes.length

    document.title = 'Notificações / Napker'

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvites(data))
        fetch(`${SERVER_URL}/post-api/unvisualized-likes`)
            .then(response => response.json())
            .then(data => setLikes(data))
    }, [])

    useEffect(() => {
        if (likes.length) {
            fetch(`${SERVER_URL}/post-api/visualize-likes`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.updateNotificationsNumber()
                })
        }
    }, [likes])

    const replyRequest = e => {
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
        document.getElementById('friend-request-list').removeChild(document.getElementById(btn.dataset.senderid))
    }

    return (
        <>
            <Header page="Notificações" />
            <div className="content">
                <div className="list-group" id='friend-request-list'>
                    {!!invites.length &&
                        <>
                            <h4>Solicitações de amizade</h4>
                            {invites.map(i => {
                                return (
                                    <li className="list-group-item profile-row" id={i.sender.id} key={i.sender.id}>
                                        <div className="d-flex justify-content-between">
                                            <div className="profile-col">
                                                <Link to={`/user/${i.sender.slug}`}>
                                                    <img src={`${SERVER_URL}${i.sender.photo}`}
                                                        className="profile-img-med"
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                </Link>
                                                <div className="main-profile-data">
                                                    <Link to={`/user/${i.sender.slug}`} style={{ color: '#000' }}>
                                                        <strong>{i.sender.first_name} {i.sender.last_name}</strong>
                                                    </Link>
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
                        </>
                    }

                    <br />

                    {!!likes.length &&
                        <>
                            <h4>Curtidas</h4>
                            {likes.map(like => {
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
                        </>
                    }

                    <br />

                </div>
                {!notificationsNumber &&
                    <h3 style={{ marginTop: '100px' }}>Você não tem nenhuma notificação</h3>}
            </div>
        </>
    )
}