import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import PostTextbox from './components/post-textbox/PostTextbox'
import VideoIframe from '../../../../../../components/VideoIframe'
import InterestsInfoModal from './components/InterestsInfoModal'

import { SERVER_URL } from '../../../../../../config/settings'
import { csrftoken } from '../../../../../../config/utils'
import { MyProfileContext } from '../../../../../../context/app/AppContext'
import InterestsInput from '../../../../profile/pages/edit_interests/components/InterestsInput'
import InfoIcon from '../../../../../../components/fixed/sidebar-right/components/InfoIcon'


export default function PostForm(props) {
    const usePosts = props.usePosts || (() => [null, null])
    const type = props.type === undefined ? 'post' : props.type
    const parent = props.parent
    const hideForm = props.hideForm

    const isMobile = visualViewport.width <= 980
    const renderParent = props.renderParent

    const [myProfile, updateMyProfile] = useContext(MyProfileContext)

    const history = useHistory()

    const [posts, setPosts] = usePosts()
    const [errMessage, setErrMessage] = useState(null)

    const [taggedUsernames, setTaggedUsernames] = useState([])

    const [postContent, setPostContent] = useState('{"blocks": [{"text": ""}]}')
    const [contentLength, setContentLength] = useState(0)
    const [postFormImagePreview, setPostFormImagePreview] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [postInterests, setPostsInterests] = useState([])

    const [emojiSelector, setEmojiSelector] = useState(null)
    const [toolbar, setToolbar] = useState(null)

    const [isAdvanced, setIsAdvanced] = useState(false)
    const [interestsInfoModalIsOpen, setInterestsInfoModalIsOpen] = useState(false)

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
        const el = document.querySelector(`#${isMobile ? 'mobile' : 'desktop'}-post-form-submit-btn`)
        if (el) el.disabled = !videoUrl.trim() && !postFormImagePreview && !videoUrl
    }, [videoUrl])

    useEffect(() => {
        const el = document.querySelector(`#${isMobile ? 'mobile' : 'desktop'}-post-form-submit-btn`)
        if (el) el.disabled = !contentLength && !postFormImagePreview && !videoUrl

    }, [contentLength])

    const handlePostImageChange = e => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPostFormImagePreview(reader.result)
                document.querySelector(`#${isMobile ? 'mobile' : 'desktop'}-post-img-container`).style.display = 'initial'
                document.querySelector(`#${isMobile ? 'mobile' : 'desktop'}-post-form-submit-btn`).disabled = false
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
        document.querySelector(`#${isMobile ? 'mobile' : 'desktop'}-post-img-container`).style.display = 'none'
        document.querySelector(`#${isMobile ? 'mobile' : 'desktop'}-post-img`).value = ''
        if (!postContent.trim() && !videoUrl.trim())
            setPostFormImagePreview(null)
    }

    const handleCloseVideo = () => {
        setVideoUrl('')
        if (!postContent.trim() && !postFormImagePreview.trim()) document.querySelector(`#${isMobile ? 'mobile' : 'desktop'}-post-form-submit-btn`).disabled = true
    }

    const handleSubmit = e => {
        e && e.preventDefault()

        document.querySelector(`#${isMobile ? 'mobile' : 'desktop'}-post-form-submit-btn`).disabled = true

        if (type === 'post') {
            var body = {
                'content': postContent,
                'post-image': postFormImagePreview,
                'post-video': getEmbedVideoUrl() || '',
                'tagged-usernames': taggedUsernames,
                'interests': postInterests
            }
        } else {
            var body = {
                'content': postContent,
                'parent-id': parent.details.id,
                'tagged-usernames': taggedUsernames
            }
        }

        fetch(`${SERVER_URL}/post-api/create-${type}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setErrMessage(data.message)
                } else {
                    errMessage && setErrMessage('')
                    hideForm && hideForm()
                    posts ? setPosts([data, ...posts]) : renderParent && renderParent()

                    isMobile && history.push('/perfil')
                }

                setPostContent('')
                setPostFormImagePreview('')
                setVideoUrl('')
                setIsAdvanced(false)
                updateMyProfile()
            })
    }

    return (
        <>
            <InterestsInfoModal isOpen={interestsInfoModalIsOpen} hideModal={() => setInterestsInfoModalIsOpen(false)} />
            <form
                className={`create-post-form p-0 ${props.className}`}
                style={props.style}
                onSubmit={handleSubmit}
            >
                <div className="d-flex">
                    <div className="w-100 h-100">
                        <div className={`d-flex ${isAdvanced ? "box-sm b-theme-base-color" : ""} ${isMobile ? 'mb-2' : ''} p-0 justify-content-between w-100"`} style={{ height: "34px" }}>
                            <div style={{ transform: isAdvanced ? "translateX(0)" : "translateX(200px)", transition: '.8s' }}>
                                {(isAdvanced && toolbar !== null) &&
                                    toolbar
                                }
                            </div>
                            <i
                                className="material-icons-outlined m-1 fs-27 my-0 mr-10px align-self-center p-0 icon secondary-hover bg-none"
                                style={{ transform: isAdvanced ? "rotate(180deg)" : "rotate(0deg)", color: 'var(--primary-color-1)' }}
                                onClick={() => setIsAdvanced(!isAdvanced)}
                            >
                                outbound
                            </i>
                        </div>
                        <div className="d-flex flex-column w-100" style={{ padding: `0` }}>
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
                                    isAdvanced={isAdvanced}
                                    placeholder={type === 'comment' ? `Responder ${parent.details.author.first_name}` : "O que passa pela sua cabeça?"}
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
                                <div className="w-100 d-flex justify-content-center mt-2">
                                    <div
                                        className="post-img-container"
                                        id={`${isMobile ? 'mobile' : 'desktop'}-post-img-container`}>
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
                                            id={`${isMobile ? 'mobile' : 'desktop'}-post-form-img-preview`}
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
                            {isAdvanced && type === 'post' &&
                                <InterestsInput
                                    myProfile={myProfile}
                                    setInterests={setPostsInterests}
                                    placeholder="Adicione interesses ao seu post"
                                    startEmpty={true}
                                    minRows='1'
                                    className="mt-3 position-relative b-a"
                                    style={{ background: 'none' }}
                                >
                                    <InfoIcon
                                        onClick={() => setInterestsInfoModalIsOpen(true)}
                                        style={{ width: 'fit-content', position: 'absolute', top: '5px' }}
                                    />
                                </InterestsInput>
                            }
                            <div className="d-flex justify-content-between">
                                <div className="post-extra-options">
                                    {type === 'post' &&
                                        <>
                                            <div>
                                                <label
                                                    htmlFor={`${isMobile ? 'mobile' : 'desktop'}-post-img`}
                                                    className="far fa-image m-0 icon secondary-hover hover-bg-none"
                                                    style={{ fontSize: '25px', color: 'var(--primary-color-1)' }}
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                                    id={`${isMobile ? 'mobile' : 'desktop'}-post-img`}
                                                    style={{ display: 'none' }}
                                                    onChange={handlePostImageChange}
                                                />
                                            </div>
                                            <i
                                                className="material-icons-outlined m-0 icon secondary-hover hover-bg-none"
                                                style={{ fontSize: '27px', color: 'var(--primary-color-1)' }}
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
                                <button
                                    type="submit"
                                    className="btn btn-primary d-flex justify-content-center align-items-center justify-self-end align-self-end"
                                    id={`${isMobile ? 'mobile' : 'desktop'}-post-form-submit-btn`}
                                    style={{ height: '30px' }}
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
                </div>
            </form>
        </>
    )
}