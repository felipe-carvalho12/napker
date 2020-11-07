import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import Header from '../components/header'
import Posts from './profile-components/posts'
import Interests from './profile-components/interests'
import { SERVER_URL } from '../settings'
import { csrftoken } from '../utils'

export default function MyProfile() {
    const [profile, setProfile] = useState(null)
    const [profileImagePreview, setProfileImagePreview] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
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
        setCurrentPageIsPosts(!currentPageIsPosts)
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
        fetch(`${SERVER_URL}/profile-api/user/${e.target.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.bool !== 'false') {
                    document.querySelector('#username-taken').style.display = 'initial'
                } else if (document.querySelector('#username-taken').style.display === 'initial') {
                    document.querySelector('#username-taken').style.display = 'none'
                }
            })
    }

    const handleEmailChange = e => {
        fetch(`${SERVER_URL}/profile-api/profile-by-email/${e.target.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.bool !== 'false') {
                    document.querySelector('#email-taken').style.display = 'initial'
                } else if (document.querySelector('#email-taken').style.display === 'initial') {
                    document.querySelector('#email-taken').style.display = 'none'
                }
            })
    }

    return (
        <>
            <Header page="Perfil" />
            {profile ? <div className="content">
                <Modal show={isEditing}
                    onHide={() => setIsEditing(false)}
                    size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action={`${SERVER_URL}/update-profile`} id="update-profile-form" method="POST" encType="multipart/form-data">
                            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                            <div className="d-flex flex-column justify-content-center align-items-center" style={{ padding: '25px' }}>
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
                            <div className="d-flex">
                                <label htmlFor="first-name" className="profile-label">Nome:</label>
                                <input className="form-control" type="text" name="first-name" id="first-name" placeholder={profile.first_name} />
                            </div>
                            <div className="d-flex">
                                <label htmlFor="last-name" className="profile-label">Sobrenome:</label>
                                <input className="form-control" type="text" name="last-name" id="last-name" placeholder={profile.last_name} />
                            </div>
                            <div className="d-flex">
                                <label htmlFor="username" className="profile-label">Nome de usuário:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder={profile.user.username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div style={{ width: '100%', textAlign: 'center', padding: '3px' }}>
                                <span id="username-taken">Nome de usuário já existe</span>
                            </div>
                            <div className="d-flex">
                                <label htmlFor="email" className="profile-label">Email:</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder={profile.email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div style={{ width: '100%', textAlign: 'center', padding: '3px' }}>
                                <span id="email-taken">Email já utilizado</span>
                            </div>
                            <div className="d-flex">
                                <label htmlFor="gender" className="profile-label">Gênero:</label>
                                <select className="form-control" name="gender" id="gender" placeholder={profile.gender}>
                                    <option value="male">Masculino</option>
                                    <option value="female">Feminino</option>
                                    <option value="other">Outro</option>
                                </select>
                            </div>
                            <div className="d-flex">
                                <label htmlFor="birth-date" className="profile-label">Data de nascimento:</label>
                                <input className="form-control" type="date" name="birth-date" id="birth-date" defaultValue={profile.birth_date} />
                            </div>
                            <div className="d-flex">
                                <label htmlFor="bio" className="profile-label">Bio:</label>
                                <input className="form-control" type="email" name="bio" id="bio" placeholder={profile.bio} />
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
                    <div className="profile-page-menu-item profile-page-menu-item-active" onClick={switchPage}>
                        Posts ({profile.posts.length})
                    </div>
                    <div className="profile-page-menu-item" onClick={switchPage}>
                        Interesses ({profile.interests.filter(i => i.public).length})
                    </div>
                </div>
                {currentPageIsPosts ?
                    <Posts profile={profile} fetchProfile={fetchProfile} /> :
                    <Interests profile={profile} />
                }
            </div > : ''}
        </>
    )
}