import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { SERVER_URL } from '../../../../../../config/settings'
import { MyProfileContext } from '../../../../../../context/app/AppContext'
import PostForm from '../components/PostForm'
import LikesModal from '../../../../../../components/LikesModal'
import Header from '../../../../../../components/fixed/Header'
import BottomMenu from '../../../../../../components/fixed/bottom-menu/BottomMenu'
import PostListItem from '../../../../../../components/PostListItem'
import CommentListItem from './components/CommentListItem'

export default function Post() {
    const [myProfile,] = useContext(MyProfileContext)

    const [post, setPost] = useState(null)
    const [displayingForm, setDisplayingForm] = useState(false)
    const [likesModal, setLikesModal] = useState({ isOpen: false, likes: null })

    const { id } = useParams()

    const isMobile = visualViewport.width <= 980

    useEffect(() => {
        fetchPost()
    }, [])

    const fetchPost = () => {
        fetch(`${SERVER_URL}/post-api/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
    }


    return (
        <div className="content-container">
            <LikesModal
                isOpen={likesModal.isOpen}
                likes={likesModal.likes}
                hideModal={() => setLikesModal({ isOpen: false, likes: likesModal.likes })}
            />
            <Header
                page="Post"
                backArrow={true}
                className="b-theme-base-color box-med blur-20px"
                style={{ position: "sticky", top: "1vw", padding: "var(--sz-2)", zIndex: "1000" }}
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
                            openLikesModal={() => setLikesModal({ isOpen: true, likes: likesModal.likes })}
                            setLikesModalItems={likes => setLikesModal({ isOpen: likesModal.isOpen, likes: likes })}
                            style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
                        />
                        <div className="mt-10px">
                            {displayingForm &&
                                <div className="box-med b-theme-base-color b-vw-t" style={{ marginLeft: '30px' }}>
                                    <PostForm
                                        type='comment'
                                        parent={post}
                                        renderParent={fetchPost}
                                        hideForm={() => setDisplayingForm(false)}
                                    />
                                </div>
                            }
                            {post.details.first_layer_comments.map(comment => {
                                return (
                                    <CommentListItem
                                        post={post}
                                        comment={comment}
                                        myProfile={myProfile}
                                        renderParent={fetchPost}
                                        openLikesModal={() => setLikesModal({ isOpen: true, likes: likesModal.likes })}
                                        setLikesModalItems={likes => setLikesModal({ isOpen: likesModal.isOpen, likes: likes })}
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