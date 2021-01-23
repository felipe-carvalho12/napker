import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../../../config/settings'
import PostForm from '../components/PostForm'
import LikesModal from '../../../../../../components/LikesModal'
import Header from '../../../../../../components/fixed/Header'
import BottomMenu from '../../../../../../components/fixed/bottom-menu/BottomMenu'
import PostListItem from '../../../../../../components/PostListItem'
import CommentListItem from './components/CommentListItem'

export default function Post() {
    const [post, setPost] = useState(null)
    const [myProfile, setMyProfile] = useState(null)

    const [displayingForm, setDisplayingForm] = useState(false)

    const [postLikesModal, setPostLikesModal] = useState({ isOpen: false, likes: null })
    const [commentLikesModal, setCommentLikesModal] = useState({ isOpen: false, likes: null })

    const { id } = useParams()

    const isMobile = visualViewport.width <= 980

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
        <div className="content-container">
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
            <Header
                page="Post"
                backArrow={true}
                className="b-theme-base-color box-med blur-20px"
                style={{ position: "sticky", top: "1vw", padding: "0 20px 0", zIndex: "1000" }}
            />
            <div className={`content p-vw-x ${isMobile ? 'pb-mobile' : ''}`}>
                {post && myProfile ?
                    <>
                        <PostListItem
                            post={post}
                            myProfile={myProfile}
                            isLink={false}
                            renderParent={fetchPost}
                            showHideForm={() => setDisplayingForm(!displayingForm)}
                            style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
                        />
                        <div className="mt-10px">
                            {displayingForm &&
                                <div className="box-med b-theme-base-color b-vw-t" style={{ marginLeft: '30px' }}>
                                    <PostForm
                                        type='first-layer-comment'
                                        postId={post.id}
                                        myProfile={myProfile}
                                        renderParent={fetchPost}
                                        hideForm={() => setDisplayingForm(false)}
                                    />
                                </div>
                            }
                            {post.first_layer_comments.map(comment => {
                                return (
                                    <CommentListItem
                                        post={post}
                                        comment={comment}
                                        myProfile={myProfile}
                                        renderParent={fetchPost}
                                        style={{ borderLeft: "5px solid var(--background)" }}
                                    />
                                )
                            })
                            }
                        </div>
                    </> :
                    <div className="loader-container" >
                        <div className="loader" />
                    </div>
                }
            </div>
            <BottomMenu />
        </div>
    )
}