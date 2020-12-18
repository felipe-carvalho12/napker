import React, { useState, useContext } from 'react'

import { EditProfileContext } from '../../../context/editprofile/EditProfileContext'
import CroppieModal from './CroppieModal'
import EditProfileModal from './EditProfileModal'


export default function EditProfile(props) {
    const [croppieModalIsOpen, setCroppieModalIsOpen] = useState(false)
    const [profileImage, setProfileImage] = useContext(EditProfileContext)

    const handleProfileImageChange = (e, croppieModalIsOpen) => {
        if (croppieModalIsOpen) props.closeEditingProfileModal()

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setCroppieModalIsOpen(croppieModalIsOpen)
                setProfileImage(reader.result)
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch {

        }
    }

    return (
        <>
            <CroppieModal
                image={profileImage}
                isOpen={croppieModalIsOpen}
                closeModal={() => setCroppieModalIsOpen(false)}
                handleProfileImageChange={e => handleProfileImageChange(e, false)}
            />
            <EditProfileModal
                profile={props.profile}
                isOpen={props.editingProfileModalIsOpen}
                closeModal={props.closeEditingProfileModal}
                handleProfileImageChange={e => handleProfileImageChange(e, true)}
            />
        </>
    )
}
