import React from 'react'
import Picker from 'emoji-picker-react'
import { Link } from 'react-router-dom'

import Header from './main/header'
import { SERVER_URL } from '../settings'
import { csrftoken } from '../utils'

export default class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            postContent: '',
            postFormImagePreview: null
        }
    }

    componentWillMount() {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => this.setState({ profile: data }))
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

    render() {
        return (
            <div className="content">
                <Header page="Novo post" backArrow={true} />
                <div className="post-form-page-container">
                    {this.state.profile ?
                        <form
                            action={`${SERVER_URL}/post-api/create-post`}
                            method="POST"
                            className="create-post-form-mobile"
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
                                    style={{ height: '250px' }}
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
                        :
                        <div className="posts-loader-container" >
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
        )
    }
}