import React from 'react'


export default function HomePageMenu(props) {
    const setPage = props.setPage

    const feedPageTitle = props.feedPageTitle
    const profilesPageTitle = props.profilesPageTitle
    const explorePageTitle = props.explorePageTitle
    const newsPageTitle = props.newsPageTitle
    const trendsPageTitle = props.trendsPageTitle

    return (
        <div className="home-page-menu">
            <div className="feed-view-more-icon-container">
                <div className="feed-view-more-icon">
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
                    <i class="fas fa-home mr-1" />
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
                    <i class="fas fa-user-friends mr-1" />
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
                    <i class="fas fa-search mr-1" />
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
                    <i class="fas fa-newspaper mr-1" />
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
                    <i class="fas fa-chart-line mr-1" />
                    {trendsPageTitle}
                </button>
            </div>
        </div>
    )
}