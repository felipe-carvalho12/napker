import React, { useEffect, useState } from 'react'

import Posts from './home-components/posts'
import Profiles from './home-components/profiles'

export default function Home() {
    const [page, setPage] = useState('Perfis')
    const pages = {
        'Perfis': Profiles(),
        'Posts': Posts()
    }
    
    return (
        <>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary" style={{ marginBottom: '20px' }} onClick={() => setPage('Perfis')}>Perfis</button>
                <button type="button" className="btn btn-primary" style={{ marginBottom: '20px' }} onClick={() => setPage('Posts')}>Posts</button>
            </div>
            {pages[page]}
        </>
    )
}