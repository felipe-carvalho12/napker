import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { SERVER_URL, DEBUG } from '../../../config/settings'
import { csrftoken } from '../../../config/utils'
import { MyProfileContext } from '../../../context/app/AppContext'
import Header from '../../../components/fixed/Header'
import Posts from './components/Posts'
import Interests from './components/interests/Interests'
import ProfileData from './components/ProfileData'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'

export default function Profile(props) {
    const [myProfile, updateMyProfile] = useContext(MyProfileContext)
    const [profile, setProfile] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)
    const [relationshipButtonLabel, setRelationshipButtonLabel] = useState('')
    const [currentPageIsPosts, setCurrentPageIsPosts] = useState(true)

    const isMobile = visualViewport.width <= 980
    const history = useHistory()
    const { username } = useParams()

    useEffect(() => {
        if (myProfile && myProfile.user.username === username && history.location !== '/perfil') history.replace('/perfil')
        fetchProfile()
        fetchRelationship()
    }, [])

    useEffect(() => {
        let btn = document.querySelector('#profile-page-relationship-btn')
        if (btn) {
            switch (btn.innerHTML, relationshipButtonLabel) {
                case 'Amigos':
                    btn.classList.add('btn-primary')
                    btn.onmouseenter = () => {
                        if (btn.innerHTML === 'Amigos') btn.innerHTML = 'Remover'
                    }
                    btn.onmouseout = () => {
                        if (btn.innerHTML === 'Remover') btn.innerHTML = 'Amigos'
                    }
                    btn.classList.add('friend-btn')
                    btn.classList.remove('d-none')
                    break
                case 'Solicitado':
                    btn.classList.add('btn-primary')
                    btn.classList.remove('d-none')
                    break
                case 'Aceitar':
                    btn.classList.add('btn-primary')
                    btn.classList.remove('d-none')
                    break
                case 'Solicitar':
                    btn.classList.add('btn-secondary')
                    btn.classList.remove('d-none')
            }
        }
    })

    useEffect(() => {
        fetchProfile()
        fetchRelationship()
    }, [username])


    const fetchRelationship = () => {
        fetch(`${SERVER_URL}/profile-api/button-label/${username}`)
            .then(response => response.json())
            .then(data => setRelationshipButtonLabel(data))
    }

    const fetchProfile = () => {
        fetch(`${SERVER_URL}/profile-api/profile01/${username}`)
            .then(response => response.json())
            .then(data => setProfile(data))
    }

    const sendFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/send-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => DEBUG && console.log(data))
    }

    const cancelFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/cancel-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => DEBUG && console.log(data))
    }

    const removeFromFriends = pk => {
        fetch(`${SERVER_URL}/profile-api/remove-from-friends`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(pk)
        })
            .then(response => response.json())
            .then(data => {
                DEBUG && console.log(data)
                updateMyProfile()
            })
    }

    const acceptFriendRequest = pk => {
        fetch(`${SERVER_URL}/profile-api/reply-friend-request`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'senderid': pk,
                'reply': 'accept'
            })
        })
            .then(response => response.json())
            .then(data => {
                DEBUG && console.log(data)
                props.updateNotificationsNumber()
                fetchProfile()
                updateMyProfile()
            })
    }

    const handleRelationshipUpdate = e => {
        const btn = e.target
        if (btn.innerHTML === 'Solicitar') {
            sendFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitado'
            btn.className = 'btn btn-primary'
        } else if (btn.innerHTML === 'Solicitado') {
            cancelFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Solicitar'
            btn.className = 'btn btn-secondary'
        } else if (btn.innerHTML === 'Amigos' || btn.innerHTML === 'Remover') {
            if (window.confirm(`Remover @${profile.user.username} dos amigos?`)) {
                removeFromFriends(btn.dataset.pk)
                btn.innerHTML = 'Solicitar'
                btn.className = 'btn btn-secondary'
            }
        } else if (btn.innerHTML === 'Aceitar') {
            acceptFriendRequest(btn.dataset.pk)
            btn.innerHTML = 'Amigos'
            btn.className = 'btn btn-primary'
        }
    }

    const blockUnblockUser = () => {
        if (myProfile.blocked_profiles_id.includes(profile.id)) {
            if (window.confirm(`Tem certeza que deseja desbloquear ${profile.first_name} ?`)) {
                fetch(`${SERVER_URL}/profile-api/unblock-user`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify(profile.id)
                })
                    .then(response => response.json())
                    .then(data => {
                        DEBUG && console.log(data)
                        setAlertMessage(`Você desbloqueou @${profile.user.username}.`)
                        fetchProfile()
                        updateMyProfile()
                    })
            }
        } else {
            if (window.confirm(`Tem certeza que deseja bloquear ${profile.first_name} ?`)) {
                fetch(`${SERVER_URL}/profile-api/block-user`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify(profile.id)
                })
                    .then(response => response.json())
                    .then(data => {
                        DEBUG && console.log(data)
                        setAlertMessage(`Você bloqueou @${profile.user.username}.
                        @${profile.user.username} não conseguirá mais ver o seu perfil ou te enviar mensagens.`)
                        fetchProfile()
                        updateMyProfile()
                    })
            }
        }
        fetchProfile()
        document.querySelector('#profile-view-more-select').style.display = 'none'
    }

    const openCloseExtraOptions = () => {
        const el = document.querySelector('#profile-view-more-select')
        const style = el.style
        if (!style.display) style.display = 'none'
        if (style.display === 'none') {
            document.querySelector('#profile-view-more-icon').classList.add('view-more-icon-active')
            style.display = 'flex'
        } else {
            document.querySelector('#profile-view-more-icon').classList.remove('view-more-icon-active')
            style.display = 'none'
        }
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
        <div className="content-container p-vw-r">
            <div
                className={!isMobile ? "b-theme-base-color box-med blur-20px" : "fixed w-100 b-theme-base-color blur-20px b-b"}
                style={!isMobile ? { position: "sticky", top: "1vw", padding: "0", zIndex: "1000" } : { zIndex: "1000" }}
            >
                <Header page={profile ? `${profile.first_name} ${profile.last_name}` : 'Perfil'}
                    backArrow={true}
                />
                {myProfile !== null && profile !== null &&
                    <div className="profile-page-menu" style={{ paddingTop: `${isMobile && "50px"}` }}>
                        <div
                            className="profile-page-menu-item profile-page-menu-item-active"
                            id="profile-posts-page-menu-item"
                            onClick={switchPage}
                        >
                            Posts ({profile.posts.length})
                    </div>
                        <div
                            className="profile-page-menu-item"
                            id="profile-interests-page-menu-item"
                            onClick={switchPage}
                        >
                            Interesses ({profile.interests.filter(i => i.public).length})
                    </div>
                    </div>
                }
            </div>
            {myProfile !== null && profile !== null ?
                <div className="sidebar-content">
                    {profile.blocked_profiles_id.includes(myProfile.id) ?
                        <div className="user-blocked-me-container">
                            <h3>O usuário te bloqueou</h3>
                        </div>
                        :
                        <>
                            {alertMessage &&
                                <div class="alert alert-success" role="alert">
                                    {alertMessage}
                                </div>
                            }
                            <ProfileData profile={profile}>
                                <div className="profile-btn-wrapper">
                                    <i
                                        className="fas fa-ellipsis-h btn btn-secondary mr-10px view-more-icon"
                                        id="profile-view-more-icon"
                                        onClick={openCloseExtraOptions}
                                    />
                                    <div className="view-more-select" id="profile-view-more-select" style={{ top: '60%', right: '10%' }}>
                                        {!myProfile.blocked_profiles_id.includes(profile.id) &&
                                            <li>
                                                <Link to={`/mensagens/${profile.user.username}`} style={{ color: 'var(--primary-grey)', textDecoration: 'none' }}>
                                                    <i class="fas fa-envelope text-secondary" />
                                                Enviar mensagem
                                            </Link>
                                            </li>
                                        }
                                        <li onClick={blockUnblockUser}>
                                            <i class="fas fa-user-lock text-secondary" />
                                            {myProfile.blocked_profiles_id.includes(profile.id) ?
                                                'Desbloquear'
                                                :
                                                'Bloquear'
                                            }
                                        </li>
                                        <div className="popover-arrow" style={{ top: '-9px', left: '30%' }} />
                                    </div>
                                    {!myProfile.blocked_profiles_id.includes(profile.id) &&
                                        <button className="btn d-none"
                                            id="profile-page-relationship-btn"
                                            data-pk={profile.id}
                                            onClick={handleRelationshipUpdate}
                                        >{relationshipButtonLabel}</button>
                                    }
                                </div>
                            </ProfileData>
                            {currentPageIsPosts ?
                                <Posts profile={profile} fetchProfile={fetchProfile} /> :
                                <Interests profile={profile} />
                            }
                        </>
                    }
                </div>
                :
                <div className="loader-container">
                    <div className="loader" />
                </div>
            }
            <BottomMenu />
        </div>
    )
}
