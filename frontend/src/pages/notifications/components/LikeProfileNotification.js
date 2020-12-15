import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'

export default function LikeProfileNotification(props) {
    const like = props.like

    return (
        <li className="notification-row" key={like.profile.id}>
            <div className="notification-icon-container">
                <i class="fas fa-heart notification-like" />
            </div>
            <div className="notification-container">
                <div className="notification-info-container">
                    <Link to={`/user/${like.profile.slug}`}>
                        <img src={`${SERVER_URL}${like.profile.photo}`}
                            className="profile-img-med"
                            style={{ marginRight: '10px' }}
                        />
                    </Link>
                    <p className="text-secondary d-inline-block" style={{ margin: '0' }}>
                        {like.created.split('-').reverse().join('/')}
                        {" • "}
                        {props.children}
                        <Link to={`/user/${like.profile.slug}`} style={{ color: "#000" }}>
                            @{like.profile.user.username}
                        </Link> curtiu seu post.
                    </p>
                </div>
                <div className="notification-post-content">
                    {like.post.content}
                </div>
                <div className="btn-see-post-container">
                    <Link to={`/post/${like.post.id}`}>
                        <button className="btn btn-primary btn-see-post">
                            Ver Post
                        </button>
                    </Link>
                </div>
            </div>
        </li>
    )
}