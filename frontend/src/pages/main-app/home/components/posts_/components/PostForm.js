import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostTextbox from './components/post-textbox/PostTextbox'
import EmojiPicker from '../../../../../../components/EmojiPicker'
import VideoIframe from '../../../../../../components/VideoIframe'

import { SERVER_URL } from '../../../../../../config/settings'
import { csrftoken } from '../../../../../../config/utils'
import AdvancedPostModal from './components/AdvancedPostModal'

export default function PostForm(props) {
    const myProfile = props.myProfile
    const usePosts = props.usePosts || (() => [null, null])
    const type = props.type === undefined ? 'post' : props.type
    const postId = props.postId
    const parentComment = props.parentComment
    const hideForm = props.hideFormconst
    const color = props.level

    const isMobile = visualViewport.width <= 980

    const [posts, setPosts] = usePosts()
    const renderParent = props.renderParent
    const [errMessage, setErrMessage] = useState(null)

    const [hashtags, setHashtags] = useState([])
    const [taggedUsernames, setTaggedUsernames] = useState([])

    const [postContent, setPostContent] = useState('')
    const [postFormImagePreview, setPostFormImagePreview] = useState('')
    const [videoUrl, setVideoUrl] = useState('')

    const [advancedModalIsOpen, setAdvancedModalIsOpen] = useState(false)

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
        const el = document.querySelector('#post-form-submit-btn')
        el.disabled = !videoUrl.trim() && !postFormImagePreview && !videoUrl
    }, [videoUrl])

    const handlePostContentChange = e => {
        setPostContent(e.target.value)
        const el = document.querySelector('#post-form-submit-btn')
        el.disabled = !e.target.value.trim() && !postFormImagePreview && !videoUrl
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

    const getEmbedVideoUrl = () => {
        if (!videoUrl) return

        const videoId = /watch\?v=(.*)/.exec(videoUrl.includes('&') ? videoUrl.split('&')[0] : videoUrl)[1]
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
    }

    const handleCloseImage = () => {
        document.querySelector('#post-img-container').style.display = 'none'
        document.querySelector('#post-image').value = ''
        if (!postContent.trim() && !videoUrl.trim()) document.querySelector('#post-form-submit-btn').disabled = true
        setPostFormImagePreview(null)
    }

    const handleCloseVideo = () => {
        setVideoUrl('')
        if (!postContent.trim() && !postFormImagePreview.trim()) document.querySelector('#post-form-submit-btn').disabled = true
    }

    const handleSubmit = e => {
        e.preventDefault()
        const postImage = postFormImagePreview
        setPostContent('')
        setPostFormImagePreview('')
        setVideoUrl('')
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
                'post-image': postImage || '',
                'post-video': getEmbedVideoUrl() || '',
                'hashtags': hashtags,
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
                    posts ?
                        setPosts([data, ...posts])
                        :
                        renderParent()
                }
            })
    }

    return (
        <>
            <AdvancedPostModal isOpen={advancedModalIsOpen} closeModal={() => setAdvancedModalIsOpen(false)} />
            <form
                className={`create-post-form b-bottom-radius box-shadow p-0 ${props.className}`}
                style={props.style}
                onSubmit={handleSubmit}
            >
                <div className="d-flex">
                    {color !== undefined &&
                        <div style={{ marginLeft: "20px", width: "5px", background: color }} />
                    }
                    <div className="d-flex flex-column w-100" style={{ padding: "35px 20px 20px" }}>
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
                                placeholder={parentComment ? `Responder ${parentComment.author.first_name}` : "O que passa pela sua cabeça?"}
                                maxLength={500}
                            />
                        </div>
                        {(postFormImagePreview && postFormImagePreview !== '') &&
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
                        <hr />
                        <div className="d-flex justify-content-between" style={{ margin: '0px 70px 0 70px' }}>
                            <div className="post-extra-options">
                                {type === 'post' &&
                                    <>
                                        <div>
                                            <label htmlFor="post-image" className="far fa-image m-0 icon c-primary-color secondary-hover" style={{ fontSize: '25px' }} />
                                            <input
                                                type="file"
                                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                                id="post-image"
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
                                        <i
                                            className="material-icons-outlined m-0 icon c-primary-color secondary-hover"
                                            style={{ fontSize: '27px' }}
                                            onClick={() => setAdvancedModalIsOpen(true)}
                                        >
                                            outbound
                                        </i>
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
                    </div>
                </div>
            </form>
        </>
    )
}