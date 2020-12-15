import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'

export default function CommentProfileNotification(props) {
    const comment = props.comment
    return (
        <li className="notification-row" key={comment.author.id}>
            <div className="notification-icon-container">
                <i class="fas fa-comment notification-comment" style={{ margin: '0' }} />
            </div>
            <div className="notification-container">
                <div className="notification-info-container">
                    <Link to={`/user/${comment.author.slug}`}>
                        <img src={`${SERVER_URL}${comment.author.photo}`}
                            className="profile-img-med"
                            style={{ marginRight: '10px' }}
                        />
                    </Link>
                    <p className="text-secondary d-inline-block" style={{ margin: '0' }}>
                        {comment.created.split('-').reverse().join('/')}
                        {" • "}
                        {props.children}
                        <Link to={`/user/${comment.author.slug}`} style={{ color: "#000" }}>
                            @{comment.author.user.username}
                        </Link> comentou seu post.
                    </p>
                </div>
                <div className="notification-comment-content">
                    {comment.content}
                </div>
                <div className="btn-see-post-container">
                    <Link to={`/post/${comment.post.id}`}>
                        <button className="btn btn-primary btn-see-post">
                            Ver Post
                        </button>
                    </Link>
                </div>
            </div>
        </li>
    )
}