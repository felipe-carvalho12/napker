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
            <div className="home-menu-btn-container b-bottom home-menu-btn-container-active b-right feed">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={e => setPage('Feed')}
                    onMouseEnter={e => handleMouseIn(e, feedPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="material-icons-sharp" style="font-size: 21px; vertical-align: text-bottom;">home</i>')}
                >
                    <i className="material-icons-sharp" style={{ fontSize: "21px", verticalAlign: "text-bottom"}}>home</i>
                </button>
            </div>
            <div className="home-menu-btn-container b-bottom b-right profiles">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={e => setPage('Profiles')}
                    onMouseEnter={e => handleMouseIn(e, profilesPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="material-icons-sharp" style="font-size: 21px; vertical-align: text-bottom;">person_search</i>')}
                >
                    <i className="material-icons-sharp" style={{ fontSize: "21px", verticalAlign: "text-bottom"}}>person_search</i>
                </button>
            </div>
            <div className="home-menu-btn-container b-bottom b-right explore">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={e => setPage('Explore')}
                    onMouseEnter={e => handleMouseIn(e, explorePageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="material-icons-sharp" style="font-size: 21px; vertical-align: text-bottom;">search</i>')}
                >
                    <i className="material-icons-sharp" style={{ fontSize: "21px", verticalAlign: "text-bottom"}}>search</i>
                </button>
            </div>
            <div className="home-menu-btn-container b-bottom trending">
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ margin: '10px 0', borderRadius: '20px' }}
                    onClick={e => setPage('Trending')}
                    onMouseEnter={e => handleMouseIn(e, trendsPageTitle)}
                    onMouseOut={e => handleMouseOut(e, '<i class="material-icons-sharp" style="font-size: 21px; vertical-align: text-bottom;">trending_up</i>')}
                >
                    <i className="material-icons-sharp" style={{ fontSize: "21px", verticalAlign: "text-bottom"}}>trending_up</i>
                </button>
            </div>
        </div>
    )
}