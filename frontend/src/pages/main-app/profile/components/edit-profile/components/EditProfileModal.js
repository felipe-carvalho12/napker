import React, { useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import { SERVER_URL } from '../../../../../../config/settings'
import { csrftoken } from '../../../../../../config/utils'
import { MyProfileContext } from '../../../../../../context/app/AppContext'
import { ProfileImageContext } from '../../../../../../context/edit-profile/EditProfileContext'
import EmojiPicker from '../../../../../../components/EmojiPicker'


export default function EditProfileModal(props) {
    const profile = props.profile
    const [, updateMyProfile] = useContext(MyProfileContext)
    const [profileImage,] = useContext(ProfileImageContext)
    const [editingBioContent, setEditingBioContent] = useState('')
    const [errMessage, setErrMessage] = useState(null)

    const history = useHistory()

    const handleUsernameChange = e => {
        if (e.target.value.trim() !== '') {
            fetch(`${SERVER_URL}/profile-api/username-is-taken/${e.target.value}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        document.querySelector('#username-taken').style.display = 'initial'
                    } else {
                        document.querySelector('#username-taken').style.display = 'none'
                    }
                })
        }
    }

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const userameRef = useRef()
    const birthDateRef = useRef()
    const bioRef = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`${SERVER_URL}/update-profile`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'profile-photo': profileImage || '',
                'first-name': firstNameRef.current.value,
                'last-name': lastNameRef.current.value,
                'username': userameRef.current.value,
                'birth-date': birthDateRef.current.value,
                'bio': bioRef.current.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'profile updated') {
                    props.closeModal()
                    updateMyProfile()
                }
                else setErrMessage(data)
            })
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Editar perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    className="d-flex flex-column align-items-center primary-form"
                    id="update-profile-form"
                    onSubmit={handleSubmit}
                >
                    <div className="d-flex flex-column justify-content-center align-items-center mb-20px position-relative">
                        <img src={profileImage ? profileImage : profile.photo}
                            className="profile-img-big"
                            style={{ filter: 'brightness(.7)' }}
                        />
                        <label htmlFor="profile-photo" className="material-icons-outlined position-absolute icon m-0" style={{ color: '#fefefe' }}>
                            add_a_photo
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/webp"
                            className="d-none"
                            id="profile-photo"
                            onChange={props.handleProfileImageChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        Email: {profile.email}
                    </div>
                    {errMessage !== null &&
                        <div className="w-75 mt-1">
                            <span className="word-break" style={{ color: '#f00' }}>{errMessage}</span>
                        </div>
                    }
                    <div className="w-100 b-bottom my-1" />
                    <div className="w-100 d-flex flex-column align-items-center">
                        <div class="w-75 mt-3 d-flex justify-content-between">
                            <div className="d-flex flex-column align-items-start" style={{ width: '45%' }}>
                                <label htmlFor="first-name" className="text-secondary m-0 ml-1">Nome:</label>
                                <input
                                    ref={firstNameRef}
                                    className="profile-field-input"
                                    type="text"
                                    id="first-name"
                                    maxLength={50}
                                    placeholder={profile.first_name}
                                />
                            </div>
                            <div className="d-flex flex-column align-items-start" style={{ width: '45%' }}>
                                <label htmlFor="last-name" className="text-secondary m-0 ml-1">Sobrenome:</label>
                                <input
                                    ref={lastNameRef}
                                    className="profile-field-input"
                                    type="text"
                                    id="last-name"
                                    maxLength={50}
                                    placeholder={profile.last_name}
                                />
                            </div>
                        </div>
                        <div class="w-75 mt-3 d-flex justify-content-between">
                            <div className="d-flex flex-column align-items-start" style={{ width: "45%" }}>
                                <label htmlFor="username" className="text-secondary m-0 ml-1">Nome de usuário:</label>
                                <div
                                    id="username-taken"
                                    style={{ display: 'none', width: '100%', textAlign: 'center', padding: '3px' }}
                                >
                                    <span>Nome de usuário já existe</span>
                                </div>
                                <input
                                    ref={userameRef}
                                    className="m-0 profile-field-input"
                                    type="text"
                                    id="username"
                                    placeholder={`@${profile.user.username}`}
                                    maxLength={50}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="d-flex flex-column align-items-start" style={{ width: "45%" }}>
                                <label htmlFor="birth-date" className="text-secondary m-0 ml-1">Data de nascimento:</label>
                                <input ref={birthDateRef} className="text-secondary profile-field-input" type="date" id="birth-date" defaultValue={profile.birth_date} />
                            </div>
                        </div>
                        <div className="w-75">
                            <label htmlFor="bio" className="text-secondary m-0 ml-1">Bio:</label>
                            <div className="d-flex position-relative">
                                <textarea
                                    ref={bioRef}
                                    type="text"
                                    className="w-100 border-0 autoExpand textarea-focus"
                                    id="bio"
                                    value={editingBioContent}
                                    placeholder={profile.bio}
                                    maxLength={240}
                                    style={{ padding: 'var(--sz-0)' }}
                                    onChange={e => setEditingBioContent(e.target.value)}
                                />
                                <EmojiPicker style={{ position: 'absolute', margin: '0', right: '0', top: '10%' }} />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-grey" onClick={props.closeModal}>Fechar</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Salvar</button>
            </Modal.Footer>
        </>
    )
}