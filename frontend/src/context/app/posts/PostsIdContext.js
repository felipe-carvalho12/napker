import React, { createContext, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'

export const PostsIdContext = createContext()

export const PostsIdProvider = props => {
    const [postsid, setPostsId] = useState(null)

    const fetchPostsId = scroll => {
        fetch(`${SERVER_URL}/post-api/post-id-list/${scroll}`)
            .then(response => response.json())
            .then(data => setPostsId(data))
    }

    const removePostId = id => {
        setPostsId(postsid.filter(postId => postId.id !== id))
    }

    return (
        <PostsIdContext.Provider value={[postsid, setPostsId, fetchPostsId, removePostId]}>
            {props.children}
        </PostsIdContext.Provider>
    )
}
