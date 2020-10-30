import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

import LikesModal from '../../components/likesmodal'
import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            posts: null,
            postContent: '',
            likesModal: {
                isOpen: false,
                likes: null
            }
        }
    }

    componentWillMount() {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => this.setState({ profile: data }))
        this.fetchPosts()
    }

    fetchPosts = () => {
        fetch(`${SERVER_URL}/post-api/post-list`)
            .then(response => response.json())
            .then(data => this.setState({ posts: data }))
    }

    createPost = () => {
        fetch(`${SERVER_URL}/post-api/create-post`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({ content: this.state.postContent })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ postContent: '' })
            })
    }

    likeUnlikePost = e => {
        const likeBtn = e.target
        if (likeBtn.classList.contains('fas')) {
            likeBtn.classList.remove('fas') //border heart
            likeBtn.classList.add('far')  //filled heart
            fetch(`${SERVER_URL}/post-api/unlike-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.fetchPosts()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            fetch(`${SERVER_URL}/post-api/like-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.fetchPosts()
                })
        }
    }

    hideLikesModal = () => {
        this.setState({
            likesModal: {
                isOpen: false,
                likes: null
            }
        })
    }

    render() {
        return (
            <>
                <LikesModal
                    isOpen={this.state.likesModal.isOpen}
                    likes={this.state.likesModal.likes}
                    hideModal={this.hideLikesModal}
                />
                <div className="form-row d-inline-block">
                    <div className="col d-flex">
                        <input type="text"
                            className="form-control"
                            placeholder="O que está acontecendo?"
                            style={{ marginRight: '5px', width: '400px' }}
                            value={this.state.postContent}
                            onChange={e => this.setState({ postContent: e.target.value })}
                        />
                        <button className="btn btn-primary" style={{ marginBottom: '20px', borderRadius: '5px' }} onClick={this.createPost}>Postar</button>
                    </div>
                </div>
                <div className="post-list">
                    {this.state.posts && this.state.profile && this.state.posts.map(post => {
                        return (
                            <li className="post-container" key={post.id}>
                                <div className="post-row">
                                    <div className="post-col">
                                        <Link to={`/user/${post.author.slug}`}>
                                            <img src={`${SERVER_URL}${post.author.photo}`}
                                                className="profile-img-med"
                                            />
                                        </Link>
                                    </div>
                                    <div className="post-col">
                                        <Link to={`/user/${post.author.slug}`} style={{ color: '#000' }}>
                                            <div style={{ height: '30px' }}>
                                                <strong>{post.author.first_name} {post.author.last_name} </strong>
                                                <p className="text-secondary d-inline-block">
                                                    @{post.author.user.username} • {post.created.split('-').reverse().join('/')}
                                                </p>
                                            </div>
                                        </Link>
                                        <Link to={`/post/${post.id}`} style={{ color: '#000' }}>
                                            <div style={{ textAlign: 'start' }}>
                                                {post.content}
                                            </div>
                                            {post.image &&
                                                <img src={`${SERVER_URL}${post.image}`} className="post-img" />
                                            }
                                        </Link>
                                    </div>
                                </div>
                                <div className="post-actions">
                                    <p className="text-secondary">
                                        <i class="far fa-comment" />{post.comments.length}
                                        {post.likes.map(like => like.profile.id).includes(this.state.profile.id) ?
                                            <i class="fas fa-heart"
                                                data-postid={post.id}
                                                onClick={this.likeUnlikePost}
                                            />
                                            :
                                            <i class="far fa-heart"
                                                data-postid={post.id}
                                                onClick={this.likeUnlikePost}
                                            />}
                                        <p className="post-likes-number"
                                            onClick={() => this.setState({ likesModal: { isOpen: true, likes: post.likes } })}
                                        >
                                            {post.likes.length}
                                        </p>
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </div>
            </>
        )
    }
}