import React, { useEffect, useState } from 'react'

import HomeSidebar from './components/home-sidebar/HomeSidebar'
import ProfileSidebar from './components/profile-sidebar/ProfileSidebar'


export default function SidebarRight(props) {
    const [page, setPage] = useState(null)

    useEffect(() => {
        setPage(props.match.params.path)
    }, [props])

    const pages = {
        'home': <HomeSidebar />,
        'perfil': <ProfileSidebar parentsProps={props} />, // doing it to rerender the profile sidebar on props change... otherwise it wouldn't update
        'user': <ProfileSidebar parentsProps={props} />,
    }

    return (
        <div className="sidebar p-0 b-left" style={{ right: '0' }}>
            {pages[page]}
        </div>
    )
}