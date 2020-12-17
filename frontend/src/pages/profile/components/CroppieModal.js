import { Croppie } from 'croppie'
import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { SERVER_URL } from '../../../config/settings'
import { csrftoken, openCloseEmojiList } from '../../../config/utils'
import { EditProfileContext } from '../../../context/editprofile/EditProfileContext'


export default function CroppieModal(props) {
    const [croppedImage, setCroppedImage] = useState(null)
    const [isFileUploaded, setIsFileUploaded] = useState(null)

    const file = React.createRef()
    const croppie = React.createRef()
    const img = React.createRef()

    return (
        <Modal
            show={props.isOpen}
            onHide={props.closeModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <i class="fas fa-arrow-left left-arrow-icon" onClick={() => window.history.back()} />
                <Modal.Title>Editar perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="App">
                    <input
                        type="file"
                        id="files"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={props.handleProfileImageChange}
                    />
                    <button
                        type="button"
                    >
                        Aplicar
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
