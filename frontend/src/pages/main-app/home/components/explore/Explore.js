import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../config/settings'
import { MyProfileContext } from '../../../../../context/app/AppContext'
import PostListItem from '../../../../../components/PostListItem'
import LikesModal from '../../../../../components/LikesModal'
import InterestSearchInput from '../profiles/components/InterestSearchInput'


export default function Explore() {
    const [myProfile,] = useContext(MyProfileContext)
    const [posts, setPosts] = useState(null)
    const [likesModal, setLikesModal] = useState({ isOpen: false, likes: null })

    let selectedInterest = null

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        if (selectedInterest) {
            fetch(`${SERVER_URL}/post-api/interest-post-list/${selectedInterest}`)
                .then(response => response.json())
                .then(data => setPosts(data))
        } else {
            fetch(`${SERVER_URL}/post-api/explore-post-list`)
                .then(response => response.json())
                .then(data => setPosts(data))
        }
    }

    const switchPage = e => {
        const element = e.target
        document.querySelectorAll('.hashtag-container').forEach(el => {
            el.classList.remove('active')
        })
        element.classList.add('active')
        selectedInterest = element.innerText !== 'Todos' ? element.innerText : null
        fetchPosts()
    }

    return (
        <div className="explore-page-container">
            <LikesModal
                isOpen={likesModal.isOpen}
                likes={likesModal.likes}
                hideModal={() => setLikesModal({ isOpen: false, likes: null })}
            />
            {myProfile !== null && posts !== null ?
                <>
                    <div className="w-100 d-flex justify-content-center align-items-center p-10px b-theme-base-color">
                        <InterestSearchInput className="mt-10px w-100" />
                    </div>
                    <div className="hashtags-header">
                        <div className="hashtag-container active base-hover" onClick={switchPage}>
                            Todos
                        </div>
                        {myProfile.interests.map(interest => {
                            return (
                                <div className="hashtag-container base-hover" onClick={switchPage}>
                                    {interest.title}
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-flex justify-content-between">
                        {posts.length ?
                            <>
                                <div className="post-list" style={{ width: '49%' }}>
                                    {posts.filter((post, index) => !(index % 2)).map(post => {
                                        return (
                                            <PostListItem
                                                post={post}
                                                myProfile={myProfile}
                                                renderParent={fetchPosts}
                                                breakAuthorData={true}
                                                openLikesModal={likes => setLikesModal({ isOpen: true, likes: likes })}
                                            />
                                        )
                                    })
                                    }
                                </div>
                                <div className="post-list" style={{ width: '49%' }}>
                                    {posts.filter((post, index) => index % 2).map(post => {
                                        return (
                                            <PostListItem
                                                post={post}
                                                myProfile={myProfile}
                                                renderParent={fetchPosts}
                                                breakAuthorData={true}
                                                openLikesModal={likes => setLikesModal({ isOpen: true, likes: likes })}
                                            />
                                        )
                                    })
                                    }
                                </div>
                            </>
                            :
                            <div className="mt-20px">
                                <spam className="fs-21 fw-400">Não encontramos nenhum post</spam>
                            </div>
                        }
                    </div>
                </>
                :
                <div className="loader-container">
                    <div className="loader" />
                </div>
            }
        </div>
    )
}
