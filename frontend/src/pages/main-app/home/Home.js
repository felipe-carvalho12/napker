import React, { useEffect, useState } from 'react'

import Header from '../../../components/fixed/Header'
import MobileAlgorithmSettingsIcon from './components/MobileAlgorithmSettingsIcon'
import Posts from './components/posts_/Posts'
import Profiles from './components/profiles/Profiles'
import Explore from './components/explore/Explore'
import Trending from './components/trending/Trending'
import PostIcon from '../../../components/fixed/bottom-menu/components/PostIcon'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'
import HomePageMenu from './components/HomePageMenu'


export default function Home() {
    const [page, setPage] = useState('Feed')
    const [algorithmSettingsIsOpen, setAlgorithmSettingsIsOpen] = useState(false)
    const isMobile = visualViewport.width <= 980

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
        <div className="content-container">
            {isMobile ?
                <div className="fixed w-100 b-theme-base-color blur-20px b-b" style={{ zIndex: "1000" }}>
                    <Header page="Home">
                        <MobileAlgorithmSettingsIcon useIsOpen={[algorithmSettingsIsOpen, setAlgorithmSettingsIsOpen]} />
                    </Header>
                    <HomePageMenu setPage={setPage} />
                </div>
                :
                <>
                    <div className="b-theme-base-color box-med blur-20px" style={{ position: "sticky", top: "1vw", padding: "10px 20px 0", zIndex: "1000" }}>
                        <HomePageMenu
                            setPage={setPage}
                            feedPageTitle='Feed'
                            profilesPageTitle='Encontrar perfis'
                            explorePageTitle='Descobrir'
                            newsPageTitle='Notícias'
                            trendsPageTitle='Tendências'
                        />
                    </div>
                </>
            }
            <div className="sidebar-content p-vw-x">
                <div className="w-100 h-100 home-page">
                    {pages[page]}
                </div>
            </div>
            <BottomMenu>
                {!algorithmSettingsIsOpen &&
                    <PostIcon />
                }
            </BottomMenu>
        </div>
    )
}
