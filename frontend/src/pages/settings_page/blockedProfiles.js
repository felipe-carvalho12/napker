import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../config/settings'
import ProfileListItem from '../../components/ProfileListItem'

export default function BlockUser() {
    const [blockedProfiles, setBlockedProfiles] = useState(null)
    const [myProfile, setMyProfile] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
        fetch(`${SERVER_URL}/profile-api/get-blocked-profiles`)
            .then(response => response.json())
            .then(data => setBlockedProfiles(data))
    }, [])

    return (
        <div className="settings-description-container">
            {blockedProfiles !== null && myProfile !== null ?
                <>
                    {!!blockedProfiles.length ?
                        <div className="blocked-profiles-list">
                            <div className="blocked-profiles-title">
                                <h4>
                                    Você possui {blockedProfiles.length} {blockedProfiles.length === 1 ? 'perfil bloqueado' : 'perfis bloqueados'}
                                </h4>
                            </div>
                            {blockedProfiles.map(profile => {
                                return (
                                    <ProfileListItem
                                        profile={profile}
                                        myProfile={myProfile}
                                        style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                                    />
                                )
                            })
                            }
                        </div>
                        :
                        <div className="no-blocked-profiles">
                            <h3>Você não possui perfis bloqueados</h3>
                        </div>
                    }
                </>
                :
                <div className="settings-loader-container">
                    <div className="loader" />
                </div>
            }
        </div>
    )
}