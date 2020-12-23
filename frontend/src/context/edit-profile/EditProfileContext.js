import React, { createContext } from 'react'

import { ProfileImageContext, ProfileImageProvider } from './profile-image/ProfileImageContext'
export { ProfileImageContext }

export const EditProfileContext = createContext()

export default function EditProfileProvider(props) {
    return (
        <EditProfileContext.Provider>
            <ProfileImageProvider>
                {props.children}
            </ProfileImageProvider>
        </EditProfileContext.Provider>
    )
}
