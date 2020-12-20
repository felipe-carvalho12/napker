import React, { useState } from 'react'

import FeedSidebar from './components/feed-sidebar/FeedSidebar'


export default function SidebarRight() {
    const [page, setPage] = useState('home')

    const pages = {
        'home': <FeedSidebar />
    }

    return (
        <div className="sidebar p-0 b-left" style={{ right: '0' }}>
            {pages[page]}
        </div>
    )
}