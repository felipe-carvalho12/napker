import React, { createContext, useState } from 'react'

export const EditProfileModalContext = createContext()

export const EditProfileModalProvider = props => {
    const [editProfileModalIsOpen, setEditProfileModalIsOpen] = useState(null)

    return (
        <EditProfileModalContext.Provider value={[editProfileModalIsOpen, setEditProfileModalIsOpen]}>
            {props.children}
        </EditProfileModalContext.Provider>
    )
}
