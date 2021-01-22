import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { renderTimestamp, getThumbnailSrc } from '../../../../../config/utils'
import NotificationContent from './components/NotificationContent'
import PostTextbox from '../../../home/components/posts_/components/components/post-textbox/PostTextbox'


export default function PostNotification(props) {
    const notification = props.notification
    const post = notification.post

    const isMobile = visualViewport.width <= 980
    const parsedContent = JSON.parse(post.content)

    const history = useHistory()

    const postContentFormatter = rawContent => {
        const blocks = rawContent.blocks
        const length = blocks.reduce((total, block) => total + block.text.length, 0)

        if (length <= 240) return rawContent

        let totalLength = 0
        let reachedMaxLength = false
        const formattedBlocks = blocks.map(block => {
            if (reachedMaxLength) return

            totalLength += block.text.length
            if (totalLength > 240) {
                const remaining = 240 - (totalLength - block.text.length)
                reachedMaxLength = true
                return { ...block, text: block.text.slice(0, remaining) + '...' }
            }
            return block
        })

        rawContent.blocks = formattedBlocks

        console.log(formattedBlocks, rawContent)

        return rawContent
    }

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
                            <div className={`d-flex justify-content-between align-items-start w-100 ${isMobile ? 'flex-column' : ''}`}>
                                {parsedContent.blocks.map(block => block.text).join('') !== '' &&
                                    <span className={`w-${isMobile ? '100' : '50'} mb-10px`} style={{ textAlign: 'start' }}>
                                        <PostTextbox
                                            editable={false}
                                            postContent={parsedContent}
                                            contentFormatter={postContentFormatter}
                                        />
                                    </span>
                                }
                                {post.image &&
                                    <img src={post.image} className="mb-10px" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '20px' }} />
                                }
                                {post.video &&
                                    <img src={getThumbnailSrc(post.video)} className="mb-10px" style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '20px' }} />
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
                <NotificationContent type='comments' arr={notification.comments} commentContentFormatter={postContentFormatter} />
            </li>
        </div>
    )
}