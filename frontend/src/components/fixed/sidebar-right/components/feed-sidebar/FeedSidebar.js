import React, { useState } from 'react'
import SidebarSlider from '../SidebarSlider'

import FeedAlgorithm from './components/FeedAlgorithm'


export default function FeedSidebar() {
    const [pageIndex, setPageIndex] = useState(0)

    const pages = [<FeedAlgorithm />, '1', '2']

    return (
        <>
            {pages[pageIndex]}
            <SidebarSlider handlePageChange={e => setPageIndex(e.target.id)} />
        </>
    )
}