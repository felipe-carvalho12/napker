import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../../../config/settings'
import { MyProfileContext } from '../../../../../../context/app/AppContext'
import Header from '../../../../../../components/fixed/Header'
import ProfileListItem from '../../../../../../components/ProfileListItem'

export default function InterestProfiles() {
    const [myProfile,] = useContext(MyProfileContext)
    const [profiles, setProfiles] = useState(null)

    const { interest } = useParams()

    document.title = `${interest[0].toUpperCase() + interest.slice(1)} / Napker`

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/interest-profile-list/${interest}`)
            .then(response => response.json())
            .then(data => setProfiles(data))
    }, [])

    return (
        <div className="content-container p-vw-r">
            <Header
                page={`Interesse / ${interest[0].toUpperCase() + interest.slice(1)}`}
                backArrow={true}
            />
            <div className="content">
                <div className="w-100 b-bottom" style={{ background: 'var(--theme-base-color)', padding: '15px' }}>
                    <h3>Perfis interessados em "{interest}"</h3>
                </div>
                <div className="w-100 list-group">
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
                        <div className="loader-container">
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}