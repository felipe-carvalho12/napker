import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../../../config/settings'
import { csrftoken } from '../../../../../../config/utils'
import CommentModal from '../../../../../../components/CommentModal'
import LikesModal from '../../../../../../components/LikesModal'
import Header from '../../../../../../components/fixed/Header'
import CommentListItem from './components/CommentListItem'

export default function Post(props) {
    const [post, setPost] = useState(null)
    const [myProfile, setMyProfile] = useState(null)
    const [commentModalIsOpen, setCommentModalIsOpen] = useState(props.commentModalIsOpen)
    const [postLikesModal, setPostLikesModal] = useState({ isOpen: false, likes: null })
    const [commentLikesModal, setCommentLikesModal] = useState({ isOpen: false, likes: null })

    const { id } = useParams()

    useEffect(() => {
        fetchPost()
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
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

    const deletePost = (e, postId) => {
        e.stopPropagation()
        const el = document.querySelector(`#profile-post-${postId}`)
        if (window.confirm('Tem certeza que deseja apagar o post?\nEssa ação é irreversível.')) {
            fetch(`${SERVER_URL}/post-api/delete-post/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    window.location.href = '/'
                })
        }
    }

    const hideCommentModal = () => {
        setCommentModalIsOpen(false)
    }

    const hidePostLikesModal = () => {
        setPostLikesModal({
            isOpen: false,
            likes: null
        })
    }

    const hideCommentLikesModal = () => {
        setCommentLikesModal({
            isOpen: false,
            likes: null
        })
    }

    return (
        <div className="post-page-container">
            {post &&
                <CommentModal
                    isOpen={commentModalIsOpen}
                    hideModal={hideCommentModal}
                    post={post}
                />
            }
            <LikesModal
                isOpen={postLikesModal.isOpen}
                likes={postLikesModal.likes}
                hideModal={hidePostLikesModal}
            />
            <LikesModal
                isOpen={commentLikesModal.isOpen}
                likes={commentLikesModal.likes}
                hideModal={hideCommentLikesModal}
            />
            <Header page="Post" backArrow={true} />
            <div className="content">
                {post && myProfile ?
                    <>
                        <div className="post-container">
                            <div className="d-flex justify-content-between">
                                <div className="post-row">
                                    <div className="post-col">
                                        <Link to={post.author.id === myProfile.id ?
                                            '/perfil' : `/user/${post.author.slug}`}
                                        >
                                            <img src={`${SERVER_URL}${post.author.photo}`}
                                                className="profile-img-med"
                                            />
                                        </Link>
                                    </div>
                                    <div className="post-col">
                                        <Link to={post.author.id === myProfile.id ?
                                            '/perfil' : `/user/${post.author.slug}`}
                                            style={{ color: '#000' }}
                                        >
                                            <div style={{ textAlign: 'start' }}>
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
                                {myProfile.id == post.author.id &&
                                    <i
                                        className="far fa-trash-alt trash-icon text-secondary"
                                        style={{ margin: '20px 20px 0 0' }}
                                        onClick={e => deletePost(e, post.id)}
                                    />
                                }
                            </div>
                            <div className="post-actions">
                                <p className="text-secondary" style={{ fontSize: 'large' }}>
                                    <Link to={`/post/${id}/comentar`} className="text-secondary">
                                        <i
                                            class="far fa-comment"
                                            onClick={() => setCommentModalIsOpen(true)}
                                        />
                                    </Link>{post.comments.length}
                                    {post.likes.map(like => like.profile.id).includes(myProfile.id) ?
                                        <i class="fas fa-heart"
                                            data-postid={post.id}
                                            onClick={likeUnlikePost}
                                        />
                                        :
                                        <i class="far fa-heart"
                                            data-postid={post.id}
                                            onClick={likeUnlikePost}
                                        />
                                    }
                                    <p className="post-likes-number"
                                        onClick={() => setPostLikesModal({ isOpen: true, likes: post.likes })}
                                    >
                                        {post.likes.length}
                                    </p>
                                </p>
                            </div>
                        </div>
                        <div className="comment-list">
                            {post.comments.map(comment => {
                                return (
                                    <CommentListItem
                                        comment={comment}
                                        myProfile={myProfile}
                                        fetchPost={fetchPost}
                                        setPostLikesModal={setPostLikesModal}
                                    />
                                )
                            })
                            }
                        </div>
                    </> :
                    <div className="posts-loader-container" >
                        <div className="loader" />
                    </div>
                }
            </div>
        </div>
    )
}