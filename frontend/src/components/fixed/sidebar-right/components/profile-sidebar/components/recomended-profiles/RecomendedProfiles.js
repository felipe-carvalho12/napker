import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../../../config/settings'
import ProfileListItem from '../../../../../../ProfileListItem'

import InfoModal from './components/InfoModal'
import InfoIcon from '../../../InfoIcon'


export default function RecomendedProfiles(props) {
    const [recomendedProfiles, setRecomendedProfiles] = useState(null)
    const myProfile = props.myProfile
    const username = props.username

    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false)

    useEffect(() => {
        if (username) {
            fetch(`${SERVER_URL}/profile-api/profile-list/${username}`)
                .then(response => response.json())
                .then(data => setRecomendedProfiles(data))
        }
    }, [props])

    return (
        <>
            <InfoModal isOpen={infoModalIsOpen} hideModal={() => setInfoModalIsOpen(false)} username={username} />
            <div className="d-flex flex-column justify-content-start align-items-start" style={{ marginTop: 'var(--header-heigth)', padding: '10px' }}>
                <InfoIcon className="align-self-end" onClick={() => setInfoModalIsOpen(true)} />
                <div style={{ width: '100%' }}>
                    <h6 className="ml-10px">Você pode gostar</h6>
                </div>
                {recomendedProfiles !== null ?
                    <>
                        {recomendedProfiles.map(profile => {
                            return (
                                <ProfileListItem profile={profile} myProfile={myProfile} imgSize="sm" bioLength={90} breakText={0} bool={false} />
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