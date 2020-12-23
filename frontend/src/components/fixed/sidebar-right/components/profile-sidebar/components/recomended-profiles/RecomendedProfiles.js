import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../../../config/settings'
import ProfileListItem from '../../../../../../ProfileListItem'

import InfoModal from './components/InfoModal'
import InfoIcon from '../../../InfoIcon'


export default function RecomendedProfiles(props) {
    const [recomendedProfiles, setRecomendedProfiles] = useState(null)
    const myProfile = props.myProfile
    const profileSlug = props.profileSlug

    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false)

    useEffect(() => {
        if (profileSlug) {
            fetch(`${SERVER_URL}/profile-api/profile-list/${profileSlug}`)
                .then(response => response.json())
                .then(data => setRecomendedProfiles(data))
        }
    }, [props])

    return (
        <>
            <InfoModal isOpen={infoModalIsOpen} hideModal={() => setInfoModalIsOpen(false)} profileSlug={profileSlug} />
            <div className="d-flex justify-content-center align-items-center m-0 b-bottom" style={{ height: 'var(--header-heigth)' }}>
                <h5>Você pode gostar</h5>
            </div>
            <InfoIcon onClick={() => setInfoModalIsOpen(true)} />
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