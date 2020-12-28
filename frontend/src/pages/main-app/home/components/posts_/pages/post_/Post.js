import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../../../../config/settings'
import PostForm from '../../components/PostForm'
import LikesModal from '../../../../../../../components/LikesModal'
import Header from '../../../../../../../components/fixed/Header'
import BottomMenu from '../../../../../../../components/fixed/bottom-menu/BottomMenu'
import CommentIcon from '../../../../../../../components/fixed/bottom-menu/components/CommentIcon'
import PostListItem from '../../../../../../../components/PostListItem'
import CommentListItem from './components/CommentListItem'

export default function Post() {
    const [post, setPost] = useState(null)
    const [myProfile, setMyProfile] = useState(null)

    const [displayingForm, setDisplayingForm] = useState(false)
    const [comments, setComments] = useState(null)

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
            .then(data => {
                setPost(data)
                setComments(data.first_layer_comments)
            })
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
            <Header page="Post" backArrow={true} />
            <div className="content">
                {post && myProfile ?
                    <>
                        <PostListItem
                            post={post}
                            myProfile={myProfile}
                            isLink={false}
                            renderParent={fetchPost}
                            showHideForm={() => setDisplayingForm(!displayingForm)}
                        />
                        <div className="mt-2">
                            {displayingForm &&
                                <PostForm
                                    type='first-layer-comment'
                                    postId={post.id}
                                    myProfile={myProfile}
                                    usePosts={() => [comments, setComments]}
                                    hideForm={() => setDisplayingForm(false)}
                                />
                            }
                            {comments.map(comment => {
                                return (
                                    <CommentListItem
                                        post={post}
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