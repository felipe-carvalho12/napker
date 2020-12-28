import React, { useContext, useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../config/settings'
import { AlgorithmWeightsContext } from '../../../../../context/app/AppContext'
import LikesModal from '../../../../../components/LikesModal'
import PostForm from './components/PostForm'
import PostListItem from '../../../../../components/PostListItem'

export default function Posts() {
    const [weights,] = useContext(AlgorithmWeightsContext)

    const [myProfile, setMyProfile] = useState(null)
    const [posts, setPosts] = useState(null)
    const [likesModal, setLikesModal] = useState({ isOpen: false, likes: null })

    let scrollCount = 1

    window.onscroll = () => {
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            scrollCount++
            fetchPosts()
        }
    }

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
        fetchPosts()
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [weights])

    const fetchPosts = () => {
        fetch(`${SERVER_URL}/post-api/post-list/${scrollCount}`)
            .then(response => response.json())
            .then(data => setPosts(data))
    }


    return (
        <>
            <LikesModal
                isOpen={likesModal.isOpen}
                likes={likesModal.likes}
                hideModal={() => setLikesModal({ isOpen: false, likes: null })}
            />
            {myProfile &&
                <div className="feed-create-post-form">
                    <PostForm myProfile={myProfile} usePosts={() => [posts, setPosts]} />
                </div>
            }
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                {posts && myProfile &&
                    posts.map(post => {
                        return (
                            <PostListItem
                                post={post}
                                myProfile={myProfile}
                                renderParent={fetchPosts}
                                openLikesModal={likes => setLikesModal({ isOpen: true, likes: likes })}
                            />
                        )
                    })
                }
                <div className="loader-container" >
                    <div className="loader" />
                </div>
            </div>
        </>
    )
}