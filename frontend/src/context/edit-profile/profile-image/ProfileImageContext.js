import React, { createContext, useState } from 'react'

export const ProfileImageContext = createContext()

export const ProfileImageProvider = props => {
    const [profileImage, setProfileImage] = useState(null)

    return (
        <ProfileImageContext.Provider value={[profileImage, setProfileImage]}>
            {props.children}
        </ProfileImageContext.Provider>
    )
}