import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../config/settings'
import PostListItem from '../../../../components/PostListItem'
import LikesModal from '../../../../components/LikesModal'


export default function Explore() {
    const [myProfile, setMyProfile] = useState(null)
    const [posts, setPosts] = useState(null)
    const [likesModal, setLikesModal] = useState({ isOpen: false, likes: null })

    let selectedInterest = null

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => {
                setMyProfile(data)
            })
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
                    <div className="post-list">
                        {posts.map(post => {
                            return (
                                <PostListItem
                                    post={post}
                                    myProfile={myProfile}
                                    renderParent={fetchPosts}
                                    openLikesModal={likes => setLikesModal({ isOpen: true, likes: likes })}
                                />
                            )
                        })}
                    </div>
                </>
                :
                <div className="loader-container">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="452.000000pt" height="452.000000pt" viewBox="0 0 452.000000 452.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,452.000000) scale(0.100000,-0.100000)"
                            fill='var(--primary-color)' stroke="none">
                            <path d="M674 4491 c-120 -19 -280 -86 -372 -156 -130 -98 -242 -272 -277
                            -431 -34 -151 -8 -312 63 -388 63 -67 170 -85 264 -43 149 66 210 257 133 420
                            -35 75 -31 91 22 95 85 6 227 -98 282 -206 53 -105 51 -46 51 -1698 1 -841 5
                            -1559 9 -1596 5 -38 22 -96 38 -130 68 -145 205 -228 377 -228 128 0 238 43
                            312 122 52 55 71 87 95 156 18 53 19 108 19 1796 0 1711 -1 1742 -20 1784
                            l-20 44 23 19 c79 67 190 125 282 148 75 19 211 15 305 -8 263 -66 469 -298
                            544 -616 33 -143 36 -247 36 -1502 0 -836 4 -1278 11 -1330 13 -96 48 -200 97
                            -290 49 -91 177 -220 257 -260 112 -56 152 -63 388 -63 196 0 223 2 313 25
                            155 39 266 99 373 200 77 74 97 100 139 183 27 53 56 120 65 147 47 155 17
                            358 -65 431 -120 107 -338 45 -398 -114 -33 -86 -30 -159 10 -260 31 -77 32
                            -84 17 -99 -14 -14 -23 -15 -67 -5 -97 23 -194 115 -238 227 -38 98 -42 195
                            -42 1155 0 740 -3 952 -15 1060 -45 423 -187 746 -434 990 -201 199 -409 312
                            -736 400 -102 28 -366 38 -512 21 -192 -24 -421 -98 -523 -171 -36 -26 -46
                            -25 -83 6 -58 49 -219 121 -336 151 -66 16 -314 25 -387 14z"/>
                        </g>
                    </svg>
                </div>
            }
        </div>
    )
}