import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header'
import { csrftoken, serverURL } from '../../utils'

export default function Profile() {
    const { slug } = useParams()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        fetch(`${serverURL}/profile-api/user/${slug}`)
            .then(response => response.json())
            .then(data => setProfile(data))
    }, [])

    const profilePhotoStyle = {
        borderRadius: '50%',
        display: 'inline-block',
        transform: 'scale(1.5)',
        marginBottom: '25px'
    }

    const sendFriendRequest = pk => {
        fetch(`${serverURL}/profile-api/send-friend-request`, {
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
        fetch(`${serverURL}/profile-api/cancel-friend-request`, {
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

    const handleRelationshipUpdate = e => {
        const btn = e.target
        if (btn.innerHTML === 'Solicitar') {
            sendFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitado'
            btn.className = 'btn btn-primary'
        } else {
            cancelFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitar'
            btn.className = 'btn btn-secondary'
        }
    }

    return (
        <>
            <Header page={profile ? `${profile.first_name} ${profile.last_name}` : 'Perfil'} backArrow={true} />
            {!profile ? <></> : <>
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center profile-data-container">
                        <div className="d-flex flex-column align-items-start">
                            <p style={{ padding: '15px' }}><img src={`${serverURL}${profile.photo}`} style={profilePhotoStyle} /></p>
                            <p style={{ marginBottom: 0 }}><strong>{profile.first_name} {profile.last_name}</strong></p>
                            <p className="text-secondary" style={{ marginTop: 0 }}>@{profile.user.username}</p>
                            <p>{profile.bio}</p>
                            <p className="text-secondary">
                                <i className="far fa-calendar-alt"></i> Entrou em {profile.created.split('-').reverse().join('/')}
                            </p>
                            <p><strong>{profile.friends.length}</strong> {profile.friends.length === 1 ? 'amigo' : 'amigos'}</p>
                        </div>
                        <div>
                            <button className="btn btn-secondary" data-pk={profile.user.id} onClick={handleRelationshipUpdate}>
                                Solicitar
                            </button>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}