import React, { useContext, useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../config/settings'
import { AlgorithmWeightsContext, MyProfileContext } from '../../../../../context/app/AppContext'
import LikesModal from '../../../../../components/LikesModal'
import PostForm from './components/PostForm'
import PostListItem from '../../../../../components/PostListItem'

let isFetching_scroll = false

export default function Posts() {
    const [weights,] = useContext(AlgorithmWeightsContext)
    const [isFetching_weights, setIsFetching_weights] = useState(false)

    const [myProfile,] = useContext(MyProfileContext)
    const [posts, setPosts] = useState(null)
    const [likesModalIsOpen, setLikesModalIsOpen] = useState(false)
    const [likesModalItems, setLikesModalItems] = useState(null)

    let scrollCount = 1

    window.onscroll = () => {
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.9 && !isFetching_scroll) {
            scrollCount++
            isFetching_scroll = true
            fetchPosts()
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        setIsFetching_weights(true)
        fetchPosts()
    }, [weights])

    const fetchPosts = () => {
        fetch(`${SERVER_URL}/post-api/post-list/${scrollCount}`)
            .then(response => response.json())
            .then(data => {
                isFetching_scroll = false
                setIsFetching_weights(false)
                setPosts(data)
            })
    }


    return (
        <>
            <LikesModal
                isOpen={likesModalIsOpen}
                likes={likesModalItems}
                hideModal={() => setLikesModalIsOpen(false)}
            />
            {myProfile &&
                <div className="feed-create-post-form box-med b-theme-base-color b-vw-t">
                    <PostForm usePosts={() => [posts, setPosts]} />
                </div>
            }
            <div className="d-flex flex-column justify-content-start align-items-center w-100 h-100">
                {(posts && myProfile && !isFetching_weights) &&
                    posts.map(post => {
                        return (
                            <PostListItem
                                post={post}
                                myProfile={myProfile}
                                renderParent={fetchPosts}
                                openLikesModal={() => setLikesModalIsOpen(true)}
                                setLikesModalItems={likes => setLikesModalItems(likes)}
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