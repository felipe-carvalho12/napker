import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EmojiPicker from '../../../../../../components/emojiPicker'

import { SERVER_URL } from '../../../../../../config/settings'
import { csrftoken } from '../../../../../../config/utils'

export default function PostForm(props) {
    const myProfile = props.myProfile
    const usePosts = props.usePosts || (() => [null, null])
    const type = props.type === undefined ? 'post' : props.type
    const postId = props.postId
    const parentComment = props.parentComment
    const hideForm = props.hideForm

    const isMobile = visualViewport.width <= 980

    const [posts, setPosts] = usePosts()
    const renderParent = props.renderParent
    const [errMessage, setErrMessage] = useState(null)

    const [hashtags, setHashtags] = useState([])
    const [taggedUsernames, setTaggedUsernames] = useState([])

    const [postContent, setPostContent] = useState('')
    const [postFormImagePreview, setPostFormImagePreview] = useState('')

    const handlePostContentChange = e => {
        setPostContent(e.target.value)
        const el = document.querySelector('#post-form-submit-btn')
        el.disabled = e.target.value.trim() === '' && !postFormImagePreview
    }

    const handlePostImageChange = e => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPostFormImagePreview(reader.result)
                document.querySelector('#post-img-container').style.display = 'initial'
                document.querySelector('#post-form-submit-btn').disabled = false
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch {

        }
    }

    const handleCloseImage = () => {
        document.querySelector('#post-img-container').style.display = 'none'
        document.querySelector('#post-image').value = ''
        if (postContent.trim() === '') document.querySelector('#post-form-submit-btn').disabled = true
        setPostFormImagePreview(null)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const postImage = postFormImagePreview
        setPostContent('')
        setPostFormImagePreview('')
        document.querySelector('.create-post-form textarea').rows = 3

        fetch(`${SERVER_URL}/post-api/create-${type === 'post' ? type : 'comment'}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'content': postContent,
                'post-id': postId || '',
                'parent-comment-id': parentComment ? parentComment.id : '',
                'type': type,
                'post-image': postImage,
                'hashtags': hashtags,
                'tagged-usernames': taggedUsernames

            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setErrMessage(data.message)
                } else {
                    hideForm && hideForm()
                    posts ?
                        setPosts([data, ...posts])
                        :
                        renderParent()
                }
            })
    }

    return (
        <form
            className="create-post-form"
            onSubmit={handleSubmit}
        >
            {errMessage !== null &&
                <div className="w-100 mt-1">
                    <span className="word-break" style={{ color: '#f00' }}>{errMessage}</span>
                </div>
            }
            <div className="d-flex">
                <Link to="/perfil">
                    <img
                        src={myProfile.photo}
                        className="profile-img-sm"
                    />
                </Link>
                <textarea
                    className='w-100 border-0 autoExpand'
                    rows='3'
                    data-min-rows='3'
                    value={postContent}
                    placeholder={parentComment ? `Responder ${parentComment.author.first_name}` : "O que passa pela sua cabeça?"}
                    maxLength={500}
                    autoFocus
                    style={{ color: 'var(--primary-grey)', background: 'var(--theme-base-color)', padding: '10px', paddingBottom: '0', outline: 'none' }}
                    onChange={handlePostContentChange}
                />
            </div>
            {postFormImagePreview !== '' &&
                <div className="w-100 d-flex justify-content-center">
                    <div
                        className="post-img-container"
                        id="post-img-container">
                        <div
                            className="post-img-options"
                        >
                            <i
                                className="far fa-times-circle"
                                onClick={handleCloseImage}
                            />
                        </div>
                        <img
                            src={postFormImagePreview}
                            className="post-img mt-0"
                            id="post-form-img-preview"
                        />
                    </div>
                </div>
            }
            <hr />
            <div className="d-flex justify-content-between" style={{ margin: '0px 70px 0 70px' }}>
                <div className="post-extra-options">
                    {type === 'post' &&
                        <>
                            <label htmlFor="post-image" class="far fa-image" />
                            <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                id="post-image"
                                style={{ display: 'none' }}
                                onChange={handlePostImageChange}
                            />
                        </>
                    }
                    {!isMobile &&
                        <EmojiPicker />
                    }
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    id="post-form-submit-btn"
                    style={{ height: '40px' }}
                    disabled
                >
                    {type === 'post' ?
                        'Postar'
                        :
                        'Comentar'
                    }
                </button>
            </div>
        </form>
    )
}