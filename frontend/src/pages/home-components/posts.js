import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

export default function Posts() {
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState(null)
    const [postContent, setPostContent] = useState('')
    const [likesModalIsOpen, setLikesModalIsOpen] = useState(false)
    const [selectedPostLikes, setSelectedPostLikes] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setProfile(data))
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        fetch(`${SERVER_URL}/post-api/post-list`)
            .then(response => response.json())
            .then(data => setPosts(data))
    }

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

    const likeUnlikePost = e => {
        const likeBtn = e.target
        if (likeBtn.classList.contains('fas')) {
            likeBtn.classList.remove('fas') //border heart
            likeBtn.classList.add('far')  //filled heart
            fetch(`${SERVER_URL}/post-api/unlike-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetchPosts()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            fetch(`${SERVER_URL}/post-api/like-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetchPosts()
                })
        }
    }

    const openLikesModal = likes => {
        setSelectedPostLikes(likes)
        setLikesModalIsOpen(true)
    }

    return (
        <>
            <Modal show={likesModalIsOpen}
                onHide={() => setLikesModalIsOpen(false)}
                size="lg">
                <Modal.Header closeButton>
                    <Modal.Title><strong>Likes</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="list-group" style={{ height: '400px', overflow: 'hidden', overflowY: 'scroll' }}>
                        {selectedPostLikes && selectedPostLikes.map(profile => {
                            return (
                                <Link to={`/mensagens/${profile.slug}`}
                                    style={{ color: '#000', textDecoration: 'none' }}
                                    onClick={setLikesModalIsOpen(false)}
                                >
                                    <li className="list-group-item profile-row modal-profile-li" key={profile.id}>
                                        <div className="d-flex justify-content-between">
                                            <div className="profile-col">
                                                <img src={`${SERVER_URL}${profile.photo}`}
                                                    className="profile-img-med"
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <div className="main-profile-data">
                                                    <strong>{profile.first_name} {profile.last_name}</strong>
                                                    <p className="text-secondary">@{profile.user.username}</p>
                                                </div>
                                            </div>
                                            <div className="profile-col">
                                                {profile.bio}
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
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
                {posts && profile && posts.map(post => {
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
                                    {post.likes.map(prof => prof.id).includes(profile.id) ?
                                        <i class="fas fa-heart"
                                            data-postid={post.id}
                                            onClick={likeUnlikePost}
                                        />
                                        :
                                        <i class="far fa-heart"
                                            data-postid={post.id}
                                            onClick={likeUnlikePost}
                                        />}
                                    <p className="d-inline-block"
                                        onClick={() => openLikesModal(post.likes)}
                                    >
                                        {post.likes.length}
                                    </p>
                                </p>
                            </div>
                        </li>
                    )
                })}
            </div>
        </>
    )
}