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
        <div className="w-100">
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
            <div className="b-theme-base-color box-med blur" style={{ position: "sticky", top: "1vw", padding: "0 20px 0", zIndex: "1000" }}>
                <Header page="Post" backArrow={true} />
            </div>
            <div className="content">
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
                                <div className="feed-create-post-form box-med b-theme-base-color b-vw-t" style={{ marginLeft: '30px' }}>
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