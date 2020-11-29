import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../../../../../config/settings'
import { csrftoken } from '../../../../../../../config/utils'

export default function CommentListItem(props) {
    const comment = props.comment
    const myProfile = props.myProfile
    const fetchPost = props.fetchPost
    const setPostLikesModal = props.setPostLikesModal

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

    const deleteComment = (e, commentId) => {
        e.stopPropagation()
        const el = document.querySelector(`#post-comment-${commentId}`)
        if (window.confirm('Tem certeza que deseja apagar o comentário?\nEssa ação é irreversível.')) {
            el.style.animationPlayState = 'running'
            console.log(el, el.style.animationPlayState)
            el.addEventListener('animationend', () => {
                fetchPost()
            })
            fetch(`${SERVER_URL}/post-api/delete-comment/${commentId}`, {
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
        <li
            className="post-container"
            id={`post-comment-${comment.id}`}
            key={comment.id}
        >
            <div className="d-flex justify-content-between">
                <div className="post-row">
                    <div className="post-col">
                        <Link to={comment.author.id === myProfile.id ?
                            '/perfil' : `/user/${comment.author.slug}`}
                        >
                            <img src={`${SERVER_URL}${comment.author.photo}`}
                                className="profile-img-sm"
                            />
                        </Link>
                    </div>
                    <div className="post-col">
                        <Link to={comment.author.id === myProfile.id ?
                            '/perfil' : `/user/${comment.author.slug}`}
                            style={{ color: '#000' }}
                        >
                            <div style={{ textAlign: 'start' }}>
                                <strong style={{ marginRight: '5px' }}>
                                    {comment.author.first_name} {comment.author.last_name}
                                </strong>
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
                {comment.author.id == myProfile.id &&
                    <i
                        className="far fa-trash-alt trash-icon text-secondary"
                        style={{ margin: '20px 20px 0 0' }}
                        onClick={e => deleteComment(e, comment.id)}
                    />
                }
            </div>
            <div className="post-actions" style={{ padding: '0 0 2px 63px' }}>
                <p className="text-secondary">
                    {comment.likes.map(like => like.profile.id).includes(myProfile.id) ?
                        <i class="fas fa-heart"
                            data-commentid={comment.id}
                            onClick={likeUnlikeComment}
                        />
                        :
                        <i class="far fa-heart"
                            data-commentid={comment.id}
                            onClick={likeUnlikeComment}
                        />
                    }
                    <p
                        className="post-likes-number"
                        onClick={() => setPostLikesModal({ isOpen: true, likes: comment.likes })}
                    >
                        {comment.likes.length}
                    </p>
                </p>
            </div>
        </li>
    )
}