import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

export default function Posts() {
    const [posts, setPosts] = useState(null)
    const [postContent, setPostContent] = useState('')

    useEffect(() => {
        fetch(`${SERVER_URL}/post-api/post-list`)
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [])

    const createPost = () => {
        fetch(`${SERVER_URL}/post-api/create-post`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ content: postContent })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPostContent('')
            })
    }

    return (
        <>
            <div className="form-row d-inline-block">
                <div className="col d-flex">
                    <input type="text"
                        className="form-control"
                        placeholder="O que está acontecendo?"
                        style={{ marginRight: '5px', width: '400px' }}
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                    />
                    <button className="btn btn-primary" style={{ marginBottom: '20px', borderRadius: '5px' }} onClick={createPost}>Postar</button>
                </div>
            </div>
            <div className="post-list">
                {posts && posts.map(post => {
                    return (
                        <li className="post-container" key={post.id}>
                            <div className="post-row">
                                <div className="post-col">
                                    <Link to={`/user/${post.author.slug}`}>
                                        <img src={`${SERVER_URL}${post.author.photo}`}
                                            className="profile-img-med"
                                        />
                                    </Link>
                                </div>
                                <div className="post-col">
                                    <Link to={`/user/${post.author.slug}`} style={{ color: '#000' }}>
                                        <div style={{ height: '30px' }}>
                                            <strong>{post.author.first_name} {post.author.last_name} </strong>
                                            <p className="text-secondary d-inline-block">
                                                @{post.author.user.username} • {post.created.split('-').reverse().join('/')}
                                            </p>
                                        </div>
                                    </Link>
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
                })}
            </div>
        </>
    )
}