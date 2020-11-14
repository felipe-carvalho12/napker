import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../../components/main/header'
import { SERVER_URL } from '../../settings'

export default function Friends() {
    const [friends, setFriends] = useState(null)
    const [profile, setProfile] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/user/${slug}`)
            .then(response => response.json())
            .then(data => setProfile(data))
    }, [])

    useEffect(() => {
        if (profile) {
            fetch(`${SERVER_URL}/profile-api/get-friends-profiles/${profile.slug}`)
                .then(response => response.json())
                .then(data => setFriends(data))
        }
    }, [profile])

    return (
        <>
            <Header page={profile ? `${profile.first_name} ${profile.last_name} / Amigos` : 'Perfil / Amigos'}
                backArrow={true}
            />
            <div className="content">
                <div className="list-group profile-friends-container">
                    {friends !== null ?
                        <>
                            {friends.length ? friends.map(friend => {
                                return (
                                    <Link to={`/user/${friend.slug}`} style={{ color: '#000', textDecoration: 'none' }}>
                                        <li className="list-group-item profile-row filtered-profile profile-friend-list-item" key={friend.id}>
                                            <div className="d-flex justify-content-between">
                                                <div className="profile-col">
                                                    <img src={`${SERVER_URL}${friend.photo}`}
                                                        className="profile-img-med"
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <div className="main-profile-data">
                                                        <strong>{friend.first_name} {friend.last_name}</strong>
                                                        <p className="text-secondary">@{friend.user.username}</p>
                                                    </div>
                                                </div>
                                                <div className="profile-col">
                                                    {friend.bio}
                                                </div>
                                                <div className="profile-col">

                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                )
                            }) :
                                <h3 style={{ marginTop: '30px' }}>
                                    {profile ? `${profile.first_name} ainda não possui amigos` : 'Você ainda não possui amigos'}
                                </h3>
                            }
                        </>
                        :
                        <div className="profiles-loader-container">
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}