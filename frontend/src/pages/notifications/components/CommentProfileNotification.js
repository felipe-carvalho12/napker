import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../config/settings'

export default function CommentProfileNotification(props) {
    const comment = props.comment
    return (
        <li className="d-flex w-100 white-hover" style={{ padding: '10px 15px', background: '#fff', borderBottom: '1px solid var(--border-color)' }} 
         key={comment.author.id}
        >
            <div className="d-flex flex-column h-100" style={{ marginRight: '10px' }}>
                <i class="fas fa-comment" style={{ fontSize: '30px', color: 'var(--primary-color)' }}/>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start h-100 w-100">
                <div className="d-flex justify-content-center align-items-center">
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
                <div className="d-flex justify-content-start word-break w-100"
                     style={{ paddingTop: '10px'}}
                >
                    {comment.content}
                </div>
                <div className="d-flex justify-content-end w-100">
                    <Link to={`/post/${comment.post.id}`}>
                        <button className="btn btn-primary" style={{height: '37px', width: '100px' }}>
                            Ver Post
                        </button>
                    </Link>
                </div>
            </div>
        </li>
    )
}