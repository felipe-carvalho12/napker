import React, { createContext, useState } from 'react'

export const UnvisualizedCommentsContext = createContext()

export const UnvisualizedCommentsProvider = props => {
    const [unvisualizedCommentsNumber, setUnvisulaizedComments] = useState(0)

    return (
        <UnvisualizedCommentsContext.Provider value={[unvisualizedCommentsNumber, setUnvisulaizedComments]}>
            {props.children}
        </UnvisualizedCommentsContext.Provider>
    )
}