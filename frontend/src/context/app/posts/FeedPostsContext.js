import React, { createContext, useState } from 'react'

export const FeedPostsContext = createContext()

export const FeedPostsContextProvider = props => {
    const [posts, setPosts] = useState([])

    const removePost = id => {
        setPosts(posts.filter(post => post.details.id !== id))
    }

    return (
        <FeedPostsContext.Provider value={[posts, setPosts, removePost]}>
            {props.children}
        </FeedPostsContext.Provider>
    )
}