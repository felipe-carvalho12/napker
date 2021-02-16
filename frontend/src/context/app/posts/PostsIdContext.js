import React, { createContext, useContext, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'
import { MyProfileContext } from '../AppContext'

export const PostsIdContext = createContext()

export const PostsIdProvider = props => {
    const [postsid, setPostsId] = useState(null)
    const [, fetchMyProfile] = useContext(MyProfileContext)

    const fetchPostsId = scroll => {
        fetch(`${SERVER_URL}/post-api/post-id-list/${scroll}`)
            .then(response => response.json())
            .then(data => setPostsId(data))
    }

    const removePostId = id => {
        setPostsId(postsid.filter(postId => postId.id !== id))
        fetchMyProfile()
    }

    return (
        <PostsIdContext.Provider value={[postsid, setPostsId, fetchPostsId, removePostId]}>
            {props.children}
        </PostsIdContext.Provider>
    )
}
