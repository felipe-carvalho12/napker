import React, { createContext } from 'react'

import { ProfileImageContext, ProfileImageProvider } from './profile-image/ProfileImageContext'
import { EditProfileModalContext, EditProfileModalProvider } from './edit-profile-modal/EditProfileModalContext'
import { ImageCropModalContext, ImageCropModalProvider } from './image-crop-modal/ImageCropModalContext'
export { ProfileImageContext, EditProfileModalContext, ImageCropModalContext }

export const EditProfileContext = createContext()

export default function EditProfileProvider(props) {
    return (
        <EditProfileContext.Provider>
            <ProfileImageProvider>
                <EditProfileModalProvider>
                    <ImageCropModalProvider>
                        {props.children}
                    </ImageCropModalProvider>
                </EditProfileModalProvider>
            </ProfileImageProvider>
        </EditProfileContext.Provider>
    )
}
