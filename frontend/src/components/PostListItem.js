import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { SERVER_URL, DEBUG } from '../config/settings'
import { csrftoken, renderTimestamp } from '../config/utils'
import VideoIframe from './VideoIframe'
import PostTextbox from '../pages/main-app/home/components/posts_/components/components/post-textbox/PostTextbox'

export default function PostListItem(props) {
    const post = props.post
    const myProfile = props.myProfile
    const type = props.type === undefined ? 'post' : props.type
    const renderParent = props.renderParent
    const displayingComments = props.displayingComments
    const showHideComments = props.showHideComments
    const showHideForm = props.showHideForm
    const color = props.level

    const videoWidth = props.videoWidth
    const videoHeigth = props.videoHeigth

    const history = useHistory()
    const isLink = props.isLink !== undefined ? props.isLink : true

    const parsedContent = JSON.parse(post.content)

    const likeUnlikePublication = e => {
        e.stopPropagation()
        const likeBtn = e.target
        if (likeBtn.classList.contains('fas')) {
            likeBtn.classList.remove('fas') //border heart
            likeBtn.classList.add('far')  //filled heart
            fetch(`${SERVER_URL}/post-api/unlike-publication/${likeBtn.dataset.publicationid}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            })
                .then(response => response.json())
                .then(data => {
                    DEBUG && console.log(data)
                    renderParent !== undefined && renderParent()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            likeBtn.classList.add('animated')
            likeBtn.onanimationend = () => {
                likeBtn.classList.remove('animated')
            }
            fetch(`${SERVER_URL}/post-api/like-publication/${likeBtn.dataset.publicationid}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            })
                .then(response => response.json())
                .then(data => {
                    DEBUG && console.log(data)
                    renderParent !== undefined && renderParent()
                })
        }
    }

    const openCloseExtraOptions = (e, publicationId) => {
        e.stopPropagation()
        const el = document.querySelector(`#post-view-more-select-${publicationId}`)
        const style = el.style
        if (!style.display) style.display = 'none'
        if (style.display === 'none') {
            style.display = 'flex'
        } else {
            style.display = 'none'
        }
    }

    const deletePost = (e, publicationId) => {
        e.stopPropagation()
        if (window.confirm(`Tem certeza que deseja apagar o ${type === 'post' ? type : 'comentário'}?\nEssa ação é irreversível.`)) {
            fetch(`${SERVER_URL}/post-api/delete-publication/${publicationId}`, {
                method: 'DELETE',
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

    const handleViewLikes = e => {
        e.stopPropagation()
        props.openLikesModal()
        fetch(`${SERVER_URL}/post-api/likes/${post.id}`)
        .then(response => response.data)
        .then(data => props.setLikesModalItems(data))
    }

    return (
        <li
            className={`position-relative d-flex w-100 base-hover hide-animation box-med post-container ${props.className}`}
            id={`profile-post-${post.id}`}
            key={post.id}
            style={{ ...props.style, background: 'var(--theme-base-color)', marginBottom: type === 'comment' && '10px', padding: "0" }}
            onClick={() => isLink && history.push(`/post/${post.id}`)}
        >
            {type !== 'post' &&
                <div style={{ marginLeft: "10px", width: "5px", background: color !== undefined ? color : "var(--background)" }} />
            }
            <div className="d-flex flex-column h-100 w-100">
                <div className="d-flex flex-column h-100 w-100" style={{ padding: "var(--sz-1) var(--sz-1) 0" }}>
                    <div className="d-flex justify-content-between align-items-start w-100 mb-10px">
                        <div className="d-flex align-items-center">
                            <Link
                                to={post.details.author.id === myProfile.id ?
                                    '/perfil' : `/user/${post.details.author.user.username}`}
                                onClick={e => e.stopPropagation()}
                            >
                                <img src={post.details.author.photo}
                                    className="profile-img-sm mr-10px"
                                />
                            </Link>
                            <Link
                                to={post.details.author.id === myProfile.id ? '/perfil' : `/user/${post.details.author.user.username}`}
                                className="d-flex justify-content-start align-items-start post-author-data-wrapper"
                                style={{ color: '#000', flexDirection: props.breakAuthorData && 'column' }}
                                onClick={e => e.stopPropagation()}
                            >
                                <strong className="mr-10px" style={{ color: 'var(--primary-grey)' }}>
                                    {post.details.author.first_name} {post.details.author.last_name}
                                </strong>
                                <span className="text-secondary">
                                    @{post.details.author.user.username} • {renderTimestamp(post.details.created)}
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
                    <div className="view-more-select" id={`post-view-more-select-${post.id}`} style={{ right: '10px', top: '45px' }}>
                        {myProfile.id === post.details.author.id ?
                            <li
                                style={{ color: '#f00' }}
                                onClick={e => deletePost(e, post.id)}
                            >
                                <i class="fas fa-trash" />
                                Excluir
                            </li>
                            :
                            <>
                                <li onClick={e => { e.stopPropagation(); window.alert('Ainda estamos desenvolvendo essa funcionalidade... (:') }}>
                                    <i class="fas fa-exclamation-triangle text-secondary" />
                                    Denunciar fake news
                                </li>
                                <li onClick={e => { e.stopPropagation(); window.alert('Ainda estamos desenvolvendo essa funcionalidade... (:') }}>
                                    <i class="fas fa-exclamation-circle text-secondary" />
                                    Denunciar conteúdo impróprio
                                </li>
                            </>
                        }
                        <div className="popover-arrow" style={{ top: '-9px', right: '8%' }} />
                    </div>
                    {parsedContent.blocks.map(block => block.text).join('') !== '' &&
                        <div className="d-flex justify-content-start word-break mb-10px">
                            <PostTextbox
                                editable={false}
                                postContent={parsedContent}
                            />
                        </div>
                    }
                </div>
                <div className={`d-flex justify-content-center w-100 post-img-background ${(post.video || post.image) && "my-2"}`} style={{ background: 'var(--img-background)' }}>
                    {post.image &&
                        <img src={post.image} className="post-img m-0 border-0" style={{ borderRadius: "0" }} />
                    }
                    {post.video &&
                        <VideoIframe src={post.video} width={videoWidth} height={videoHeigth} />
                    }
                </div>
                <div className="d-flex justify-content-start align-items-center text-secondary" style={{ padding: "0 10px 10px" }}>
                    {(type === 'comment' && post.details.comments_length !== 0) &&
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
                            {post.details.comments_length}
                        </p>
                    </div>
                    <div className="d-flex align-items-center">
                        {post.details.likes_profile_id.includes(myProfile.id) ?
                            <i class="fas fa-heart expand-animation mr-1  ml-10px icon"
                                data-publicationid={post.details.id}
                                onClick={likeUnlikePublication}
                            />
                            :
                            <i class="far fa-heart mr-1 ml-10px icon"
                                data-publicationid={post.details.id}
                                onClick={likeUnlikePublication}
                            />
                        }
                        <p className="m-0 likes-number"
                            onClick={handleViewLikes}
                        >
                            {post.details.likes_profile_id.length}
                        </p>
                    </div>
                </div>
            </div>
        </li >
    )
}