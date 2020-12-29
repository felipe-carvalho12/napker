import React, { useState, useEffect } from 'react'

import { SERVER_URL } from '../../../../../config/settings'
import RecomendedProfiles from './components/recomended-profiles/RecomendedProfiles'
import SidebarSlider from '../SidebarSlider'


export default function ProfileSidebar(props) {
    const [pages, setPages] = useState(null)
    const [pageIndex, setPageIndex] = useState(0)
    const [myProfile, setMyProfile] = useState(null)

    useEffect(() => {
        const urlArr = window.location.href.split('/')
        if (myProfile) {
            const profileSlug = urlArr[urlArr.length - 2] === 'user' ? urlArr[urlArr.length - 1] : urlArr[urlArr.length - 1] === 'perfil' ? myProfile.slug : false
            setPages([
                <RecomendedProfiles myProfile={myProfile} profileSlug={profileSlug} />,
                'Em breve...',
                'Em breve...'
            ])
        } else {
            fetch(`${SERVER_URL}/profile-api/myprofile`)
                .then(response => response.json())
                .then(data => {
                    setMyProfile(data)
                    const profileSlug = urlArr[urlArr.length - 2] === 'user' ? urlArr[urlArr.length - 1] : urlArr[urlArr.length - 1] === 'perfil' ? data.slug : false
                    setPages([
                        <RecomendedProfiles myProfile={data} profileSlug={profileSlug} />,
                        'Em breve...',
                        'Em breve...'
                    ])
                })
        }
    }, [props.parentProps])

    return (
        <>
            {myProfile !== null && pages !== null ?
                <>
                    {pages[pageIndex]}
                    <SidebarSlider handlePageChange={e => setPageIndex(e.target.id)} />
                </>
                :
                <div className="loader-container">
                    <div className="loader" />
                </div>
            }
        </>
    )
}