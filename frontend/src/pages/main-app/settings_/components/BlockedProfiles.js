import React, { useContext, useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../config/settings'
import { MyProfileContext } from '../../../../context/app/AppContext'
import SettingsContent from './components/SettingsContent'
import ProfileListItem from '../../../../components/ProfileListItem'

export default function BlockedProfiles() {
    const [blockedProfiles, setBlockedProfiles] = useState(null)
    const [myProfile, ] = useContext(MyProfileContext)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/blocked-profiles`)
            .then(response => response.json())
            .then(data => setBlockedProfiles(data))
    }, [])

    return (
        <SettingsContent title="Perfis bloqueados" padding={10}>
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
                        <div className="mt-30px no-blocked-profiles">
                            <h3 className="c-secondary-grey fw-200 fs-27">Você não possui perfis bloqueados</h3>
                        </div>
                    }
                </>
                :
                <div className="loader-container">
                    <div className="loader" />
                </div>
            }
        </SettingsContent>
    )
}