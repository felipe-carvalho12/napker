import React, { useContext, useEffect, useRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import Cropper from "cropperjs";

import "cropperjs/dist/cropper.min.css";

import { ProfileImageContext } from '../../../../../../context/edit-profile/EditProfileContext'


export default function CroppieModal(props) {
    const [profileImage, setProfileImage] = useContext(ProfileImageContext)

    const imageElement = useRef()

    useEffect(() => {
        const cropper = new Cropper(imageElement.current, {
            viewMode: 1,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                setProfileImage(canvas.toDataURL("image/png"))
            }
        })
    }, [])

    return (
        <>
            <Modal.Header closeButton>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex justify-content-center align-items-center">
                        <i class="fas fa-arrow-left left-arrow-icon" onClick={props.stopCropping} />
                        <Modal.Title>Editar perfil</Modal.Title>
                    </div>
                    <button className="btn btn-primary" onClick={props.stopCropping}>
                        Aplicar
                    </button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="d-flex justify-content-center w-100" style={{ maxHeight: '480px' }}>
                        <img className="mw-100 mh-100" ref={imageElement} src={profileImage} alt="Source" crossorigin />
                    </div>
                </div>
            </Modal.Body>
        </>
    )
}
