import React, { useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Picker from 'emoji-picker-react'

import { SERVER_URL } from '../../../../../../config/settings'
import { csrftoken, openCloseEmojiList } from '../../../../../../config/utils'
import { ProfileImageContext } from '../../../../../../context/edit-profile/EditProfileContext'


export default function EditProfileModal(props) {
    const profile = props.profile
    const [profileImage, setProfileImage] = useContext(ProfileImageContext)
    const [editingBioContent, setEditingBioContent] = useState('')
    const [errMessage, setErrMessage] = useState(null)

    const history = useHistory()

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
                    props.fetchProfile()
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
                    <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                        <img src={profileImage ? profileImage : `${SERVER_URL}${profile.photo}`}
                            className="profile-img-big"
                            style={{ marginBottom: '25px' }}
                        />
                        <label htmlFor="profile-photo" className="material-icons-outlined position-absolute icon" style={{ top: '40px', opacity: '.85' }}>
                            add_a_photo
                        </label>
                        <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
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
                        <div className="emoji-list-container bio-emoji-list" id="emoji-list-container">
                            <Picker onEmojiClick={onEmojiSelect} />
                        </div>
                        <div className="w-75">
                            <label htmlFor="bio" className="text-secondary m-0 ml-1">Bio:</label>
                            <div className="d-flex position-relative">
                                <textarea
                                    ref={bioRef}
                                    type="text"
                                    className="autoExpand"
                                    id="bio"
                                    value={editingBioContent}
                                    placeholder={profile.bio}
                                    maxLength={240}
                                    onChange={e => setEditingBioContent(e.target.value)}
                                />
                                <label
                                    className="far fa-smile smile m-0 position-absolute"
                                    id="emoji-button"
                                    style={{ right: '10px', top: '10px' }}
                                    onClick={() => openCloseEmojiList(false)}
                                />
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