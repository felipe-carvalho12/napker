import React, { createContext, useState } from 'react'

export const ImageCropModalContext = createContext()

export const ImageCropModalProvider = props => {
    const [imageCropModalIsOpen, setImageCropModalIsOpen] = useState(false)

    return (
        <ImageCropModalContext.Provider value={[imageCropModalIsOpen, setImageCropModalIsOpen]}>
            {props.children}
        </ImageCropModalContext.Provider>
    )
}