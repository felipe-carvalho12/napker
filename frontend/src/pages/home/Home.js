import React, { useEffect, useState } from 'react'

import Header from '../../components/fixed/Header'
import Posts from './components/posts_/Posts'
import Profiles from './components/profiles/Profiles'
import PostIcon from '../../components/fixed/bottom-menu/components/PostIcon'
import BottomMenu from '../../components/fixed/bottom-menu/BottomMenu'

export default function Home(props) {
    const [page, setPage] = useState('Posts')
    const pages = {
        'Posts': <Posts />,
        'Profiles': <Profiles />,
        'Explore': '',
        'News': ''
    }

    document.title = 'Home / Napker'

    useEffect(() => {
        const el = document.getElementById(page.toLowerCase())
        document.querySelectorAll('.home-menu-btn-container-active').forEach(el => el.classList.remove('home-menu-btn-container-active'))
        el.classList.add('home-menu-btn-container-active')
    }, [page])

    return (
        <>
            <Header page="Home" />
            <div className="content">
                <div className="home-page-subheader">
                    <div className="home-menu-btn-container home-menu-btn-container-active" id="posts">
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ margin: '10px', borderRadius: '20px' }}
                            onClick={() => setPage('Posts')}
                        >
                            <i class="fas fa-home mr-1" />
                            Feed
                        </button>
                    </div>
                    <div className="home-menu-btn-container" id="profiles">
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ margin: '10px', borderRadius: '20px' }}
                            onClick={() => setPage('Profiles')}
                        >
                            <i class="fas fa-user-friends mr-1" />
                            Encontrar perfis
                        </button>
                    </div>
                    <div className="home-menu-btn-container" id="explore">
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ margin: '10px', borderRadius: '20px' }}
                            onClick={() => setPage('Explore')}
                        >
                            <i class="fas fa-search mr-1" />
                            Descobrir
                        </button>
                    </div>
                    <div className="home-menu-btn-container" id="news">
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ margin: '10px', borderRadius: '20px' }}
                            onClick={() => setPage('News')}
                        >
                            <i class="fas fa-newspaper mr-1" />
                            Notícias
                        </button>
                    </div>
                </div>
                {pages[page]}
            </div>
            <BottomMenu>
                <PostIcon />
            </BottomMenu>
        </>
    )
}
