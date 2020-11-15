import React from 'react'
import Picker from 'emoji-picker-react'
import { Link } from 'react-router-dom'

import LikesModal from '../../components/likesmodal'
import { SERVER_URL } from '../../settings'
import { csrftoken, openCloseEmojiList } from '../../utils'

export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            posts: null,
            likesModal: {
                isOpen: false,
                likes: null
            },
            postContent: '',
            postFormImagePreview: null
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

    likeUnlikePost = e => {
        e.stopPropagation()
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

    deletePost = (e, postId) => {
        e.stopPropagation()
        const el = document.querySelector(`#profile-post-${postId}`)
        if (window.confirm('Tem certeza que deseja apagar o post?\nEssa ação é irreversível.')) {
            el.style.animationPlayState = 'running'
            el.addEventListener('animationend', () => {
                this.fetchPosts()
            })
            fetch(`${SERVER_URL}/post-api/delete-post/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
        }
    }

    handlePostContentChange = e => {
        this.setState({ postContent: e.target.value })
        const el = document.querySelector('#post-form-submit-btn')
        el.disabled = e.target.value.trim() === '' && !this.state.postFormImagePreview
    }

    handlePostImageChange = e => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ postFormImagePreview: reader.result })
                document.querySelector('#post-img-container').style.display = 'initial'
                document.querySelector('#post-form-submit-btn').disabled = false
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch {

        }
    }

    handleCloseImage = () => {
        document.querySelector('#post-img-container').style.display = 'none'
        document.querySelector('#post-image').value = ''
        if (this.state.postContent.trim() === '') document.querySelector('#post-form-submit-btn').disabled = true
        this.setState({ postFormImagePreview: null })
    }

    onEmojiSelect = (event, emojiObject) => {
        this.setState({ postContent: this.state.postContent + emojiObject.emoji })
        document.querySelector('#post-form-submit-btn').disabled = false
    }

    render() {
        return (
            <>
                <LikesModal
                    isOpen={this.state.likesModal.isOpen}
                    likes={this.state.likesModal.likes}
                    hideModal={this.hideLikesModal}
                />
                {this.state.profile &&
                    <form
                        action={`${SERVER_URL}/post-api/create-post`}
                        method="POST"
                        className="create-post-form"
                        encType="multipart/form-data"
                    >
                        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                        <div className="d-flex">
                            <Link to="/perfil">
                                <img
                                    src={`${SERVER_URL}${this.state.profile.photo}`}
                                    className="profile-img-med"
                                />
                            </Link>
                            <textarea
                                className="post-content-text-area"
                                name="post-content"
                                value={this.state.postContent}
                                placeholder="No que você está pensando?"
                                maxLength={300}
                                autoFocus
                                onChange={this.handlePostContentChange}
                            />
                        </div>
                        <div className="w-100 d-flex justify-content-center">
                            <div
                                className="post-img-container"
                                id="post-img-container">
                                <div
                                    className="post-img-options"
                                >
                                    <i
                                        className="far fa-times-circle"
                                        onClick={this.handleCloseImage}
                                    />
                                </div>
                                <img
                                    src={this.state.postFormImagePreview}
                                    className="post-img post-form-img-preview"
                                    id="post-form-img-preview"
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between" style={{ margin: '0px 70px 0 70px' }}>
                            <div className="post-extra-options">
                                <label htmlFor="post-image" class="far fa-image" />
                                <input
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    name="post-image"
                                    id="post-image"
                                    style={{ display: 'none' }}
                                    onChange={this.handlePostImageChange}
                                />
                                <label
                                    className="far fa-smile"
                                    id="emoji-button"
                                    onClick={() => openCloseEmojiList(false)}
                                />
                                <div className="emoji-list-container" id="emoji-list-container">
                                    <Picker onEmojiClick={this.onEmojiSelect} />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                id="post-form-submit-btn"
                                style={{ height: '40px' }}
                                disabled
                            >
                                Postar
                            </button>
                        </div>
                    </form>
                }
                <div className="post-list">
                    {this.state.posts && this.state.profile ?
                        this.state.posts.map(post => {
                            return (
                                <li
                                    className="post-container post-list-item"
                                    id={`profile-post-${post.id}`}
                                    key={post.id}
                                    onClick={() => window.location.href = `/post/${post.id}`}
                                >
                                    <div className="d-flex justify-content-between">
                                        <div className="post-row">
                                            <div className="post-col">
                                                <Link
                                                    to={post.author.id === this.state.profile.id ?
                                                        '/perfil' : `/user/${post.author.slug}`}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <img src={`${SERVER_URL}${post.author.photo}`}
                                                        className="profile-img-med"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="post-col">
                                                <Link
                                                    to={post.author.id === this.state.profile.id ?
                                                        '/perfil' : `/user/${post.author.slug}`}
                                                    style={{ color: '#000' }}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <div className="post-author-data-wrapper">
                                                        <strong>{post.author.first_name} {post.author.last_name} </strong>
                                                        <p className="text-secondary d-inline-block">
                                                            @{post.author.user.username} • {post.created.split('-').reverse().join('/')}
                                                        </p>
                                                    </div>
                                                </Link>
                                                <div style={{ textAlign: 'start' }}>
                                                    {post.content}
                                                </div>
                                                {post.image &&
                                                    <img src={`${SERVER_URL}${post.image}`} className="post-img" />
                                                }
                                            </div>
                                        </div>
                                        {post.author.id === this.state.profile.id &&
                                            <i
                                                className="far fa-trash-alt trash-icon text-secondary"
                                                style={{ margin: '20px 20px 0 0' }}
                                                onClick={e => this.deletePost(e, post.id)}
                                            />}
                                    </div>
                                    <div className="post-actions">
                                        <p className="text-secondary">
                                            <Link
                                                to={`/post/${post.id}/comentar`}
                                                className="text-secondary"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <i
                                                    class="far fa-comment"
                                                />{post.comments.length}
                                            </Link>
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
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    this.setState({ likesModal: { isOpen: true, likes: post.likes } })
                                                }}
                                            >
                                                {post.likes.length}
                                            </p>
                                        </p>
                                    </div>
                                </li>
                            )
                        }) :
                        <div className="posts-loader-container" >
                            <div className="loader" />
                        </div>}
                </div>
            </>
        )
    }
}