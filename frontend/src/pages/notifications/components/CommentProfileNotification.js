import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'

export default function CommentProfileNotification(props) {
    const comment = props.comment
    return (
        <li className="notification-row" key={comment.author.id}>
            <div className="d-flex align-items-center">
                <Link to={`/user/${comment.author.slug}`}>
                    <img src={`${SERVER_URL}${comment.author.photo}`}
                        className="profile-img-med"
                        style={{ marginRight: '10px' }}
                    />
                </Link>
                <i class="fas fa-comment notification-comment" style={{ margin: '0' }} />
                <p className="text-secondary d-inline-block">
                    {comment.created.split('-').reverse().join('/')}
                </p>
                {props.children}
            </div>
            <div className="notification-message">
                <p>
                    <Link to={`/user/${comment.author.slug}`} style={{ color: "#000" }}>
                        @{comment.author.user.username}
                    </Link> comentou seu post.
                </p>
            </div>
            <div className="notification-comment-container">
                <div className="notification-comment-content">
                    {comment.content}
                </div>
            </div>
            <div className="btn-see-post-container">
                <Link to={`/post/${comment.post.id}`}>
                    <button className="btn btn-primary btn-see-post">
                        Ver Post
                    </button>
                </Link>
            </div>
        </li>
    )
}