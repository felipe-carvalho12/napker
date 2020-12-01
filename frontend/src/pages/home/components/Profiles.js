import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'
import ProfileListItem from '../../../components/ProfileListItem'

export default function Profiles() {
    const [myProfile, setMyProfile] = useState(null)
    const [profiles, setProfiles] = useState(null)
    const [filteredProfiles, setFilteredProfiles] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
        fetch(`${SERVER_URL}/profile-api/profile-list`)
            .then(response => response.json())
            .then(data => {
                setFilteredProfiles(null)
                setProfiles(data)
            })
    }, [])

    useEffect(() => {
        if (search === '') {
            setFilteredProfiles(null)
            return
        }
        fetch(`${SERVER_URL}/profile-api/users/${search}`)
            .then(response => response.json())
            .then(data => {
                setFilteredProfiles(data)
            })
    }, [search])

    const sendFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/send-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    const cancelFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/cancel-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    const handleRelationshipUpdate = e => {
        e.preventDefault()
        e.stopPropagation()
        const btn = e.target
        if (btn.innerHTML === 'Solicitar') {
            sendFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitado'
            btn.className = 'btn btn-primary'
        } else {
            cancelFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitar'
            btn.className = 'btn btn-secondary'
        }
    }

    return (
        <>
            <div className="profiles-filter-container">
                <input
                    type="text"
                    className="profiles-filter-input"
                    placeholder="Pesquisar"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="list-group">
                {myProfile && (profiles || filteredProfiles) ?
                    <div className="profile-list-container">
                        {filteredProfiles ? filteredProfiles.map(profile => {
                            return (
                                <ProfileListItem profile={profile} myProfile={myProfile} />
                            )
                        }
                        ) : profiles && profiles.map(profile => {
                            return (
                                <ProfileListItem profile={profile} myProfile={myProfile}>
                                    <button className="btn btn-secondary" data-pk={profile.id} onClick={handleRelationshipUpdate}>
                                        Solicitar
                                    </button>
                                </ProfileListItem>
                            )
                        })
                        }
                    </div> :
                    <div className="profiles-loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}