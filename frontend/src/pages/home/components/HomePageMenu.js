import React from 'react'


export default function HomePageMenu(props) {
    const setPage = props.setPage

    const feedPageTitle = props.feedPageTitle
    const profilesPageTitle = props.profilesPageTitle
    const explorePageTitle = props.explorePageTitle
    const trendsPageTitle = props.trendsPageTitle;

    const isMobile = visualViewport.width <= 980

    function handleMouseIn(e, text) {
        if (!isMobile) {
            e.target.innerHTML = text
        }
    }

    function handleMouseOut(e, icon) {
        if (!isMobile) {
            e.target.innerHTML = icon
        }
    }

    return (
        <div className="home-page-menu">
            <div className="home-menu-btn-container home-menu-btn-container-active feed">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={e => setPage('Feed')}
                    onMouseEnter={e => handleMouseIn(e, feedPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="fas fa-home ml-1 mr-1" />')}
                >
                    <i class="fas fa-home ml-1 mr-1" />
                </button>
            </div>
            <div className="home-menu-btn-container profiles">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={e => setPage('Profiles')}
                    onMouseEnter={e => handleMouseIn(e, profilesPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="fas fa-user-friends ml-1 mr-1" />')}
                >
                    <i class="fas fa-user-friends ml-1 mr-1" />
                </button>
            </div>
            <div className="home-menu-btn-container explore">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={e => setPage('Explore')}
                    onMouseEnter={e => handleMouseIn(e, explorePageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="fas fa-search ml-1 mr-1" />')}
                >
                    <i class="fas fa-search ml-1 mr-1" />
                </button>
            </div>
            <div className="home-menu-btn-container trending">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={e => setPage('Trending')}
                    onMouseEnter={e => handleMouseIn(e, trendsPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="fas fa-chart-line ml-1 mr-1" />')}
                >
                    <i class="fas fa-chart-line ml-1 mr-1" />
                </button>
            </div>
        </div>
    )
}