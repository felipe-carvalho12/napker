import React, { useState, useEffect } from 'react'

import { SERVER_URL } from '../../../config/settings'
import Header from '../../../components/fixed/Header'
import PostForm from '../home/components/posts_/components/PostForm'

export default function Posts() {
    const [myProfile, setMyProfile] = useState(null)
    const [mobilePostButton, setMobilePostButton] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
    }, [])

    return (
        <div className="content-container p-0">
            <div className="b-theme-base-color box-med blur" style={{ position: "sticky", top: "1vw", padding: "0 20px 0", zIndex: "1000" }}>
                <Header page="Novo post" backArrow={true} />
            </div>
            <div className="content">
                <div className="post-form-page-container">
                    {myProfile !== null ?
                        <div className="box-med b-theme-base-color b-vw-t mt-50px">
                            <PostForm myProfile={myProfile} />
                        </div>
                        :
                        <div className="loader-container" >
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}