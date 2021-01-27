import React, { useState, useEffect, useContext } from 'react'

import { MyProfileContext } from '../../../../../context/app/AppContext'
import RecomendedProfiles from './components/recomended-profiles/RecomendedProfiles'
import SidebarSlider from '../SidebarSlider'


export default function ProfileSidebar(props) {
    const [myProfile,] = useContext(MyProfileContext)
    const [pages, setPages] = useState(null)
    const [pageIndex, setPageIndex] = useState(0)

    useEffect(() => {
        const urlArr = window.location.href.split('/')
        if (myProfile) {
            const username = urlArr[urlArr.length - 2] === 'user' ? urlArr[urlArr.length - 1] : urlArr[urlArr.length - 1] === 'perfil' ? myProfile.user.username : false
            setPages([
                <RecomendedProfiles myProfile={myProfile} username={username} />,
                'Em breve...',
                'Em breve...'
            ])
        }
    }, [props.parentProps, myProfile])

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