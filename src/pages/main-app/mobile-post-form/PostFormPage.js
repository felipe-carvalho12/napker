import React, { useState, useEffect } from 'react'

import { SERVER_URL } from '../../../config/settings'
import Header from '../../../components/fixed/Header'
import PostForm from '../home/components/posts_/components/PostForm'

export default function Posts() {
    const [myProfile, setMyProfile] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
    }, [])

    return (
        <div className="content">
            <Header page="Novo post" backArrow={true} />
            <div className="post-form-page-container">
                {myProfile !== null ?
                    <PostForm myProfile={myProfile} />
                    :
                    <div className="posts-loader-container" >
                        <div className="loader" />
                    </div>
                }
            </div>
        </div>
    )
}