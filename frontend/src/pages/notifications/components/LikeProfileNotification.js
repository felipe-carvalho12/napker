import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'

export default function LikeProfileNotification(props) {
    const like = props.like
    
    return (
        <li className="notification-row" key={like.profile.id}>
            <div className="d-flex align-items-center">
                <Link to={`/user/${like.profile.slug}`}>
                    <img src={`${SERVER_URL}${like.profile.photo}`}
                        className="profile-img-med"
                        style={{ marginRight: '10px' }}
                    />
                </Link>
                <i class="fas fa-heart notification-like" />
                <p className="text-secondary d-inline-block">
                    {like.created.split('-').reverse().join('/')}
                </p>
                {props.children}
            </div>
            <div className="notification-message">
                <p>
                    <Link to={`/user/${like.profile.slug}`} style={{ color: "#000" }}>
                        @{like.profile.user.username}
                    </Link> curtiu seu post.
                </p>
            </div>
            <div className="notification-post-content">
                {like.post.content}
            </div>
        </li>
    )
}