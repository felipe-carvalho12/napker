import React, { createContext, useState } from 'react'

export const EditProfileContext = createContext()

export const EditProfileProvider = props => {
    const [profileImage, setProfileImage] = useState(null)

    return (
        < EditProfileContext.Provider value={[profileImage, setProfileImage]}>
            {props.children}
        </ EditProfileContext.Provider>
    )
}