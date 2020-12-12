import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../../../config/settings'
import { csrftoken, openCloseEmojiList } from '../../../../../config/utils'

export default function PostForm(props) {
    const myProfile = props.myProfile

    const [postContent, setPostContent] = useState('')
    const [postFormImagePreview, setPostFormImagePreview] = useState(null)

    const handlePostContentChange = e => {
        setPostContent(e.target.value)
        const el = document.querySelector('#post-form-submit-btn')
        el.disabled = e.target.value.trim() === '' && !postFormImagePreview
    }

    const handlePostImageChange = e => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPostFormImagePreview(reader.result)
                document.querySelector('#post-img-container').style.display = 'initial'
                document.querySelector('#post-form-submit-btn').disabled = false
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch {

        }
    }

    const handleCloseImage = () => {
        document.querySelector('#post-img-container').style.display = 'none'
        document.querySelector('#post-image').value = ''
        if (postContent.trim() === '') document.querySelector('#post-form-submit-btn').disabled = true
        setPostFormImagePreview(null)
    }

    const onEmojiSelect = (event, emojiObject) => {
        setPostContent(postContent + emojiObject.emoji)
        document.querySelector('#post-form-submit-btn').disabled = false
    }
    function getScrollHeight(elm){
        var savedValue = elm.value
        elm.value = ''
        elm._baseScrollHeight = elm.scrollHeight
        elm.value = savedValue
      }
      
      function onExpandableTextareaInput({ target:elm }){
        // make sure the input event originated from a textarea and it's desired to be auto-expandable
        if( !elm.classList.contains('autoExpand') || !elm.nodeName == 'TEXTAREA' ) return
        
        var minRows = elm.getAttribute('data-min-rows')|0, rows;
        !elm._baseScrollHeight && getScrollHeight(elm)
      
        elm.rows = minRows
        rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
        elm.rows = minRows + rows
      }
      
      
      // global delegated event listener
      document.addEventListener('input', onExpandableTextareaInput)
      
      

    return (
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
                        src={`${SERVER_URL}${myProfile.photo}`}
                        className="profile-img-med"
                    />
                </Link>
                <textarea
                    className="post-content-textarea"
                    class='autoExpand' 
                    rows='3' 
                    data-min-rows='3' 
                    name="post-content"
                    value={postContent}
                    placeholder="O que passa pela sua cabeça?"
                    maxLength={300}
                    onChange={handlePostContentChange}
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
                            onClick={handleCloseImage}
                        />
                    </div>
                    <img
                        src={postFormImagePreview}
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
                        onChange={handlePostImageChange}
                    />
                    <label
                        className="far fa-smile"
                        id="emoji-button"
                        onClick={() => openCloseEmojiList(false)}
                    />
                    <div className="emoji-list-container" id="emoji-list-container">
                        <Picker onEmojiClick={onEmojiSelect} />
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
    )
}