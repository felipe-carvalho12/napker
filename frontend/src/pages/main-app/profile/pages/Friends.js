import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../config/settings'
import Header from '../../../../components/fixed/Header'
import ProfileListItem from '../../../../components/ProfileListItem'
import BottomMenu from '../../../../components/fixed/bottom-menu/BottomMenu'

export default function Friends() {
    const [friends, setFriends] = useState(null)
    const [profile, setProfile] = useState(null)
    const [myProfile, setMyProfile] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/user/${slug}`)
            .then(response => response.json())
            .then(data => setProfile(data))
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
    }, [])

    useEffect(() => {
        if (profile) {
            fetch(`${SERVER_URL}/profile-api/get-friends-profiles/${profile.slug}`)
                .then(response => response.json())
                .then(data => setFriends(data))
        }
    }, [profile])

    return (
        <>
            <Header page={profile !== null ? `${profile.first_name} ${profile.last_name} / Amigos` : 'Perfil / Amigos'}
                backArrow={true}
            />
            <div className="sidebar-content">
                <div className="list-group profile-friends-container">
                    {friends !== null && myProfile !== null ?
                        <>
                            {friends.length ? friends.map((friend, index) => {
                                return (
                                    <ProfileListItem
                                        profile={friend}
                                        myProfile={myProfile}
                                        style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderTopLeftRadius: !index && '0', borderTopRightRadius: !index && '0' }}
                                    />
                                )
                            }) :
                                <h3 style={{ marginTop: '30px' }}>
                                    {profile ? `${profile.first_name} ainda não possui amigos` : 'Você ainda não possui amigos'}
                                </h3>
                            }
                        </>
                        :
                        <div className="loader-container">
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
            <BottomMenu />
        </>
    )
}