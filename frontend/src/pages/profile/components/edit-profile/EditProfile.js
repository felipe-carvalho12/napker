import React, { useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'

import { ProfileImageContext } from '../../../../context/edit-profile/EditProfileContext'
import CroppieModal from './components/CroppieModal'
import EditProfileModal from './components/EditProfileModal'


export default function EditProfile(props) {
    const [profileImage, setProfileImage] = useContext(ProfileImageContext)
    const [isCroppingImage, setIsCropping] = useState(false)

    const handleProfileImageChange = (e, isCropping) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImage(reader.result)
                setIsCropping(isCropping)
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch {

        }
    }

    return (
        <Modal show={props.isOpen}
            onHide={props.closeModal}
            size="lg"
        >
            {isCroppingImage ?
                <CroppieModal
                    image={profileImage}
                    handleProfileImageChange={e => handleProfileImageChange(e, false)}
                    handleBackArrow={() => setIsCropping(false)}
                />
                :
                <EditProfileModal
                    profile={props.profile}
                    handleProfileImageChange={e => handleProfileImageChange(e, true)}
                    closeModal={props.closeModal}
                />
            }
        </Modal>
    )
}
