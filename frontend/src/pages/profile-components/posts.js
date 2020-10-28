import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../../components/header'
import { SERVER_URL } from '../../settings'

export default function Posts(props) {
    const [profile, setProfile] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/user/${slug}`)
            .then(response => response.json())
            .then(data => setProfile(data))
    }, [])

    return (
        <>
            <Header page={profile ? `${profile.first_name} ${profile.last_name} / Posts` : 'Perfil / Posts'}
                backArrow={true}
            />
            <div className="content">
                <div className="lidt-group">
                    {profile && profile.posts.map(post => {
                        return (
                            <li className="list-group-item profile-row filtered-profile" key={post.id}>
                                <div className="d-flex justify-content-between">
                                   <div className="profile-col">
                                        {post.content}
                                   </div>
                                </div>
                            </li>
                        )
                    })}
                </div>
            </div>
        </>
    )
}