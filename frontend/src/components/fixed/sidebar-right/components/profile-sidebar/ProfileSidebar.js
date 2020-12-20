import React, { useState } from 'react'
import SidebarSlider from '../SidebarSlider'

import RecomendedProfiles from './components/RecomendedProfiles'


export default function ProfileSidebar() {
    const [pageIndex, setPageIndex] = useState(0)

    const pages = [<RecomendedProfiles />, '1', '2']

    return (
        <>
            {pages[pageIndex]}
            <SidebarSlider handlePageChange={e => setPageIndex(e.target.id)} />
        </>
    )
}