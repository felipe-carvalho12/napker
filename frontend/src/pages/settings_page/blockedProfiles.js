import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../settings'

export default function BlockUser() {
    const [blockedProfiles, setBlockedProfiles] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/get-blocked-profiles`)
            .then(response => response.json())
            .then(data => setBlockedProfiles(data))
    }, [])

    return (
        <div className="settings-description-container">
            {blockedProfiles !== null ?
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
                                    <Link to={`/user/${profile.slug}`} style={{ color: '#000', textDecoration: 'none' }}>
                                        <li className="list-group-item profile-row filtered-profile blocked-profile" key={profile.id}>
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
                                                <div className="profile-col">

                                                </div>
                                            </div>
                                        </li>
                                    </Link>
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