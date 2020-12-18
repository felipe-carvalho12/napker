import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { SERVER_URL } from '../../../../../config/settings'
import { ProfileImageContext } from '../../../../../context/edit-profile/EditProfileContext'


export default function CroppieModal(props) {
    const [profileImage, setProfileImage] = useContext(ProfileImageContext)

    return (
        <>
            <Modal.Header closeButton>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex justify-content-center align-items-center">
                        <i class="fas fa-arrow-left left-arrow-icon" onClick={props.handleBackArrow} />
                        <Modal.Title>Editar perfil</Modal.Title>
                    </div>
                    <button className="btn btn-primary">
                        Aplicar
                    </button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <img src={profileImage} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Modal.Body>
        </>
    )
}
