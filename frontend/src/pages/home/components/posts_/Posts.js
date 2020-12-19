import React from 'react'

import { SERVER_URL } from '../../../../config/settings'
import LikesModal from '../../../../components/likesmodal'
import PostForm from './components/PostForm'
import PostListItem from '../../../../components/PostListItem'

export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myProfile: null,
            posts: null,
            likesModal: {
                isOpen: false,
                likes: null
            },
            postContent: '',
            postFormImagePreview: null
        }
        this.scrollCount = 1

        window.onscroll = () => {
            if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.scrollCount++
                this.fetchPosts()
            }
        }
    }

    componentWillMount() {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => this.setState({ myProfile: data }))
        this.fetchPosts()
    }

    fetchPosts = () => {
        fetch(`${SERVER_URL}/post-api/post-list/${this.scrollCount}`)
            .then(response => response.json())
            .then(data => this.setState({ posts: data }))
    }


    render() {
        return (
            <>
                <LikesModal
                    isOpen={this.state.likesModal.isOpen}
                    likes={this.state.likesModal.likes}
                    hideModal={() => this.setState({ likesModal: { isOpen: false, likes: null } })}
                />
                {this.state.myProfile &&
                    <div className="feed-create-post-form">
                        <PostForm myProfile={this.state.myProfile} />
                    </div>
                }
                <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
                    {this.state.posts && this.state.myProfile &&
                        this.state.posts.map(post => {
                            return (
                                <PostListItem
                                    post={post}
                                    myProfile={this.state.myProfile}
                                    renderParent={this.fetchPosts}
                                    openLikesModal={likes => this.setState({ likesModal: { isOpen: true, likes: likes } })}
                                />
                            )
                        })
                    }
                    <div className="posts-loader-container" >
                        <div className="loader" />
                    </div>
                </div>
            </>
        )
    }
}