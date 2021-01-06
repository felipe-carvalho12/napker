import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { SERVER_URL } from '../config/settings'
import { csrftoken } from '../config/utils'

export default function PostListItem(props) {
    const post = props.post
    const myProfile = props.myProfile
    const type = props.type === undefined ? 'post' : props.type
    const renderParent = props.renderParent
    const displayingComments = props.displayingComments
    const showHideComments = props.showHideComments
    const showHideForm = props.showHideForm

    const history = useHistory()
    const isLink = props.isLink !== undefined ? props.isLink : true

    const likeUnlikePost = e => {
        e.stopPropagation()
        const likeBtn = e.target
        if (likeBtn.classList.contains('fas')) {
            likeBtn.classList.remove('fas') //border heart
            likeBtn.classList.add('far')  //filled heart
            fetch(`${SERVER_URL}/post-api/unlike-${type}/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    renderParent !== undefined && renderParent()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            likeBtn.classList.add('animated')
            likeBtn.onanimationend = () => {
                likeBtn.classList.remove('animated')
            }
            fetch(`${SERVER_URL}/post-api/like-${type}/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    renderParent !== undefined && renderParent()
                })
        }
    }

    const openCloseExtraOptions = (e, postId) => {
        e.stopPropagation()
        const el = document.querySelector(`#post-view-more-select-${postId}`)
        const style = el.style
        if (!style.display) style.display = 'none'
        if (style.display === 'none') {
            style.display = 'flex'
        } else {
            style.display = 'none'
        }
    }

    const deletePost = (e, postId) => {
        e.stopPropagation()
        const el = document.querySelector(`#profile-post-${postId}`)
        if (window.confirm(`Tem certeza que deseja apagar o ${type === 'post' ? type : 'comentário'}?\nEssa ação é irreversível.`)) {
            fetch(`${SERVER_URL}/post-api/delete-${type}/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    renderParent !== undefined && renderParent()
                })
        }
    }

    return (
        <li
            className="d-flex w-100 base-hover hide-animation box"
            id={`profile-post-${post.id}`}
            key={post.id}
            style={{ ...props.style, background: 'var(--theme-base-color)'}}
            onClick={() => isLink && history.push(`/post/${post.id}`)}
        >
            <div className="d-flex flex-column h-100 w-100" style={{ marginRight: '10px' }}>
                <div className="d-flex justify-content-between align-items-start w-100 mb-2">
                    <div className="d-flex align-items-center">
                        <Link
                            to={post.author.id === myProfile.id ?
                                '/perfil' : `/user/${post.author.slug}`}
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={post.author.photo}
                                className="profile-img-sm mr-2"
                            />
                        </Link>
                        <Link
                            to={post.author.id === myProfile.id ? '/perfil' : `/user/${post.author.slug}`}
                            className="d-flex justify-content-start align-items-start post-author-data-wrapper"
                            style={{ color: '#000' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <strong className="mr-2" style={{ color: 'var(--primary-grey)' }}>
                                {post.author.first_name} {post.author.last_name}
                            </strong>
                            <span className="text-secondary">
                                @{post.author.user.username} • {post.created.split('-').reverse().join('/')}
                            </span>
                        </Link>
                    </div>
                    <i
                        className="fas fa-ellipsis-h d-flex justify-content-center align-items-center text-secondary secondary-hover view-more-icon"
                        id={`post-view-more-icon-${post.id}`}
                        style={{ textDecoration: 'none', width: '30px', height: '30px', borderRadius: '30px' }}
                        onClick={e => openCloseExtraOptions(e, post.id)}
                    />
                </div>
                <div className="d-flex flex-column position-relative">
                    <div className="view-more-select" id={`post-view-more-select-${post.id}`} style={{ right: '0%' }}>
                        {myProfile.id === post.author.id ?
                            <li
                                style={{ color: '#f00' }}
                                onClick={e => deletePost(e, post.id)}
                            >
                                <i class="fas fa-trash" />
                                Excluir
                            </li>
                            :
                            <>
                                <li onClick={e => {e.stopPropagation(); window.alert('Ainda estamos desenvolvendo essa funcionalidade... (:')}}>
                                    <i class="fas fa-exclamation-triangle text-secondary" />
                                    Denunciar fake news
                                </li>
                                <li onClick={e => {e.stopPropagation(); window.alert('Ainda estamos desenvolvendo essa funcionalidade... (:')}}>
                                    <i class="fas fa-exclamation-circle text-secondary" />
                                    Denunciar conteúdo impróprio
                                </li>
                            </>
                        }
                        <div className="popover-arrow" style={{ top: '-9px', right: '8%' }} />
                    </div>
                    <div className="d-flex justify-content-start word-break">
                        {post.content}
                    </div>
                    {post.image &&
                        <div className="d-flex justify-content-start w-100">
                            <img src={post.image} className="post-img" />
                        </div>
                    }
                    <div className="d-flex justify-content-start align-items-center text-secondary">
                        {(type === 'comment' && post.all_child_comments_length !== 0) &&
                            <>
                                {displayingComments ?
                                    <i
                                        className="material-icons-sharp icon base-hover text-secondary"
                                        style={{ width: '25px', height: '25px' }}
                                        onClick={showHideComments}
                                    >
                                    keyboard_arrow_down</i>
                                    :
                                    <i
                                        className="material-icons-sharp icon base-hover text-secondary"
                                        style={{ width: '25px', height: '25px' }}
                                        onClick={showHideComments}
                                    >
                                    keyboard_arrow_right</i>
                                }
                            </>
                        }
                        <div
                            className="d-flex align-items-center text-secondary"
                            style={{ outline: 'none', textDecoration: 'none' }}
                            onClick={showHideForm && showHideForm}
                        >
                            <i
                                class="far fa-comment mr-1 icon"
                            />
                            <p style={{ margin: '0' }}>
                                {post.all_child_comments_length}
                            </p>
                        </div>
                        <div className="d-flex align-items-center">
                            {post.likes.map(like => like.profile.id).includes(myProfile.id) ?
                                <i class="fas fa-heart expand-animation mr-1  ml-2 icon"
                                    data-postid={post.id}
                                    onClick={likeUnlikePost}
                                />
                                :
                                <i class="far fa-heart mr-1 ml-2 icon"
                                    data-postid={post.id}
                                    onClick={likeUnlikePost}
                                />
                            }
                            <p className="m-0 likes-number"
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