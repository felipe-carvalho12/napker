import React, { useState } from 'react'
import SidebarSlider from '../SidebarSlider'

import FeedAlgorithm from './components/algorithm-settings/AlgorithmSettings'
import GlobalChat from './components/GlobalChat'


export default function FeedSidebar() {
    const [pageIndex, setPageIndex] = useState(0)

    const pages = [<FeedAlgorithm />, <GlobalChat />, 'Em breve...']

    return (
        <div className="d-flex flex-column justify-content-between align-items-center h-100" style={{ marginLeft: '10%' }}>
            {pages[pageIndex]}
            <SidebarSlider handlePageChange={e => setPageIndex(e.target.id)} />
        </div>
    )
}