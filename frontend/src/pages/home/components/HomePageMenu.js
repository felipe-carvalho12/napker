import React, { useContext } from 'react'

import { FeedSettingsContext } from '../../../context/home/HomeContext'


export default function HomePageMenu(props) {
    const [feedModalIsOpen, setFeedModalIsOpen] = useContext(FeedSettingsContext)

    const setPage = props.setPage

    const feedPageTitle = props.feedPageTitle
    const profilesPageTitle = props.profilesPageTitle
    const explorePageTitle = props.explorePageTitle
    const newsPageTitle = props.newsPageTitle
    const trendsPageTitle = props.trendsPageTitle

    return (
        <div className="home-page-menu">
            <div className="feed-view-more-icon-container">
                <div className="feed-view-more-icon" onClick={() => setFeedModalIsOpen(true)}>
                    +
                </div>
            </div>
            <div className="home-menu-btn-container home-menu-btn-container-active feed">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={() => setPage('Feed')}
                >
                    <i class="fas fa-home ml-1 mr-1" />
                    {feedPageTitle}
                </button>
            </div>
            <div className="home-menu-btn-container profiles">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={() => setPage('Profiles')}
                >
                    <i class="fas fa-user-friends ml-1 mr-1" />
                    {profilesPageTitle}
                </button>
            </div>
            <div className="home-menu-btn-container explore">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={() => setPage('Explore')}
                >
                    <i class="fas fa-search ml-1 mr-1" />
                    {explorePageTitle}
                </button>
            </div>
            <div className="home-menu-btn-container news">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={() => setPage('News')}
                >
                    <i class="fas fa-newspaper ml-1 mr-1" />
                    {newsPageTitle}
                </button>
            </div>
            <div className="home-menu-btn-container trending">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={() => setPage('Trending')}
                >
                    <i class="fas fa-chart-line ml-1 mr-1" />
                    {trendsPageTitle}
                </button>
            </div>
        </div>
    )
}