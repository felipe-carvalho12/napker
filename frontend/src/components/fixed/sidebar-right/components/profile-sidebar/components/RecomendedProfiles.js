import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../../config/settings'
import ProfileListItem from '../../../../../../components/ProfileListItem'


export default function RecomendedProfiles(props) {
    const [recomendedProfiles, setRecomendedProfiles] = useState(null)
    const myProfile = props.myProfile

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/profile-list/${props.profileSlug}`)
            .then(response => response.json())
            .then(data => setRecomendedProfiles(data))
    }, [])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center b-bottom" style={{ height: 'var(--header-heigth)' }}>
                <h4>Você pode gostar</h4>
            </div>
            <div className="w-100" style={{ overflowY: 'hidden' }}>
                {recomendedProfiles !== null ?
                    <>
                        {recomendedProfiles.map(profile => {
                            return (
                                <ProfileListItem profile={profile} myProfile={myProfile} />
                            )
                        })}
                    </>
                    :
                    <div className="loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}