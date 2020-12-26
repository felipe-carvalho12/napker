import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'
import Header from '../../../components/fixed/Header'
import EditProfile from './components/edit-profile/EditProfile'
import Posts from './components/Posts'
import Interests from './components/interests/Interests'
import ProfileData from './components/ProfileData'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'


export default function MyProfile() {
    const [myProfile, setProfile] = useState(null)
    const [currentPageIsPosts, setCurrentPageIsPosts] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    document.title = 'Perfil / Napker'

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = () => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setProfile(data))
    }

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
        <>
            <Header page="Perfil" />
            <div className="content">
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
                        <div className="profile-page-menu b-bottom">
                            <div
                                className="profile-page-menu-item profile-page-menu-item-active"
                                id="profile-posts-page-menu-item"
                                onClick={switchPage}
                            >
                                Posts ({myProfile.posts.length})
                            </div>
                            <div
                                className="profile-page-menu-item"
                                id="profile-interests-page-menu-item"
                                onClick={switchPage}
                            >
                                Interesses ({myProfile.interests.filter(i => i.public).length})
                            </div>
                        </div>
                        {currentPageIsPosts ?
                            <Posts profile={myProfile} fetchProfile={fetchProfile} />
                            :
                            <Interests profile={myProfile} />
                        }
                    </> :
                    <div className="profile-page-loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
            <BottomMenu />
        </>
    )
}
