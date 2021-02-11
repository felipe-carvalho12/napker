import React, { createContext, useState } from 'react'

export const FeedPostsContext = createContext()

export const FeedPostsContextProvider = props => {
    const [posts, setPosts] = useState([])

    return (
        <FeedPostsContext.Provider value={[posts, setPosts]}>
            {props.children}
        </FeedPostsContext.Provider>
    )
}