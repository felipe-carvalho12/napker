import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/fixed/header'
import { SERVER_URL } from '../../settings'

export default function InterestProfiles() {
    const [profiles, setProfiles] = useState(null)
    const { interest } = useParams()

    document.title = `${interest[0].toUpperCase() + interest.slice(1)} / Napker`

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/interest-profile-list/${interest}`)
            .then(response => response.json())
            .then(data => setProfiles(data))
    }, [])

    return (
        <>
            <Header
                page={`Interesse / ${interest[0].toUpperCase() + interest.slice(1)}`}
                backArrow={true}
            />
            <div className="content">
                <div className="interests-title-container">
                    <h3>Perfis interessados em "{interest}"</h3>
                </div>
                <div className="list-group interest-profile-list">
                    {profiles !== null ? profiles.map(profile => {
                        return (
                            <li
                                className="list-group-item profile-row filtered-profile interest-profile-row"
                                key={profile.id}
                                onClick={() => window.location.href = `/user/${profile.slug}`}
                            >
                                <div className="d-flex justify-content-between">
                                    <div className="profile-col">
                                        <img src={`${SERVER_URL}${profile.photo}`}
                                            className="profile-img-med"
                                            style={{ marginRight: '10px' }}
                                        />
                                        <div className="main-profile-data">
                                            <strong>{profile.first_name} {profile.last_name}</strong>
                                            <p className="text-secondary">@{profile.user.username}</p>
                                        </div>
                                    </div>
                                    <div className="profile-col">
                                        {profile.bio}
                                    </div>
                                    <div className="profile-col"></div>
                                </div>
                            </li>
                        )
                    }) :
                        <div className="profiles-loader-container">
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}