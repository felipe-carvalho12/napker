import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../config/settings'
import LikesModal from '../../components/LikesModal'
import PostListItem from '../../components/PostListItem'

export default function Posts(props) {
    const [myProfile, setMyProfile] = useState(null)
    const [likesModal, setLikesModal] = useState({ isOpen: false, likes: null })
    const profile = props.profile

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
    }, [])

    const hideLikesModal = () => {
        setLikesModal({
            isOpen: false,
            likes: null
        })
    }


    return (
        <>
            <LikesModal
                isOpen={likesModal.isOpen}
                likes={likesModal.likes}
                hideModal={hideLikesModal}
            />
            <div className="post-list">
                {profile && myProfile ?
                    <>
                        {profile.posts.length ? profile.posts.map(post => {
                            return (
                                <PostListItem
                                    post={post}
                                    myProfile={myProfile}
                                    renderParent={props.fetchProfile}
                                    openLikesModal={likes => setLikesModal({ isOpen: true, likes: likes })}
                                />
                            )
                        }) :
                            <div className="no-posts-container">
                                {profile.id === myProfile.id ?
                                    <h3 style={{ marginTop: '50px' }}>Você não tem posts</h3>
                                    :
                                    <h3 style={{ marginTop: '50px' }}>{profile.first_name} não tem posts</h3>
                                }
                            </div>
                        }
                    </>
                    :
                    <div className="posts-loader-container" >
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}