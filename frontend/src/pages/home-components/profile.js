import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header'
import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

export default function Profile() {
    const { slug } = useParams()
    const [profile, setProfile] = useState(null)
    const profilePhotoStyle = {
        borderRadius: '50%',
        display: 'inline-block',
        transform: 'scale(1.5)',
        marginBottom: '25px'
    }
    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/user/${slug}`)
            .then(response => response.json())
            .then(data => setProfile(data))
        fetch(`${SERVER_URL}/profile-api/relationship/${slug}`)
            .then(response => response.json())
            .then(data => {
                let btn = document.querySelector('#profile-page-relationship-btn')
                switch (data.relationship) {
                    case 'friends':
                        btn.innerHTML = 'Amigo'
                        btn.classList.add('btn-primary')
                        btn.classList.add('friend-btn')
                        break
                    case 'invite-sent':
                        btn.innerHTML = 'Solicitado'
                        btn.classList.add('btn-primary')
                        break
                    case 'invite-received':
                        btn.innerHTML = 'Aceitar'
                        btn.classList.add('btn-primary')
                        break
                    case 'none':
                        btn.innerHTML = 'Solicitar'
                        btn.classList.add('btn-secondary')
                }
                btn.classList.remove('d-none')
            })
    }, [])

    const sendFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/send-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    const cancelFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/cancel-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    const removeFromFriends = pk => {
        fetch(`${SERVER_URL}/profile-api/remove-from-friends`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    const acceptFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/reply-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'senderid': pk,
                'reply': 'accept'
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    const handleRelationshipUpdate = e => {
        const btn = e.target
        if (btn.innerHTML === 'Solicitar') {
            sendFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitado'
            btn.className = 'btn btn-primary'
        } else if (btn.innerHTML === 'Solicitado') {
            cancelFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitar'
            btn.className = 'btn btn-secondary'
        } else if (btn.innerHTML === 'Amigo') {
            if (window.confirm(`Remover @${profile.user.username} dos amigos?`)) {
                removeFromFriends(btn.dataset.pk)
                btn.innerHTML = 'Solicitar'
                btn.className = 'btn btn-secondary'
            }
        } else if (btn.innerHTML === 'Aceitar') {
            acceptFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Amigo'
            btn.className = 'btn btn-primary'
        }
    }

    return (
        <>
            <Header page={profile ? `${profile.first_name} ${profile.last_name}` : 'Perfil'} backArrow={true} />
            {!profile ? <></> : <>
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center profile-data-container">
                        <div className="d-flex flex-column align-items-start">
                            <p style={{ padding: '15px' }}><img src={`${SERVER_URL}${profile.photo}`} style={profilePhotoStyle} /></p>
                            <p style={{ marginBottom: 0 }}><strong>{profile.first_name} {profile.last_name}</strong></p>
                            <p className="text-secondary" style={{ marginTop: 0 }}>@{profile.user.username}</p>
                            <p>{profile.bio}</p>
                            <p className="text-secondary">
                                <i className="far fa-calendar-alt"></i> Entrou em {profile.created.split('-').reverse().join('/')}
                            </p>
                            <p><strong>{profile.friends.length}</strong> {profile.friends.length === 1 ? 'amigo' : 'amigos'}</p>
                        </div>
                        <div>
                            <button className="btn d-none"
                                id="profile-page-relationship-btn"
                                data-pk={profile.user.id}
                                onClick={handleRelationshipUpdate}
                            ></button>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}