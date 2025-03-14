import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { MyProfileContext } from '../../../context/app/AppContext'
import Header from '../../../components/fixed/Header'
import EditProfile from './components/edit-profile/EditProfile'
import Posts from './components/Posts'
import Interests from './components/interests/Interests'
import ProfileData from './components/ProfileData'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'


export default function MyProfile() {
    const [myProfile, updateMyProfile] = useContext(MyProfileContext)
    const [currentPageIsPosts, setCurrentPageIsPosts] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const isMobile = visualViewport.width <= 980

    document.title = 'Perfil / Napker'

    const switchPage = e => {
        document.querySelectorAll('.profile-page-menu-item-active').forEach(el => {
            el.classList.remove('profile-page-menu-item-active')
        })
        e.target.classList.add('profile-page-menu-item-active')
        if (e.target.id === 'profile-posts-page-menu-item') {
            setCurrentPageIsPosts(true)
        } else if (e.target.id === 'profile-interests-page-menu-item') {
            setCurrentPageIsPosts(false)
        }
    }

    return (
        <div className="content-container p-vw-r">
            <div
                className={!isMobile ? "b-theme-base-color box-med blur-20px" : "fixed w-100 b-theme-base-color blur-20px b-b"}
                style={!isMobile ? { position: "sticky", top: "1vw", padding: "0", zIndex: "1000" } : { zIndex: "1000" }}
            >
                <Header page="Perfil" />
                {myProfile &&
                    <div className="profile-page-menu" style={{ paddingTop: `${isMobile && "50px"}` }}>
                        <div
                            className="profile-page-menu-item profile-page-menu-item-active b-bottom-left-radius-hover"
                            id="profile-posts-page-menu-item"
                            onClick={switchPage}
                        >
                            Posts ({myProfile.posts.length})
                        </div>
                        <div
                            className="profile-page-menu-item b-bottom-right-radius-hover"
                            id="profile-interests-page-menu-item"
                            onClick={switchPage}
                        >
                            Interesses ({myProfile.interests.filter(i => i.public).length})
                        </div>
                    </div>
                }
            </div>
            <div className="sidebar-content">
                {myProfile ?
                    <>
                        <EditProfile
                            profile={myProfile}
                            isOpen={isEditing}
                            closeModal={() => setIsEditing(false)}
                        />

                        <ProfileData profile={myProfile}>
                            <div className="myprofile-btn-wrapper">
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    style={{ marginBottom: '10px' }}
                                >
                                    Editar perfil
                                </button>
                                <Link to='/perfil/meus-interesses'>
                                    <button className="btn btn-secondary">Editar interesses</button>
                                </Link>
                            </div>
                        </ProfileData>
                        {currentPageIsPosts ?
                            <Posts profile={myProfile} fetchProfile={updateMyProfile} />
                            :
                            <Interests profile={myProfile} />
                        }
                    </> :
                    <div className="loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
            <BottomMenu />
        </div>
    )
}
