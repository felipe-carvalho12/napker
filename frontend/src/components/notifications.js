import React, { useEffect, useState } from 'react'

export default function Notifications() {
    const [invites, setInvites] = useState([{ sender: { id: '', user: '' } }])
    useEffect(() => {
        fetch('http://localhost:8000/profile-api/myinvites')
            .then(response => response.json())
            .then(data => setInvites(data))
    }, [])

    const replyRequest = e => {
        const btn = e.target
        const requestBody = {
            'senderid': btn.dataset.senderid,
            'reply': btn.dataset.reply
        }
        console.log(requestBody)
        fetch('http://localhost:8000/profile-api/reply-friend-request', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrftoken
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => console.log(data))
        document.getElementById('friend-request-list').removeChild(document.getElementById(btn.dataset.senderid))
    }

    return (
        <>
            <div className="list-group" id='friend-request-list'>
                {invites.map(i => {
                    return (
                        <li className="list-group-item profile-row" id={i.sender.id} key={i.sender.id}>
                            <div className="d-flex justify-content-between">
                                <div className="profile-col">
                                    <img src={`http://localhost:8000${i.sender.photo}`} />
                                    <div className="main-profile-data">
                                        <strong>{i.sender.first_name} {i.sender.last_name}</strong>
                                        <p className="text-secondary">@{i.sender.user.username}</p>
                                    </div>
                                </div>
                                <div className="profile-col">
                                    {i.sender.bio}
                                </div>
                                <div className="profile-col" style={{ justifyContent: 'space-between' }}>
                                    <button className="btn btn-primary" data-senderid={i.sender.id} data-reply='accept' onClick={replyRequest}>Confirmar</button>
                                    <button className="btn btn-grey" data-senderid={i.sender.id} data-reply='decline' onClick={replyRequest}>Excluir</button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </div>
        </>
    )
}