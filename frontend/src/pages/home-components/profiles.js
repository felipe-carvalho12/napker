import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

export default function Profiles() {
    const [profiles, setProfiles] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        let url
        if (search === '') {
            url = `${SERVER_URL}/profile-api/profile-list`
        } else {
            url = `${SERVER_URL}/profile-api/users/${search}`
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProfiles(data)
            })
            .catch(e => console.log(e))
    }, [search])

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
            <div className="form-row d-inline-block">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Pesquisar" style={{ width: '400px' }} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="list-group">
                {profiles ? profiles.map(profile => {
                    return (
                        <li className="list-group-item profile-row" key={profile.id}>
                            <div className="d-flex justify-content-between">
                                <div className="profile-col">
                                    <Link to={`/user/${profile.slug}`}>
                                        <img src={`${SERVER_URL}${profile.photo}`} />
                                    </Link>
                                    <div className="main-profile-data">
                                        <Link to={`/user/${profile.slug}`} style={{ color: '#000' }}>
                                            <strong>{profile.first_name} {profile.last_name}</strong>
                                        </Link>
                                        <p className="text-secondary">@{profile.user.username}</p>
                                    </div>
                                </div>
                                <div className="profile-col">
                                    {profile.bio}
                                </div>
                                <div className="profile-col">
                                    <button className="btn btn-secondary" data-pk={profile.user.id} onClick={handleRelationshipUpdate}>
                                        Solicitar
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                }) : <></>}
            </div>
        </>
    )
}