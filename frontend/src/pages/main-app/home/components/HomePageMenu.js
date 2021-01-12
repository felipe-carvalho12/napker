import React, { useEffect } from 'react'


export default function HomePageMenu(props) {
    const setPage = props.setPage

    const feedPageTitle = props.feedPageTitle
    const profilesPageTitle = props.profilesPageTitle
    const explorePageTitle = props.explorePageTitle
    const trendsPageTitle = props.trendsPageTitle;

    const isMobile = visualViewport.width <= 980

    const handleMouseIn = (e, text) => {
        if (!isMobile) {
            e.target.innerHTML = text
        }
    }

    const handleMouseOut = (e, icon) => {
        if (!isMobile) {
            e.target.innerHTML = icon
        }
    }

    const handleClick = (e, page) => {
        setPage(page)
    }

    return (
        <div className="home-page-menu">
            <div className="home-menu-btn-container home-menu-btn-container-active feed">
                <button
                    type="button"
                    className="btn btn-home"
                    onClick={e => handleClick(e, 'Feed')}
                    onMouseEnter={e => handleMouseIn(e, feedPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="material-icons-sharp" style="font-size: 21px; vertical-align: text-bottom; color: inherit;">home</i>')}
                >
                    <i className="material-icons-sharp" style={{ fontSize: "21px", verticalAlign: "text-bottom" }}>home</i>
                </button>
            </div>
            <div className="home-menu-btn-container profiles">
                <button
                    type="button"
                    className="btn btn-home"
                    onClick={e => handleClick(e, 'Profiles')}
                    onMouseEnter={e => handleMouseIn(e, profilesPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="material-icons-sharp" style="font-size: 21px; vertical-align: text-bottom; color: inherit;">person_search</i>')}
                >
                    <i className="material-icons-sharp" style={{ fontSize: "21px", verticalAlign: "text-bottom" }}>person_search</i>
                </button>
            </div>
            <div className="home-menu-btn-container explore">
                <button
                    type="button"
                    className="btn btn-home"
                    onClick={e => handleClick(e, 'Explore')}
                    onMouseEnter={e => handleMouseIn(e, explorePageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="material-icons-sharp" style="font-size: 21px; vertical-align: text-bottom; color: inherit;">search</i>')}
                >
                    <i className="material-icons-sharp" style={{ fontSize: "21px", verticalAlign: "text-bottom" }}>search</i>
                </button>
            </div>
            <div className="home-menu-btn-container trending">
                <button
                    type="button"
                    className="btn btn-home"
                    onClick={e => handleClick(e, 'Trending')}
                    onMouseEnter={e => handleMouseIn(e, trendsPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="material-icons-sharp" style="font-size: 21px; vertical-align: text-bottom; color: inherit;">trending_up</i>')}
                >
                    <i className="material-icons-sharp" style={{ fontSize: "21px", verticalAlign: "text-bottom" }}>trending_up</i>
                </button>
            </div>
        </div>
    )
}