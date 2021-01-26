import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../config/settings'
import { MyProfileContext } from '../../../../context/app/AppContext'
import Header from '../../../../components/fixed/Header'
import ProfileListItem from '../../../../components/ProfileListItem'
import BottomMenu from '../../../../components/fixed/bottom-menu/BottomMenu'

export default function Friends() {
    const [myProfile,] = useContext(MyProfileContext)
    const [friends, setFriends] = useState(null)
    const { username } = useParams()

    const isMobile = visualViewport.width <= 980

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/friends-profiles/${username}`)
            .then(response => response.json())
            .then(data => setFriends(data))
    }, [])

    return (
        <div className="content-container">
            <Header
                page={`@${username} / amigos`}
                backArrow={true}
                className="b-theme-base-color box-med blur-20px"
                style={{ position: "sticky", top: "1vw", padding: "var(--sz-2)", zIndex: "1000" }}
            />
            <div className={`sidebar-content ${isMobile ? 'pb-mobile' : ''}`}>
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
                                    {myProfile.user.username !== username ? `@${username} ainda não possui amigos` : 'Você ainda não possui amigos'}
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
        </div>
    )
}