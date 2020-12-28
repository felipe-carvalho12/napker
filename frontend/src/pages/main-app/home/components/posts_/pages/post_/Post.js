import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../../../../config/settings'
import CommentModal from '../../../../../../../components/CommentModal'
import LikesModal from '../../../../../../../components/LikesModal'
import Header from '../../../../../../../components/fixed/Header'
import BottomMenu from '../../../../../../../components/fixed/bottom-menu/BottomMenu'
import CommentIcon from '../../../../../../../components/fixed/bottom-menu/components/CommentIcon'
import PostListItem from '../../../../../../../components/PostListItem'
import CommentListItem from './components/CommentListItem'

export default function Post(props) {
    const [post, setPost] = useState(null)
    const [myProfile, setMyProfile] = useState(null)
    const [commentModalIsOpen, setCommentModalIsOpen] = useState(props.commentModalIsOpen)
    const [postLikesModal, setPostLikesModal] = useState({ isOpen: false, likes: null })
    const [commentLikesModal, setCommentLikesModal] = useState({ isOpen: false, likes: null })

    const { id } = useParams()

    useEffect(() => {
        fetchPost()
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
    }, [])

    useEffect(() => {
        console.log('got here')
        setCommentModalIsOpen(!!props.commentModalIsOpen)
    }, [props.commentModalIsOpen])

    const fetchPost = () => {
        fetch(`${SERVER_URL}/post-api/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
    }

    const hideCommentModal = () => {
        setCommentModalIsOpen(false)
        window.history.back()
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
            {post &&
                <CommentModal
                    isOpen={commentModalIsOpen}
                    hideModal={hideCommentModal}
                    post={post}
                />
            }
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
            <Header page="Post" backArrow={true} />
            <div className="content">
                {post && myProfile ?
                    <>
                        <PostListItem post={post} myProfile={myProfile} isLink={false} renderParent={fetchPost} />
                        <div className="mt-2">
                            {post.first_layer_comments.map(comment => {
                                return (
                                    <CommentListItem
                                        comment={comment}
                                        myProfile={myProfile}
                                        renderParent={fetchPost}
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
            <BottomMenu>
                <CommentIcon postId={id} />
            </BottomMenu>
        </div>
    )
}