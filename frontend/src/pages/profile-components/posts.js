import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../../components/header'
import { SERVER_URL } from '../../settings'

export default function Posts(props) {
    const profile = props.profile
    return (
        <>
            <div className="post-list">
                {profile && profile.posts.length ? profile.posts.map(post => {
                    return (
                        <li className="post-container" key={post.id}>
                            <div className="post-row">
                                <div className="post-col">
                                    <img src={`${SERVER_URL}${profile.photo}`}
                                        className="profile-img-med"
                                    />
                                </div>
                                <div className="post-col">
                                    <div style={{ height: '30px' }}>
                                        <strong>{profile.first_name} {profile.last_name} </strong>
                                        <p className="text-secondary d-inline-block">
                                            @{profile.user.username} • {post.created.split('-').reverse().join('/')}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'start' }}>
                                        {post.content}
                                    </div>
                                    {post.image &&
                                        <img src={`${SERVER_URL}${post.image}`} className="post-img" />
                                    }
                                </div>
                            </div>
                            <div className="post-actions">
                                <p className="text-secondary">
                                    <i class="far fa-comment" />{post.comments.length}
                                    <i class="fas fa-retweet" />0
                                    <i class="far fa-heart" />{post.likes.length}
                                </p>
                            </div>
                        </li>
                    )
                }) : <h3 style={{ marginTop: '50px' }}>{profile.first_name} não tem posts</h3>}
            </div>
        </>
    )
}