import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { renderTimestamp } from '../../../../../../config/utils'
import PostTextbox from '../../../../home/components/posts_/components/components/post-textbox/PostTextbox'


export default function NotificationContent(props) {
    const type = props.type
    const arr = props.arr
    const commentContentFormatter = props.commentContentFormatter ? props.commentContentFormatter : false

    const [isOpen, setIsOpen] = useState(false)

    if (type == "likes") {
        var icon = "fas fa-heart"
        var color = 'var(--heart-color)'
    } else if (type === 'comments') {
        var icon = "fas fa-comment"
        var color = 'var(--primary-color)'
    }

    return (
        <div style={{ marginLeft: '20px' }}>
            <div className="d-flex align-items-center w-100 b-theme-base-color box-sm" style={{ fontSize: '16px', fontWeight: '500' }}>
                {isOpen ?
                    <i
                        className="material-icons-sharp icon base-hover text-secondary"
                        style={{ width: '25px', height: '25px' }}
                        onClick={() => setIsOpen(false)}
                    >
                        keyboard_arrow_down</i>
                    :
                    <i
                        className="material-icons-sharp icon base-hover text-secondary"
                        style={{ width: '25px', height: '25px' }}
                        onClick={() => setIsOpen(true)}
                    >
                        keyboard_arrow_right</i>
                }
                <span className="p-2">{type === 'likes' ? 'Curtidas' : 'Comentários'} ({arr.length})</span>
            </div>
            {isOpen &&
                <div style={{ marginLeft: '20px' }}>
                    {arr.map(item => {
                        const author = item.author || item.profile

                        return (
                            <li className="d-flex w-100 white-hover box-med b-theme-base-color" style={{ padding: '15px 15px' }}
                                key={author.id}
                            >
                                <div className="d-flex flex-column h-100" style={{ marginRight: '10px' }}>
                                    <i class={icon} style={{ fontSize: '30px', color: color }} />
                                </div>
                                <div className="d-flex flex-column justify-content-start align-items-start h-100 w-100">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Link to={`/user/${author.slug}`}>
                                            <img src={author.photo}
                                                className="profile-img-med"
                                                style={{ marginRight: '10px' }}
                                            />
                                        </Link>
                                        <p className="text-secondary d-inline-block" style={{ margin: '0' }}>
                                            {renderTimestamp(item.created)}
                                            {" • "}
                                            <Link to={`/user/${author.slug}`} style={{ color: "var(--primary-grey)" }}>
                                                @{author.user.username}
                                            </Link> {type === 'likes' ? 'curtiu' : 'comentou'} seu post.
                                        </p>
                                    </div>
                                    {item.content &&
                                        <div className="d-flex justify-content-start word-break w-100"
                                            style={{ paddingTop: '10px' }}
                                        >
                                            <PostTextbox
                                                editable={false}
                                                postContent={JSON.parse(item.content)}
                                                contentFormatter={commentContentFormatter}
                                            />
                                        </div>
                                    }
                                </div>
                            </li>
                        )
                    })}
                </div>
            }
        </div>
    )
}