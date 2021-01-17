import React, { useState } from 'react'
import SidebarSlider from '../SidebarSlider'

import AlgorithmSettings from './components/algorithm-settings/AlgorithmSettings'


export default function FeedSidebar() {
    const [pageIndex, setPageIndex] = useState(0)

    const pages = [<AlgorithmSettings />, 'Em breve...', 'Em breve...']

    return (
        <div className="d-flex flex-column justify-content-between align-items-center" style={{ marginLeft: '10%' }}>
            {pages[pageIndex]}
            <SidebarSlider handlePageChange={e => setPageIndex(e.target.id)} />
        </div>
    )
}