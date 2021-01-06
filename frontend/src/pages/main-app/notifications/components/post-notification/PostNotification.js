import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import NotificationContent from './components/NotificationContent'


export default function PostNotification(props) {
    const notification = props.notification
    const post = notification.post

    useEffect(() => {
        renderLabel(notification.likes, 'like')
        renderLabel(notification.comments, 'comment')
    }, [])

    const renderLabel = (arr, type) => {
        const el = document.getElementById(type)
        let str = ''
        const len = arr.length < 3 ? arr.length : 3

        for (let i = 1; i <= len; i++) {
            const author = arr[arr.length - i].author || arr[arr.length - i].profile
            if (type === 'comment') {
                var typeLabel = arr.length === 1 ? 'comentou' : 'comentaram'
            } else if (type === 'like') {
                var typeLabel = arr.length === 1 ? 'curtiu' : 'curtiram'
            }
            str += `
            <strong>@${author.user.username}</strong>
            ${i < len ? ', ' : (arr.length > 3 ? 'e outras <strong>' + (arr.length - 3).toString() + '</strong> pessoas ' : '') + typeLabel + ' seu post.'}
            `
        }

        el.innerHTML = str
    }

    return (
        <div>
            <li
                className="d-flex flex-column w-100 white-hover"
                key={notification.id}
            >
                <div
                    className="d-flex flex-column w-100 white-hover b-theme-base-color b-bottom"
                    style={{ padding: '15px 15px' }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong>POST</strong>
                        <span>{post.created.split('-').reverse().join('/')}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-column align-items-start mb-2">
                            {!!notification.likes.length &&
                                <span id="like"></span>
                            }
                            {!!notification.comments.length &&
                                <span id="comment"></span>
                            }
                        </div>
                        <span style={{ textAlign: 'start' }}>
                            {`${post.content.slice(0, 240)}${post.content.length > 240 && '...'}`}
                        </span>
                        <div className="d-flex justify-content-end w-100">
                            <Link to={`/post/${post.id}`}>
                                <button className="btn btn-primary" style={{ height: '37px', width: '100px' }}>
                                    Ver Post
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <NotificationContent type='likes' arr={notification.likes} />
                <NotificationContent type='comments' arr={notification.comments} />
            </li>
        </div>
    )
}