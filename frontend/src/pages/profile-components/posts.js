import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import LikesModal from '../../components/likesmodal'
import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

export default function Posts(props) {
    const [myprofile, setMyProfile] = useState(null)
    const [likesModal, setLikesModal] = useState({ isOpen: false, likes: null })
    const profile = props.profile

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
    }, [])

    const likeUnlikePost = e => {
        e.stopPropagation()
        const likeBtn = e.target
        if (likeBtn.classList.contains('fas')) {
            likeBtn.classList.remove('fas') //border heart
            likeBtn.classList.add('far')  //filled heart
            fetch(`${SERVER_URL}/post-api/unlike-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.fetchProfile()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            fetch(`${SERVER_URL}/post-api/like-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.fetchProfile()
                })
        }
    }

    const hideLikesModal = () => {
        setLikesModal({
            isOpen: false,
            likes: null
        })
    }

    const deletePost = (e, postId) => {
        e.stopPropagation()
        const el = document.querySelector(`#profile-post-${postId}`)
        if (window.confirm('Tem certeza que deseja apagar o post?\nEssa ação é irreversível.')) {
            el.style.animationPlayState = 'running'
            el.addEventListener('animationend', () => {
                props.fetchProfile()
            })
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
                })
        }
    }


    return (
        <>
            <LikesModal
                isOpen={likesModal.isOpen}
                likes={likesModal.likes}
                hideModal={hideLikesModal}
            />
            <div className="post-list">
                {profile && myprofile ?
                    <>
                        {profile.posts.length ? profile.posts.map(post => {
                            return (
                                <li
                                    className="post-container post-list-item"
                                    key={post.id}
                                    id={`profile-post-${post.id}`}
                                    onClick={() => window.location.href = `/post/${post.id}`}
                                >
                                    <div className="d-flex justify-content-between">
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
                                        {profile.id == myprofile.id &&
                                            <i
                                                className="far fa-trash-alt trash-icon text-secondary"
                                                style={{ margin: '20px 20px 0 0' }}
                                                onClick={e => deletePost(e, post.id)}
                                            />}
                                    </div>
                                    <div className="post-actions">
                                        <p className="text-secondary">
                                            <Link
                                                to={`/post/${post.id}/comment`}
                                                className="text-secondary"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <i class="far fa-comment" />
                                            </Link>{post.comments.length}
                                            {post.likes.map(like => like.profile.id).includes(myprofile.id) ?
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
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    setLikesModal({ isOpen: true, likes: post.likes })
                                                }
                                                }
                                            >
                                                {post.likes.length}
                                            </p>
                                        </p>
                                    </div>
                                </li>
                            )
                        }) :
                            <div className="no-posts-container">
                                <h3 style={{ marginTop: '50px' }}>{profile.first_name} não tem posts</h3>
                            </div>
                        }
                    </>
                    :
                    <div className="posts-loader-container" >
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}