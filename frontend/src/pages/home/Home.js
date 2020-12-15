import React, { useContext, useEffect, useState } from 'react'

import { FeedSettingsContext } from '../../context/home/HomeContext'
import Header from '../../components/fixed/Header'
import FeedModal from './components/modals/FeedModal'
import Posts from './components/posts_/Posts'
import Profiles from './components/profiles/Profiles'
import Explore from './components/explore/Explore'
import News from './components/news/News'
import PostIcon from '../../components/fixed/bottom-menu/components/PostIcon'
import BottomMenu from '../../components/fixed/bottom-menu/BottomMenu'
import HomePageMenu from './components/HomePageMenu'

export default function Home(props) {
    const [feedModalIsOpen, setFeedModalIsOpen] = useContext(FeedSettingsContext)

    const [page, setPage] = useState('Feed')

    const pages = {
        'Feed': <Posts />,
        'Profiles': <Profiles />,
        'Explore': <Explore />,
        'News': <News />,
        'Trending': '',
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
                <FeedModal isOpen={feedModalIsOpen} hideModal={() => setFeedModalIsOpen(false)} />
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
