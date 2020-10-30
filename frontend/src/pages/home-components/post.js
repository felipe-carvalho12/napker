import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import LikesModal from '../../components/likesmodal'
import Header from '../../components/header'
import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

export default function Post() {
    const [post, setPost] = useState(null)
    const [profile, setProfile] = useState(null)
    const [likesModal, setLikesModal] = useState({isOpen: false, likes: null})

    const { id } = useParams()

    useEffect(() => {
        fetchPost()
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setProfile(data))
    }, [])

    const fetchPost = () => {
        fetch(`${SERVER_URL}/post-api/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
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
                    fetchPost()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            fetch(`${SERVER_URL}/post-api/like-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetchPost()
                })
        }
    }

    const likeUnlikeComment = e => {
        const likeBtn = e.target
        if (likeBtn.classList.contains('fas')) {
            likeBtn.classList.remove('fas') //border heart
            likeBtn.classList.add('far')  //filled heart
            fetch(`${SERVER_URL}/post-api/unlike-comment/${likeBtn.dataset.commentid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetchPost()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            fetch(`${SERVER_URL}/post-api/like-comment/${likeBtn.dataset.commentid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetchPost()
                })
        }
    }

    const hideLikesModal = () => {
        setLikesModal({
            isOpen: false,
            likes: null
        })
    }

    return (
        <>
            <LikesModal
                isOpen={likesModal.isOpen}
                likes={likesModal.likes}
                hideModal={hideLikesModal}
            />
            <Header page="Post" backArrow={true} />
            <div className="content">
                {post && profile &&
                    <>
                        <div className="post-container">
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
                                    <div style={{ textAlign: 'start', fontSize: 'larger' }}>
                                        {post.content}
                                    </div>
                                    {post.image &&
                                        <img src={`${SERVER_URL}${post.image}`} className="post-img" />
                                    }
                                </div>
                            </div>
                            <div className="post-actions">
                                <p className="text-secondary" style={{ fontSize: 'large' }}>
                                    <i class="far fa-comment" />{post.comments.length}
                                    {post.likes.map(like => like.profile.id).includes(profile.id) ?
                                        <i class="fas fa-heart"
                                            data-postid={post.id}
                                            onClick={likeUnlikePost}
                                        />
                                        :
                                        <i class="far fa-heart"
                                            data-postid={post.id}
                                            onClick={likeUnlikePost}
                                        />}
                                    <p className="post-likes-number"
                                        onClick={() => setLikesModal({isOpen: true, likes: post.likes})}
                                    >
                                        {post.likes.length}
                                    </p>
                                </p>
                            </div>
                        </div>
                        <div className="comment-list">
                            {post.comments.map(comment => {
                                return (
                                    <li className="post-container">
                                        <div className="post-row">
                                            <div className="post-col">
                                                <Link to={`/user/${comment.author.slug}`}>
                                                    <img src={`${SERVER_URL}${comment.author.photo}`}
                                                        className="profile-img-med"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="post-col">
                                                <Link to={`/user/${comment.author.slug}`} style={{ color: '#000' }}>
                                                    <div style={{ height: '30px' }}>
                                                        <strong>{post.author.first_name} {post.author.last_name} </strong>
                                                        <p className="text-secondary d-inline-block">
                                                            @{comment.author.user.username} • {comment.created.split('-').reverse().join('/')}
                                                        </p>
                                                    </div>
                                                </Link>
                                                <div style={{ textAlign: 'start' }}>
                                                    {comment.content}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-actions">
                                            <p className="text-secondary">
                                                {comment.likes.map(like => like.profile.id).includes(profile.id) ?
                                                    <i class="fas fa-heart"
                                                        data-commentid={comment.id}
                                                        onClick={likeUnlikeComment}
                                                    />
                                                    :
                                                    <i class="far fa-heart"
                                                        data-commentid={comment.id}
                                                        onClick={likeUnlikeComment}
                                                    />}
                                                <p className="post-likes-number">
                                                    {comment.likes.length}
                                                </p>
                                            </p>
                                        </div>
                                    </li>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </>
    )
}