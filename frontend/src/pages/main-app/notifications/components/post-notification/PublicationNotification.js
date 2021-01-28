import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { renderTimestamp, getThumbnailSrc } from '../../../../../config/utils'
import NotificationContent from './components/NotificationContent'
import PostTextbox from '../../../home/components/posts_/components/components/post-textbox/PostTextbox'


export default function PublicationNotification(props) {
    const notification = props.notification
    const type = props.type

    if (type === 'post') {
        var publication = notification.post
    }
    else if (type === 'comment') {
        var publication = notification.comment
    }

    const comments = (type === 'post' ? publication.details.comments : publication.comments)

    const isMobile = visualViewport.width <= 980
    const parsedContent = JSON.parse(publication.content)

    const history = useHistory()

    const publicationContentFormatter = rawContent => {
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

        return rawContent
    }

    useEffect(() => {
        renderLabel(publication.details.likes, 'like')
        renderLabel(comments, 'comment')
    }, [props.notification])

    const renderLabel = (arr, type_) => {
        const el = document.getElementById(`${notification.id}${type_}`)
        if (!el) return
        let str = ''
        const len = arr.length < 3 ? arr.length : 3

        for (let i = 0; i < len; i++) {
            const author = arr[i].profile || arr[i].details.author
            if (type_ === 'comment') {
                var typeLabel = arr.length === 1 ? type === 'post' ? 'comentou' : 'respondeu' : type === 'post' ? 'comentaram' : 'responderam'
            } else if (type_ === 'like') {
                var typeLabel = arr.length === 1 ? 'curtiu' : 'curtiram'
            }
            const publicationType = type === 'post' ? type : 'comentário.'
            str += `
            <strong>@${author.user.username}</strong>
            ${i < len - 1 ? ', ' : (arr.length > 3 ? 'e outras <strong>' + (arr.length - 3).toString() + '</strong> pessoas ' : '') + typeLabel + ' seu ' + publicationType}
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
                    style={{ padding: "var(--sz-1)" }}
                    onClick={() => history.push(`/post/${publication.id}`)}
                >
                    <div className="d-flex justify-content-between align-items-center mb-10px">
                        <Link to={`/post/${publication.id}`}>
                            <strong style={{ fontSize: "20px", color: "var(--primary-grey)" }}>{type === 'post' ? 'POST' : 'COMENTÁRIO'}</strong>
                        </Link>
                        <span>{renderTimestamp(publication.details.created)}</span>
                    </div>
                    <div className="d-flex">
                        <div className="d-flex flex-column justify-content-between w-100">
                            <div className={`d-flex justify-content-between align-items-start w-100 ${isMobile ? 'flex-column' : ''}`}>
                                {parsedContent.blocks.map(block => block.text).join('') !== '' &&
                                    <span className={`w-${isMobile ? '100' : '50'} mb-10px`} style={{ textAlign: 'start' }}>
                                        <PostTextbox
                                            editable={false}
                                            postContent={parsedContent}
                                            contentFormatter={publicationContentFormatter}
                                        />
                                    </span>
                                }
                                {publication.image &&
                                    <img src={publication.image} className="mb-10px" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '20px' }} />
                                }
                                {publication.video &&
                                    <img src={getThumbnailSrc(publication.video)} className="mb-10px" style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '20px' }} />
                                }
                            </div>
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex align-items-start mb-10px notification-authors-container">
                                    {!!publication.details.likes.length &&
                                        <span className="mr-1" id={`${notification.id}like`}></span>
                                    }
                                    {!!comments.length &&
                                        <span className="mr-1" id={`${notification.id}comment`}></span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContent type='likes' publicationType={type} arr={publication.details.likes} />
                <NotificationContent type='comments' publicationType={type} arr={comments} commentContentFormatter={publicationContentFormatter} />
            </li>
        </div>
    )
}