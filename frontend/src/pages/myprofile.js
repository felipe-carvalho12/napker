import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Picker from 'emoji-picker-react'

import Header from '../components/fixed/Header'
import Posts from './profile-components/Posts'
import Interests from './profile-components/Interests'
import { SERVER_URL } from '../settings'
import { csrftoken, openCloseEmojiList } from '../utils'

export default function MyProfile() {
    const [profile, setProfile] = useState(null)
    const [profileImagePreview, setProfileImagePreview] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editingBioContent, setEditingBioContent] = useState('')
    const [currentPageIsPosts, setCurrentPageIsPosts] = useState(true)

    document.title = 'Perfil / Napker'

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = () => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => {
                setProfile(data)
                setProfileImagePreview(`${SERVER_URL}${data.photo}`)
            })
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

    const handleProfileImageChange = e => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImagePreview(reader.result)
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch {

        }
    }


    const handleUsernameChange = e => {
        if (e.target.value.trim() !== '') {
            fetch(`${SERVER_URL}/profile-api/user/${e.target.value}`)
                .then(response => response.json())
                .then(data => {
                    if (data.bool !== 'false' && data.id !== profile.id) {
                        document.querySelector('#username-taken').style.display = 'initial'
                    } else {
                        document.querySelector('#username-taken').style.display = 'none'
                    }
                })
        }
    }

    const onEmojiSelect = (event, emojiObject) => {
        setEditingBioContent(editingBioContent + emojiObject.emoji)
    }

    return (
        <>
            <Header page="Perfil" />
            <div className="content">
                {profile ?
                    <>
                        <Modal show={isEditing}
                            onHide={() => setIsEditing(false)}
                            size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Editar perfil</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form
                                    action={`${SERVER_URL}/update-profile`}
                                    className="d-flex flex-column justify-content-center"
                                    id="update-profile-form"
                                    method="POST"
                                    encType="multipart/form-data"
                                >
                                    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                                    <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                                        <img src={profileImagePreview}
                                            className="profile-img-big"
                                            style={{ marginBottom: '25px' }}
                                        />
                                        <input
                                            type="file"
                                            accept="image/png, image/jpg, image/jpeg"
                                            name="profile-photo"
                                            onChange={handleProfileImageChange}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        Email: {profile.email}
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-center">
                                        <label htmlFor="first-name" className="profile-field-label">Nome:</label>
                                        <input className="profile-field-input" type="text" name="first-name" id="first-name" placeholder={profile.first_name} />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <label htmlFor="last-name" className="profile-field-label">Sobrenome:</label>
                                        <input className="profile-field-input" type="text" name="last-name" id="last-name" placeholder={profile.last_name} />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <label htmlFor="username" className="profile-field-label">Nome de usuário:</label>
                                        <input
                                            className="profile-field-input"
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder={profile.user.username}
                                            onChange={handleUsernameChange}
                                        />
                                    </div>
                                    <div
                                        id="username-taken"
                                        style={{ display: 'none', width: '100%', textAlign: 'center', padding: '3px' }}
                                    >
                                        <span>Nome de usuário já existe</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <label htmlFor="birth-date" className="profile-field-label">Data de nascimento:</label>
                                        <input className="profile-field-input" type="date" name="birth-date" id="birth-date" defaultValue={profile.birth_date} />
                                    </div>
                                    <div className="emoji-list-container bio-emoji-list" id="emoji-list-container">
                                        <Picker onEmojiClick={onEmojiSelect} />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <label htmlFor="bio" className="profile-field-label">Bio:</label>
                                        <div className="email-input-container">
                                            <input
                                                className="profile-field-input-email"
                                                type="email"
                                                name="bio"
                                                id="bio"
                                                value={editingBioContent}
                                                placeholder={profile.bio}
                                                onChange={e => setEditingBioContent(e.target.value)}
                                            />
                                            <label
                                                className="far fa-smile"
                                                id="emoji-button"
                                                onClick={() => openCloseEmojiList(false)}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-grey" onClick={() => setIsEditing(false)}>Fechar</button>
                                <button className="btn btn-primary" onClick={() => document.querySelector('form#update-profile-form').submit()}>Salvar</button>
                            </Modal.Footer>
                        </Modal>
                        <div className="profile-data-container">
                            <div className="d-flex flex-column align-items-start">
                                <p style={{ padding: '15px' }}>
                                    <img src={`${SERVER_URL}${profile.photo}`}
                                        className="profile-img-big"
                                        style={{ marginBottom: '25px' }}
                                    />
                                </p>
                                <p style={{ marginBottom: 0 }}><strong>{profile.first_name} {profile.last_name}</strong></p>
                                <p className="text-secondary" style={{ marginTop: 0 }}>@{profile.user.username}</p>
                                <p>{profile.bio}</p>
                                <p className="text-secondary">
                                    <i className="far fa-calendar-alt"></i> Entrou em {profile.created.split('-').reverse().join('/')}
                                </p>
                                <p>
                                    <Link to={`/user/${profile.slug}/amigos`} style={{ color: '#000' }}>
                                        <strong>{profile.friends.length}</strong> {profile.friends.length === 1 ? 'amigo' : 'amigos'}
                                    </Link>
                                </p>
                            </div>
                            <div className="d-flex flex-column">
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
                        </div>
                        <div className="profile-page-menu">
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
                        {currentPageIsPosts ?
                            <Posts profile={profile} fetchProfile={fetchProfile} /> :
                            <Interests profile={profile} />
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