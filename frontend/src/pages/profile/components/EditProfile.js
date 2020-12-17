import { Croppie } from 'croppie'
import React, { useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import { SERVER_URL } from '../../../config/settings'
import { csrftoken, openCloseEmojiList } from '../../../config/utils'
import CroppieModal from './CroppieModal'
import EditProfileModal from './EditProfileModal'
import { EditProfileContext } from '../../../context/editprofile/EditProfileContext'
export default function EditProfile(props) {

    const [croppieState, setCroppieState] = useState(false)
    const [profileImage, setProfileImage] = useContext(EditProfileContext)
    const handleProfileImageChange = e => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {

                setCroppieState(true)
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
            {croppieState ?
                <CroppieModal image={profileImage} /> :
                <EditProfileModal profile={props.profile}
                isOpen={props.isOpen}
                closeModal={() => props.setIsEditing(false)} handleProfileImageChange={handleProfileImageChange} />
            }
        </>

    )
}

