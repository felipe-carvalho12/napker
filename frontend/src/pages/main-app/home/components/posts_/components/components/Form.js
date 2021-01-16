import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import PostTextbox from './post-textbox/PostTextbox'
import VideoIframe from '../../../../../../../components/VideoIframe'

import { SERVER_URL } from '../../../../../../../config/settings'
import { csrftoken } from '../../../../../../../config/utils'


export default function PostForm(props) {
    const advanced = props.advanced
    const myProfile = props.myProfile
    const usePosts = props.usePosts || (() => [null, null])
    const type = props.type === undefined ? 'post' : props.type
    const postId = props.postId
    const parentComment = props.parentComment
    const hideForm = props.hideForm
    const color = props.level

    const isMobile = visualViewport.width <= 980
    const setMobilePostButton = props.setMobilePostButton

    const [posts, setPosts] = usePosts()
    const renderParent = props.renderParent
    const [errMessage, setErrMessage] = useState(null)

    const [taggedUsernames, setTaggedUsernames] = useState([])

    const [postContent, setPostContent] = useState('')
    const [contentLength, setContentLength] = useState(0)
    const [postFormImagePreview, setPostFormImagePreview] = useState('')
    const [videoUrl, setVideoUrl] = useState('')

    const [emojiSelector, setEmojiSelector] = useState(null)
    const [toolbar, setToolbar] = useState(null)

    useEffect(() => {
        isMobile && setMobilePostButton && setMobilePostButton((
            <button
                type="submit"
                className="btn btn-primary"
                id={`${advanced ? 'advanced' : 'regular'}-post-form-submit-btn`}
                style={{ height: '40px' }}
                disabled
            >
                {type === 'post' ?
                    'Postar'
                    :
                    'Comentar'
                }
            </button>
        ))
        
    }, [])

    useEffect(() => {
        if (postFormImagePreview !== '') {
            setVideoUrl('')
        }
    }, [postFormImagePreview])

    useEffect(() => {
        if (videoUrl === null) {
            setVideoUrl('')
            return
        }
        if (videoUrl) {
            setPostFormImagePreview('')
        }
        const el = document.querySelector(`#${advanced ? 'advanced' : 'regular'}-post-form-submit-btn`)
        if (el) el.disabled = !videoUrl.trim() && !postFormImagePreview && !videoUrl
    }, [videoUrl])

    useEffect(() => {
        const el = document.querySelector(`#${advanced ? 'advanced' : 'regular'}-post-form-submit-btn`)
        if (el) el.disabled = !contentLength && !postFormImagePreview && !videoUrl
    }, [contentLength])

    const handlePostImageChange = e => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPostFormImagePreview(reader.result)
                document.querySelector(`#${advanced ? 'advanced' : 'regular'}-post-img-container`).style.display = 'initial'
                document.querySelector(`#${advanced ? 'advanced' : 'regular'}-post-form-submit-btn`).disabled = false
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch {

        }
    }

    const getEmbedVideoUrl = () => {
        if (!videoUrl) return
        try {
            const videoId = /watch\?v=(.*)/.exec(videoUrl.includes('&') ? videoUrl.split('&')[0] : videoUrl)[1]
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
        } catch {
            setVideoUrl('')
            window.alert('Link inválido')
        }
    }

    const handleCloseImage = () => {
        document.querySelector(`#${advanced ? 'advanced' : 'regular'}-post-img-container`).style.display = 'none'
        document.querySelector(`#${advanced ? 'advanced' : 'regular'}-post-img`).value = ''
        if (!postContent.trim() && !videoUrl.trim())
            setPostFormImagePreview(null)
    }

    const handleCloseVideo = () => {
        setVideoUrl('')
        if (!postContent.trim() && !postFormImagePreview.trim()) document.querySelector(`#${advanced ? 'advanced' : 'regular'}-post-form-submit-btn`).disabled = true
    }

    const handleSubmit = e => {
        e && e.preventDefault()
        const postImage = postFormImagePreview
        setPostContent('')
        setPostFormImagePreview('')
        setVideoUrl('')
        props.setAdvancedModalIsOpen(false)

        document.querySelector(`#${advanced ? 'advanced' : 'regular'}-post-form-submit-btn`).disabled = true

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
                'post-image': postImage || '',
                'post-video': getEmbedVideoUrl() || '',
                'tagged-usernames': taggedUsernames

            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setErrMessage(data.message)
                } else {
                    errMessage && setErrMessage('')
                    hideForm && hideForm()
                    posts ? setPosts([data, ...posts]) : renderParent()
                }
            })
    }

    return (
        <>
            {(advanced && toolbar !== null) &&
                toolbar
            }
            <form
                className={`create-post-form p-0 ${props.className}`}
                style={props.style}
                onSubmit={handleSubmit}
            >
                <div className="d-flex">
                    {color !== undefined &&
                        <div style={{ marginRight: "15px", width: "5px", background: color }} />
                    }
                    <div className="w-100 h-100">
                        {!advanced &&
                            <div className="d-flex justify-content-end mb-1">
                                <i
                                    className="material-icons-outlined m-0 p-0 icon c-primary-color secondary-hover"
                                    style={{ fontSize: '27px' }}
                                    onClick={() => props.setAdvancedModalIsOpen(true)}
                                >
                                    outbound
                                </i>
                            </div>
                        }
                        <div className="d-flex flex-column w-100" style={{ padding: `${advanced ? '20' : '0'}px 0 0` }}>
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
                                <PostTextbox
                                    editable={true}
                                    advanced={advanced}
                                    placeholder={parentComment ? `Responder ${parentComment.author.first_name}` : "O que passa pela sua cabeça?"}
                                    setEmojiSelector={setEmojiSelector}
                                    setToolbar={setToolbar}
                                    setPostContent={setPostContent}
                                    setContentLength={setContentLength}
                                    addTaggedUsernames={taggedUsername => setTaggedUsernames([...taggedUsernames, taggedUsername])}
                                    shouldClearEditor={postContent === ''}
                                    maxLength={500}
                                />
                            </div>
                            {(postFormImagePreview && postFormImagePreview !== '') &&
                                <div className="w-100 d-flex justify-content-center">
                                    <div
                                        className="post-img-container"
                                        id={`${advanced ? 'advanced' : 'regular'}-post-img-container`}>
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
                                            id={`${advanced ? 'advanced' : 'regular'}-post-form-img-preview`}
                                        />
                                    </div>
                                </div>
                            }
                            {(videoUrl && videoUrl !== '') &&
                                <div className="position-relative">
                                    <div
                                        className="post-img-options"
                                    >
                                        <i
                                            className="far fa-times-circle"
                                            onClick={handleCloseVideo}
                                        />
                                    </div>
                                    <VideoIframe src={getEmbedVideoUrl()} />
                                </div>
                            }
                            <div className="d-flex justify-content-between">
                                <div className="post-extra-options">
                                    {type === 'post' &&
                                        <>
                                            <div>
                                                <label htmlFor={`${advanced ? 'advanced' : 'regular'}-post-img`} className="far fa-image m-0 icon c-primary-color secondary-hover" style={{ fontSize: '25px' }} />
                                                <input
                                                    type="file"
                                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                                    id={`${advanced ? 'advanced' : 'regular'}-post-img`}
                                                    style={{ display: 'none' }}
                                                    onChange={handlePostImageChange}
                                                />
                                            </div>
                                            <i
                                                className="material-icons-outlined m-0 icon c-primary-color secondary-hover"
                                                style={{ fontSize: '27px' }}
                                                onClick={() => setVideoUrl(window.prompt('Copie e cole o link de um vídeo do YouTube: '))}
                                            >
                                                slow_motion_video
                                        </i>
                                        </>
                                    }
                                    {(!isMobile && emojiSelector !== null) &&
                                        emojiSelector
                                    }
                                </div>
                                {(!isMobile || type === 'comment') && advanced !== true &&
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        id={`${advanced ? 'advanced' : 'regular'}-post-form-submit-btn`}
                                        style={{ height: '40px' }}
                                        disabled
                                    >
                                        {type === 'post' ?
                                            'Postar'
                                            :
                                            'Comentar'
                                        }
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}