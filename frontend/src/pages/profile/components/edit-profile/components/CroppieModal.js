import React, { useContext, useEffect } from 'react'
import Croppie from "croppie"
import Modal from 'react-bootstrap/Modal'

import { ProfileImageContext } from '../../../../../context/edit-profile/EditProfileContext'


export default function CroppieModal(props) {
    const [profileImage, setProfileImage] = useContext(ProfileImageContext)

    const croppieOptions = {
        enableOrientation: true,
        viewport: {
            width: 300,
            height: 300,
            type: "square"
        },
        boundary: {
            width: "100%",
            height: "70vh"
        }
    }

    let c

    useEffect(() => {
        const croppieEl = document.getElementById("croppie")
        c = new Croppie(croppieEl, croppieOptions)
        c.bind({ url: profileImage })
    }, [])

    const handleCroppedImage = () => {
        c.result("base64").then(base64 => {
            setProfileImage(base64)
        })
    }

    return (
        <>
            <Modal.Header closeButton>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex justify-content-center align-items-center">
                        <i class="fas fa-arrow-left left-arrow-icon" onClick={props.handleBackArrow} />
                        <Modal.Title>Editar perfil</Modal.Title>
                    </div>
                    <button className="btn btn-primary" onClick={handleCroppedImage}>
                        Aplicar
                    </button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div id="croppie" />
            </Modal.Body>
        </>
    )
}
