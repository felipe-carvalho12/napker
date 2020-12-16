import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../config/settings'
import { csrftoken } from '../config/utils'

export default function PostListItem(props) {
    const post = props.post
    const myProfile = props.myProfile

    const deletePost = (e, postId) => {
        e.stopPropagation()
        const el = document.querySelector(`#profile-post-${postId}`)
        if (window.confirm('Tem certeza que deseja apagar o post?\nEssa ação é irreversível.')) {
            el.style.animationPlayState = 'running'
            el.addEventListener('animationend', () => {
                this.fetchPosts()
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
                    props.renderParent()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            fetch(`${SERVER_URL}/post-api/like-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.renderParent()
                })
        }
    }

    return (
        <li
            className="d-flex w-100 white-hover" style={{ padding: '5px 15px', background: '#fff', borderBottom: '1px solid var(--border-color)' }}
            id={`profile-post-${post.id}`}
            key={post.id}
            onClick={() => window.location.href = `/post/${post.id}`}
        >
            <div className="d-flex flex-column h-100" style={{ marginRight: '10px' }}>
                <Link
                    to={post.author.id === myProfile.id ?
                        '/perfil' : `/user/${post.author.slug}`}
                    onClick={e => e.stopPropagation()}
                >
                    <img src={`${SERVER_URL}${post.author.photo}`}
                        className="profile-img-sm"
                    />
                </Link>
            </div>
            <div className="d-flex flex-column h-100 w-100" style={{ marginRight: '10px' }}>
                <div className="d-flex justify-content-between w-100">
                    <div>
                        <Link
                            to={post.author.id === myProfile.id ?
                                '/perfil' : `/user/${post.author.slug}`}
                            style={{ color: '#000' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <strong className="mr-2">
                                {post.author.first_name} {post.author.last_name}
                            </strong>
                            <p className="text-secondary d-inline-block">
                                @{post.author.user.username} • {post.created.split('-').reverse().join('/')}
                            </p>
                        </Link>
                    </div>
                    <i
                        className="fas fa-ellipsis-h d-flex justify-content-center align-items-center text-secondary secondary-hover"
                        style={{ textDecoration: 'none', width: '30px', height: '30px', borderRadius: '30px' }}
                        onClick={e => deletePost(e, post.id)}
                    />
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-start word-break">
                        {post.content}
                    </div>
                    {post.image &&
                        <div className="d-flex justify-content-start w-100">
                            <img src={`${SERVER_URL}${post.image}`} className="post-img" />
                        </div>
                    }
                    <div className="d-flex justify-content-start align-items-start text-secondary w-20 mt-2 mb-1">
                        <Link
                            to={`/post/${post.id}/comentar`}
                            className="text-secondary"
                            onClick={e => e.stopPropagation()}
                        >
                            <i
                                class="far fa-comment mr-2"
                            />{post.comments.length}
                        </Link>
                        <div className="d-flex align-items-center">
                            {post.likes.map(like => like.profile.id).includes(myProfile.id) ?
                                <i class="fas fa-heart mr-2  ml-3"
                                    data-postid={post.id}
                                    style={{ color: '#E0245E' }}
                                    onClick={likeUnlikePost}
                                />
                                :
                                <i class="far fa-heart mr-2 ml-3"
                                    data-postid={post.id}
                                    onClick={likeUnlikePost}
                                    style={{ color: '#E0245E' }}
                                />
                            }
                            <p className="post-likes-number"
                                style={{ margin: '0' }}
                                onClick={e => {
                                    e.stopPropagation()
                                    props.openLikesModal(post.likes)
                                }
                                }
                            >
                                {post.likes.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li >
    )
}