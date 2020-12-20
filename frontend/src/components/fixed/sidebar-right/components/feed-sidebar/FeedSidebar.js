import React, { useState } from 'react'
import SidebarSlider from '../SidebarSlider'

import FeedAlgorithm from './components/feed-algorithm/FeedAlgorithm'
import GlobalChat from './components/GlobalChat'


export default function FeedSidebar() {
    const [pageIndex, setPageIndex] = useState(0)

    const pages = [<FeedAlgorithm />, <GlobalChat />, '2']

    return (
        <>
            {pages[pageIndex]}
            <SidebarSlider handlePageChange={e => setPageIndex(e.target.id)} />
        </>
    )
}