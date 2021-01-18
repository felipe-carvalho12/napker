import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import HomeSidebar from './components/home-sidebar/HomeSidebar'
import ProfileSidebar from './components/profile-sidebar/ProfileSidebar'


export default function SidebarRight(props) {
    const [page, setPage] = useState(null)

    const { slug } = useParams()

    useEffect(() => {
        setPage(props.page)
    }, [props])

    const pages = {
        'home': <HomeSidebar />,
        'profile': <ProfileSidebar parentProps={[props, slug]} />, // passing parent props to rerender the profile sidebar on props change... otherwise it wouldn't update
    }

    return (
        <div className="rs-container">
            <div className="sidebar right-s" style={{ justifyContent: 'start' }}>
                {pages[page]}
            </div>
        </div>
    )
}