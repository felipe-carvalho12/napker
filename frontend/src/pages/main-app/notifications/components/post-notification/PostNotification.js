import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { renderTimestamp, getThumbnailSrc } from '../../../../../config/utils'
import NotificationContent from './components/NotificationContent'
import PostTextbox from '../../../home/components/posts_/components/components/post-textbox/PostTextbox'


export default function PostNotification(props) {
    const notification = props.notification
    const post = notification.post

    const history = useHistory()

    useEffect(() => {
        renderLabel(notification.likes, 'like')
        renderLabel(notification.comments, 'comment')
    }, [props.notification])

    const renderLabel = (arr, type) => {
        const el = document.getElementById(`${notification.id}${type}`)
        if (!el) return
        let str = ''
        const len = arr.length < 3 ? arr.length : 3

        for (let i = 0; i < len; i++) {
            const author = arr[i].author || arr[i].profile
            if (type === 'comment') {
                var typeLabel = arr.length === 1 ? 'comentou' : 'comentaram'
            } else if (type === 'like') {
                var typeLabel = arr.length === 1 ? 'curtiu' : 'curtiram'
            }
            str += `
            <strong>@${author.user.username}</strong>
            ${i < len - 1 ? ', ' : (arr.length > 3 ? 'e outras <strong>' + (arr.length - 3).toString() + '</strong> pessoas ' : '') + typeLabel + ' seu post. '}
            `
        }

        el.innerHTML = str
    }

    return (
        <div>
            <li
                className="d-flex flex-column w-100"
                key={notification.id}
            >
                <div
                    className="d-flex flex-column w-100 base-hover b-theme-base-color box-sm"
                    style={{ padding: '15px 15px' }}
                    onClick={() => history.push(`/post/${post.id}`)}
                >
                    <div className="d-flex justify-content-between align-items-center mb-10px">
                        <Link to={`/post/${post.id}`}>
                            <strong style={{ fontSize: "20px", color: "var(--primary-grey)" }}>POST</strong>
                        </Link>
                        <span>{renderTimestamp(post.created)}</span>
                    </div>
                    <div className="d-flex">
                        <div className="d-flex flex-column justify-content-between w-100">
                            <div className="d-flex justify-content-between w-100">
                                <span className="w-50 mb-10px" style={{ textAlign: 'start' }}>
                                    <PostTextbox
                                        editable={false}
                                        postContent={JSON.parse(post.content)}
                                        postContentFormatter={postContent => `${postContent.slice(0, 240)}${postContent.length > 240 && '...'}`}
                                    />
                                </span>
                                {post.image &&
                                    <img src={post.image} className="mb-10px" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '20px' }} />
                                }
                                {post.video &&
                                    <img src={getThumbnailSrc(post.video)} style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '20px' }} />
                                }
                            </div>
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex align-items-start mb-10px notification-authors-container">
                                    {!!notification.likes.length &&
                                        <span className="mr-1" id={`${notification.id}like`}></span>
                                    }
                                    {!!notification.comments.length &&
                                        <span className="mr-1" id={`${notification.id}comment`}></span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContent type='likes' arr={notification.likes} />
                <NotificationContent type='comments' arr={notification.comments} />
            </li>
        </div>
    )
}