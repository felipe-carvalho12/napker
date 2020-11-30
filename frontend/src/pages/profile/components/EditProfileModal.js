import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Picker from 'emoji-picker-react'

import { SERVER_URL } from '../../../config/settings'
import { csrftoken, openCloseEmojiList } from '../../../config/utils'

export default function EditProfileModal(props) {
    const profile = props.profile
    const isOpen = props.isOpen
    const closeModal = props.closeModal

    const [profileImagePreview, setProfileImagePreview] = useState(`${SERVER_URL}${profile.photo}`)
    const [editingBioContent, setEditingBioContent] = useState('')

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
        <Modal show={isOpen}
            onHide={closeModal}
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
                            className="profile-photo-input"
                            name="profile-photo"
                            onChange={handleProfileImageChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        Email: {profile.email}
                    </div>
                    <hr />
                    <div className="edit-profile-input">
                        <label htmlFor="first-name" className="profile-field-label">Nome:</label>
                        <input className="profile-field-input" type="text" name="first-name" id="first-name" placeholder={profile.first_name} />
                    </div>
                    <div className="edit-profile-input">
                        <label htmlFor="last-name" className="profile-field-label">Sobrenome:</label>
                        <input className="profile-field-input" type="text" name="last-name" id="last-name" placeholder={profile.last_name} />
                    </div>
                    <div className="edit-profile-input">
                        <label htmlFor="username" className="profile-field-label">Nome de usuário:</label>
                        <input
                            className="profile-field-input"
                            type="text"
                            name="username"
                            id="username"
                            placeholder={`@${profile.user.username}`}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div
                        id="username-taken"
                        style={{ display: 'none', width: '100%', textAlign: 'center', padding: '3px' }}
                    >
                        <span>Nome de usuário já existe</span>
                    </div>
                    <div className="edit-profile-input">
                        <label htmlFor="birth-date" className="profile-field-label">Data de nascimento:</label>
                        <input className="profile-field-input" type="date" name="birth-date" id="birth-date" defaultValue={profile.birth_date} />
                    </div>
                    <div className="emoji-list-container bio-emoji-list" id="emoji-list-container">
                        <Picker onEmojiClick={onEmojiSelect} />
                    </div>
                    <div className="edit-profile-input">
                        <label htmlFor="bio" className="profile-field-label">Bio:</label>
                        <div className="email-input-container">
                            <input
                                className="profile-field-input-email"
                                type="email"
                                name="bio"
                                id="bio"
                                value={editingBioContent}
                                placeholder={profile.bio}
                                maxLength={100}
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
                <button className="btn btn-grey" onClick={closeModal}>Fechar</button>
                <button className="btn btn-primary" onClick={() => document.querySelector('form#update-profile-form').submit()}>Salvar</button>
            </Modal.Footer>
        </Modal>
    )
}