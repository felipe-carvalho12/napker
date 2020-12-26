import React, { useEffect, useState } from 'react'

import Header from '../../../components/fixed/Header'
import Posts from './components/posts_/Posts'
import Profiles from './components/profiles/Profiles'
import Explore from './components/explore/Explore'
import Trending from './components/trending/Trending'
import PostIcon from '../../../components/fixed/bottom-menu/components/PostIcon'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'
import HomePageMenu from './components/HomePageMenu'

export default function Home(props) {
    const [page, setPage] = useState('Feed')

    const pages = {
        'Feed': <Posts />,
        'Profiles': <Profiles />,
        'Explore': <Explore />,
        'Trending': <Trending />,
    }

    document.title = 'Home / Napker'

    useEffect(() => {
        const elements = document.querySelectorAll('.' + page.toLowerCase())
        document.querySelectorAll('.home-menu-btn-container-active').forEach(el => el.classList.remove('home-menu-btn-container-active'))
        elements.forEach(el => el.classList.add('home-menu-btn-container-active'))
    }, [page])

    return (
        <>
            <Header page="Home" />
            <div className="content">
                <div className="desktop-home-menu">
                    <HomePageMenu
                        setPage={setPage}
                        feedPageTitle='Feed'
                        profilesPageTitle='Encontrar perfis'
                        explorePageTitle='Descobrir'
                        newsPageTitle='Notícias'
                        trendsPageTitle='Tendências'
                    />
                </div>
                <div className="mobile-home-menu">
                    <HomePageMenu setPage={setPage} />
                </div>
                {pages[page]}
            </div>
            <BottomMenu>
                <PostIcon />
            </BottomMenu>
        </>
    )
}
