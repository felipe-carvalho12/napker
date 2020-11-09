import React, { useState } from 'react'

import { SERVER_URL } from '../../settings'

export default function BlockUser() {
    const [profiles, setProfiles] = useState(null)
    const [selectedProfile, setSelectedProfile] = useState(null)

    const fetchFilteredProfiles = e => {
        if (e.target.value === '') {
            setProfiles(null)
            return
        } else {
            fetch(`${SERVER_URL}/profile-api/users/${e.target.value}`)
                .then(response => response.json())
                .then(data => setProfiles(data.slice(0, 4)))
        }
    }

    const handleProfileSelection = id => {
        document.querySelectorAll('.block-user-profile-list > .block-user-profile-item-active').forEach(el => {
            el.classList.remove('block-user-profile-item-active')
        })
        document.getElementById(id).classList.add('block-user-profile-item-active')
    }

    return (
        <div className="settings-description-container">
            <div className="search-user-container">
                <input
                    className="search-user-input"
                    type="text"
                    placeholder="Pesquisar usuário"
                    autoFocus
                    onChange={fetchFilteredProfiles}
                />
            </div>
            <div className="block-user-profile-list">
                {profiles &&
                    profiles.map(profile => {
                        return (
                            <li
                                className="list-group-item profile-row filtered-profile"
                                id={profile.id}
                                key={profile.id}
                                onClick={() => {
                                    setSelectedProfile(profile); handleProfileSelection(profile.id)
                                }
                                }
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
                                    <div className="profile-col">

                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </div>
            <div className="block-user-confirmation-container">
                {selectedProfile ?
                    <div>
                        <h4>Bloquear @{selectedProfile.user.username} ?</h4>
                        <button className="btn btn-danger">Bloquear</button>
                    </div>
                    :
                    <h3>Selecione o usuário que deseja bloquear</h3>
                }
            </div>
        </div>
    )
}