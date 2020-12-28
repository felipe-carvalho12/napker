import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Picker from 'emoji-picker-react'

import { SERVER_URL } from '../../../../../../config/settings'
import { csrftoken, openCloseEmojiList } from '../../../../../../config/utils'
import { ProfileImageContext } from '../../../../../../context/edit-profile/EditProfileContext'


export default function EditProfileModal(props) {
    const profile = props.profile
    const [profileImage, setProfileImage] = useContext(ProfileImageContext)
    const [editingBioContent, setEditingBioContent] = useState('')

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
            <Modal.Header closeButton>
                <Modal.Title>Editar perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    action={`${SERVER_URL}/update-profile`}
                    className="d-flex flex-column align-items-center primary-form"
                    id="update-profile-form"
                    method="POST"
                    encType="multipart/form-data"
                >
                    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                    <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                        <img src={profileImage ? profileImage : `${SERVER_URL}${profile.photo}`}
                            className="profile-img-big"
                            style={{ marginBottom: '25px' }}
                        />
                        <input
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            className="profile-photo-input"
                            onChange={props.handleProfileImageChange}
                        />
                        <input
                            type="hidden"
                            name="profile-photo"
                            value={profileImage}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        Email: {profile.email}
                    </div>
                    <div className="w-100 b-bottom my-1" />
                    <div className="w-100 d-flex flex-column align-items-center">
                        <div class="w-75 mt-3 d-flex justify-content-between">
                            <div className="d-flex flex-column align-items-start" style={{ width: '45%' }}>
                                <label htmlFor="first-name" className="text-secondary m-0 ml-1">Nome:</label>
                                <input className="profile-field-input" type="text" name="first-name" id="first-name" placeholder={profile.first_name} />
                            </div>
                            <div className="d-flex flex-column align-items-start" style={{ width: '45%' }}>
                                <label htmlFor="last-name" className="text-secondary m-0 ml-1">Sobrenome:</label>
                                <input className="profile-field-input" type="text" name="last-name" id="last-name" placeholder={profile.last_name} />
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
                                    className="m-0 profile-field-input"
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder={`@${profile.user.username}`}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="d-flex flex-column align-items-start" style={{ width: "45%" }}>
                                <label htmlFor="birth-date" className="text-secondary m-0 ml-1">Data de nascimento:</label>
                                <input className="profile-field-input" type="date" name="birth-date" id="birth-date" defaultValue={profile.birth_date} />
                            </div>
                        </div>
                        <div className="emoji-list-container bio-emoji-list" id="emoji-list-container">
                            <Picker onEmojiClick={onEmojiSelect} />
                        </div>
                        <div className="w-75">
                            <label htmlFor="bio" className="text-secondary m-0 ml-1">Bio:</label>
                            <div className="d-flex position-relative">
                                <textarea
                                    type="text"
                                    className="autoExpand"
                                    name="bio"
                                    id="bio"
                                    value={editingBioContent}
                                    placeholder={profile.bio}
                                    maxLength={240}
                                    onChange={e => setEditingBioContent(e.target.value)}
                                />
                                <label
                                    className="far fa-smile m-0 position-absolute"
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
                <button className="btn btn-primary" onClick={() => document.querySelector('form#update-profile-form').submit()}>Salvar</button>
            </Modal.Footer>
        </>
    )
}