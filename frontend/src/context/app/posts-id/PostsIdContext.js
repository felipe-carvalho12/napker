import React, { createContext, useEffect, useState } from 'react'

import { SERVER_URL } from '../../../config/settings'

export const PostsIdContext = createContext()

export const PostsIdProvider = props => {
    const [postsid, setPostsid] = useState(null)

    const fetchPostsId = scroll => {
        fetch(`${SERVER_URL}/post-api/post-id-list/${scroll}`)
            .then(response => response.json())
            .then(data => setPostsid(data))
    }

    return (
        <PostsIdContext.Provider value={[postsid, fetchPostsId]}>
            {props.children}
        </PostsIdContext.Provider>
    )
}