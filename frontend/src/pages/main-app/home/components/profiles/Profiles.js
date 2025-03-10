import React, { useContext, useEffect, useState } from 'react'

import { SERVER_URL, DEBUG } from '../../../../../config/settings'
import { csrftoken } from '../../../../../config/utils'
import { MyProfileContext } from '../../../../../context/app/AppContext'
import ProfileListItem from '../../../../../components/ProfileListItem'
import ProfilesSearch from './components/ProfilesSearch'

export default function Profiles() {
    const [myProfile,] = useContext(MyProfileContext)
    const [profiles, setProfiles] = useState(null)
    const [filteredProfiles, setFilteredProfiles] = useState(null)
    const [scrollCount, setScrollCount] = useState(1)

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setScrollCount(scrollCount + 1)
        }
    }

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/my-profile-list/${scrollCount}`)
            .then(response => response.json())
            .then(data => {
                setFilteredProfiles(null)
                setProfiles(data)
            })
    }, [scrollCount])

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
            .then(data => DEBUG && console.log(data))
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
            .then(data => DEBUG && console.log(data))
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
            <ProfilesSearch setFilteredProfiles={setFilteredProfiles} />
            <div className="list-group">
                {myProfile && (profiles || filteredProfiles) ?
                    <div className="w-100">
                        {filteredProfiles ? filteredProfiles.map(profile => {
                            return (
                                <ProfileListItem profile={profile} myProfile={myProfile} />
                            )
                        }
                        ) : profiles && profiles.map(profile => {
                            return (
                                <ProfileListItem profile={profile} myProfile={myProfile}>
                                    <button
                                        className="btn btn-secondary align-self-start"
                                        data-pk={profile.id}
                                        onClick={handleRelationshipUpdate}
                                    >
                                        Solicitar
                                    </button>
                                </ProfileListItem>
                            )
                        })
                        }
                    </div>
                    :
                    <div className="loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}