import React, { useEffect, useState } from 'react'

import FeedSidebar from './components/feed-sidebar/FeedSidebar'
import ProfileSidebar from './components/profile-sidebar/ProfileSidebar'


export default function SidebarRight(props) {
    const [page, setPage] = useState('home')

    useEffect(() => {
        setPage(props.match.params.path)
    }, [props.match.params.path])

    const pages = {
        'home': <FeedSidebar />,
        'perfil': <ProfileSidebar />,
        'user': <ProfileSidebar />,
    }

    return (
        <div className="sidebar p-0 b-left" style={{ right: '0' }}>
            {pages[page]}
        </div>
    )
}