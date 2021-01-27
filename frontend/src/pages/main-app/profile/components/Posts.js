import React, { useContext, useState } from 'react'

import { MyProfileContext } from '../../../../context/app/AppContext'
import LikesModal from '../../../../components/LikesModal'
import PostListItem from '../../../../components/PostListItem'

export default function Posts(props) {
    const [myProfile,] = useContext(MyProfileContext)
    const [likesModalIsOpen, setLikesModalIsOpen] = useState(false)
    const [likesModalItems, setLikesModalItems] = useState(null)
    const profile = props.profile

    const isMobile = visualViewport.width <= 980

    return (
        <>
            <LikesModal
                isOpen={likesModalIsOpen}
                likes={likesModalItems}
                hideModal={() => setLikesModalIsOpen(false)}
            />
            <div className={`d-flex flex-column justify-content-start align-items-center w-100 ${isMobile ? 'pb-mobile' : ''}`}>
                {profile && myProfile ?
                    <>
                        {profile.posts.length ? profile.posts.map(post => {
                            return (
                                <PostListItem
                                    post={post}
                                    myProfile={myProfile}
                                    renderParent={props.fetchProfile}
                                    openLikesModal={() => setLikesModalIsOpen(true)}
                                    setLikesModalItems={likes => setLikesModalItems(likes)}
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
                    <div className="loader-container" >
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}