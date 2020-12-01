import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../../config/settings'
import Header from '../../../../../components/fixed/header'
import ProfileListItem from '../../../../../components/ProfileListItem'

export default function InterestProfiles() {
    const [myProfile, setMyProfile] = useState(null)
    const [profiles, setProfiles] = useState(null)

    const { interest } = useParams()

    document.title = `${interest[0].toUpperCase() + interest.slice(1)} / Napker`

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
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
                    {myProfile !== null && profiles !== null ?
                        profiles.map(profile => {
                            return (
                                <ProfileListItem
                                    profile={profile}
                                    myProfile={myProfile}
                                    style={{ borderLeft: 'none', borderTop: 'none', borderRight: 'none' }}
                                />
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