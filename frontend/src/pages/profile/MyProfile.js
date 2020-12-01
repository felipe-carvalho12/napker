import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../config/settings'
import { hideBottomMenuPostIcon } from '../../config/utils'
import Header from '../../components/fixed/Header'
import EditProfileModal from './components/EditProfileModal'
import Posts from './components/Posts'
import Interests from './components/interests/Interests'
import ProfileData from './components/ProfileData'

export default function MyProfile() {
    const [myProfile, setProfile] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [currentPageIsPosts, setCurrentPageIsPosts] = useState(true)

    document.title = 'Perfil / Napker'

    useEffect(() => {
        hideBottomMenuPostIcon()
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
                        <EditProfileModal
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
                        <div className="profile-page-menu">
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
        </>
    )
}