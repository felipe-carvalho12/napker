import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Picker from 'emoji-picker-react'

import { csrftoken, openCloseEmojiList } from '../config/utils'
import { SERVER_URL } from '../config/settings'

export default function CommentModal(props) {
    const [commentContent, setCommentContent] = useState('')

    const post = props.post

    const handleCommentChange = e => {
        setCommentContent(e.target.value)
        const el = document.querySelector('#comment-form-submit')
        el.disabled = e.target.value === ''
    }

    const onEmojiSelect = (event, emojiObject) => {
        setCommentContent(commentContent + emojiObject.emoji)
        document.querySelector('#comment-form-submit').disabled = false
    }

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg">
            <Modal.Header closeButton>
                <Modal.Title><strong>Comentar</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="post-container">
                    <div className="d-flex justify-content-between">
                        <div className="post-row">
                            <div className="post-col">
                                <img src={`${SERVER_URL}${post.author.photo}`}
                                    className="profile-img-med"
                                />
                            </div>
                            <div className="post-col">
                                <div>
                                    <strong>{post.author.first_name} {post.author.last_name} </strong>
                                    <p className="text-secondary d-inline-block">
                                        @{post.author.user.username} • {post.created.split('-').reverse().join('/')}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    {post.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <form action={`${SERVER_URL}/post-api/comment-post/${post.id}`} method="POST" className="comment-form">
                    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                    <label
                        className="far fa-smile"
                        id="emoji-button"
                        onClick={() => openCloseEmojiList(false)}
                    />
                    <textarea
                        type="text"
                        className="form-control"
                        name="comment-content"
                        value={commentContent}
                        placeholder="Comente alguma coisa"
                        style={{ marginRight: '5px', height: '40px' }}
                        onChange={handleCommentChange}
                    />
                    <div className="emoji-list-container chat-emoji-list" id="emoji-list-container">
                        <Picker onEmojiClick={onEmojiSelect} />
                    </div>
                    <button
                        className="btn btn-primary"
                        id="comment-form-submit"
                        type="submit"
                        disabled
                    >
                        Enviar
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}