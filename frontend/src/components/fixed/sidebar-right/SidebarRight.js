import React, { useState } from 'react'

import FeedAlgorithm from './components/FeedAlgorithm'


export default function SidebarRight() {
    const [page, setPage] = useState('FeedAlgorithm')

    const pages = {
        'FeedAlgorithm': <FeedAlgorithm />
    }

    return (
        <div className="sidebar p-0 b-left" style={{ right: '0' }}>
            {pages[page]}
            <div className="d-flex w-100 justify-content-center position-absolute pb-3" style={{ bottom: '0' }}>
                <div className="w-25 p-1 m-2" style={{ background: 'var(--primary-color)', opacity: '1' }} />
                <div className="w-25 p-1 m-2" style={{ background: 'var(--primary-color)', opacity: '.5' }} />
                <div className="w-25 p-1 m-2" style={{ background: 'var(--primary-color)', opacity: '.5' }} />
            </div>
        </div>
    )
}