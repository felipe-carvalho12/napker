import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../../config/settings'

export default function NotificationContent(props) {
    const notification = props.notification

    if (props.type == "like") {
        var author = notification.profile
        var content = notification.post.content
        var icon = "fas fa-heart"
        var color = 'var(--heart-color)'
    } else {
        var author = notification.author
        var content = notification.content
        var icon = "fas fa-comment"
        var color = 'var(--primary-color)'
    }

    return (
        <li className="d-flex w-100 white-hover" style={{ padding: '15px 15px', background: '#fff', borderBottom: '1px solid var(--border-color)' }} 
            key={author.id}
        >
            <div className="d-flex flex-column h-100" style={{ marginRight: '10px' }}>
                <i class={icon} style={{ fontSize: '30px', color: color }}/>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start h-100 w-100">
                <div className="d-flex justify-content-center align-items-center">
                    <Link to={`/user/${author.slug}`}>
                        <img src={`${SERVER_URL}${author.photo}`}
                            className="profile-img-med"
                            style={{ marginRight: '10px' }}
                        />
                    </Link>
                    <p className="text-secondary d-inline-block" style={{ margin: '0' }}>
                        {notification.created.split('-').reverse().join('/')}
                        {" • "}
                        {props.children}
                        <Link to={`/user/${author.slug}`} style={{ color: "#000" }}>
                            @{author.user.username}
                        </Link> curtiu seu post.
                    </p>
                </div>
                <div className="d-flex justify-content-start word-break w-100"
                     style={{ paddingTop: '10px'}}
                >
                    {content}
                </div>
                <div className="d-flex justify-content-end w-100">
                    <Link to={`/post/${notification.post.id}`}>
                        <button className="btn btn-primary" style={{height: '37px', width: '100px' }}>
                            Ver Post
                        </button>
                    </Link>
                </div>
            </div>
        </li>
    )
}