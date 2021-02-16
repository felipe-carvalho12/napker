import React, { useContext, useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../config/settings'
import { AlgorithmWeightsContext, MyProfileContext, PostsIdContext } from '../../../../../context/app/AppContext'
import LikesModal from '../../../../../components/LikesModal'
import PostForm from './components/PostForm'
import PostListItem from '../../../../../components/PostListItem'
import { csrftoken, sortedPosts } from '../../../../../config/utils'

let isFetching_scroll = false

export default function Posts() {
    const [weights,] = useContext(AlgorithmWeightsContext)

    const [myProfile,] = useContext(MyProfileContext)
    const [postsId, setPostsId, , removePostId] = useContext(PostsIdContext)
    const [posts, setPosts] = useState([])
    const [likesModalIsOpen, setLikesModalIsOpen] = useState(false)
    const [likesModalItems, setLikesModalItems] = useState(null)

    let scrollCount = 1

    window.onscroll = () => {
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.9 && !isFetching_scroll) {
            scrollCount++
            isFetching_scroll = true
            postsId && fetchPosts(true)
        }
    }

    useEffect(() => {
        postsId && fetchPosts(false)
    }, [postsId])

    useEffect(() => {
        postsId && console.log(postsId.map(postId => postId.id))
        postsId && setPostsId(sortedPosts(postsId, weights))
        postsId && console.log(sortedPosts(postsId, weights).map(postId => postId.id))
    }, [weights])

    const fetchPosts = keepPosts => {
        fetch(`${SERVER_URL}/post-api/post-list`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(postsId.slice((scrollCount - 1) * 50, scrollCount * 50).map(postId => postId.id)), 
        })
            .then(response => response.json())
            .then(data => {
                isFetching_scroll = false
                console.log(data, keepPosts)
                keepPosts ? setPosts([...posts, ...data]) : setPosts(data)
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
                {(!!posts.length && myProfile) &&
                    posts.map(post => {
                        return (
                            <PostListItem
                                post={post}
                                myProfile={myProfile}
                                renderParent={fetchPosts}
                                openLikesModal={() => setLikesModalIsOpen(true)}
                                setLikesModalItems={likes => setLikesModalItems(likes)}
                                deleteCallback={() => removePostId(post.details.id)}
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