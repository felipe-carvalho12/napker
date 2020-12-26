import React, { createContext, useState } from 'react'

export const UnvisualizedLikesContext = createContext()

export const UnvisualizedLikesProvider = props => {
    const [unvisualizedLikesNumber, setUnvisulaizedLikes] = useState(0)

    return (
        <UnvisualizedLikesContext.Provider value={[unvisualizedLikesNumber, setUnvisulaizedLikes]}>
            {props.children}
        </UnvisualizedLikesContext.Provider>
    )
}