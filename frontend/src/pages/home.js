import React, { useState } from 'react'
import Posts from './home-components/posts'
import Profiles from './home-components/profiles'
import Header from '../components/header'

export default function Home() {
    const [page, setPage] = useState('Perfis')
    const pages = {
        'Perfis': <Profiles />,
        'Posts': <Posts />
    }

    return (
        <>
            <Header page="Home" />
            <div className="content">
                <button type="button" className="btn btn-primary" style={{ marginRight: '50px', borderRadius: '20px' }} onClick={() => setPage(page === 'Perfis' ? 'Posts' : 'Perfis')}>
                    {page === 'Perfis' ? 'Ver posts' : 'Ver perfis'}
                </button>
                {pages[page]}
            </div>
        </>
    )
}