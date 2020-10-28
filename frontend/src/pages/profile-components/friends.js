import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../../components/header'
import { SERVER_URL } from '../../settings'

export default function Friends() {
    const [friends, setFriends] = useState([])
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
                <div className="lidt-group">
                    {friends && friends.map(friend => {
                        return (
                            <Link to={`/user/${friend.slug}`} style={{ color: '#000', textDecoration: 'none' }}>
                                <li className="list-group-item profile-row filtered-profile" key={friend.id}>
                                    <div className="d-flex justify-content-between">
                                        <div className="profile-col">
                                            <img src={`${SERVER_URL}${friend.photo}`} />
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
                    })}
                </div>
            </div>
        </>
    )
}