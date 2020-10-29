import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import { SERVER_URL } from '../settings'
import { csrftoken } from '../utils'

export default function Notifications(props) {
    const [invites, setInvites] = useState([])

    document.title = 'Notificações / Napker'

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myinvites`)
            .then(response => response.json())
            .then(data => setInvites(data))
    }, [])

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
                    {invites.length ? invites.map(i => {
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
                    }) : <h3 style={{ marginTop: '100px' }}>Você não tem nenhuma notificação</h3>}
                </div>
            </div>
        </>
    )
}