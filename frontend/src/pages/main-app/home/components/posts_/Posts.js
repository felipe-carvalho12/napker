import React, { useContext, useEffect, useState } from 'react'

import { DEBUG, SERVER_URL } from '../../../../../config/settings'
import { AlgorithmWeightsContext, MyProfileContext, PostsIdContext, FeedPostsContext } from '../../../../../context/app/AppContext'
import LikesModal from '../../../../../components/LikesModal'
import PostForm from './components/PostForm'
import PostListItem from '../../../../../components/PostListItem'
import { csrftoken } from '../../../../../config/utils'

let isFetching_scroll = false

export default function Posts() {
    const [weights,] = useContext(AlgorithmWeightsContext)

    const [myProfile,] = useContext(MyProfileContext)
    const [postsId,] = useContext(PostsIdContext)
    const [posts, setPosts] = useContext(FeedPostsContext)
    const [likesModalIsOpen, setLikesModalIsOpen] = useState(false)
    const [likesModalItems, setLikesModalItems] = useState(null)

    let scrollCount = 1

    window.onscroll = () => {
        if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.9 && !isFetching_scroll) {
            scrollCount++
            isFetching_scroll = true
            postsId && fetchPosts()
        }
    }

    useEffect(() => {
        !posts.length && postsId && fetchPosts()
    }, [postsId])

    useEffect(() => {
        //postsId && fetchPosts()
    }, [weights])

    const fetchPosts = () => {
        console.log('a')
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
                setPosts([...posts, ...data])
                DEBUG && console.log(data)
            })
    }


    return (
        <>{console.log(posts)}
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