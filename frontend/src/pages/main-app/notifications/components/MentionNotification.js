import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { renderTimestamp } from '../../../../config/utils'
import PostTextbox from '../../home/components/posts_/components/components/post-textbox/PostTextbox'


export default function MentionNotification(props) {
    const type = props.type
    const mention = props.mention
    const publicationDetails = mention.publication
    const publication = type === 'post' ? publicationDetails.post : publicationDetails.comment
    const publicationContentFormatter = props.publicationContentFormatter

    return (
        <li
            className="d-flex w-100 white-hover box-med b-theme-base-color p-10px"
            key={mention.id}
        >
            <div className="d-flex flex-column h-100" style={{ marginRight: '10px' }}>
                <i class="fas fa-at" style={{ fontSize: '30px', color: 'var(--primary-color)' }} />
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start h-100 w-100">
                <div className="d-flex justify-content-center align-items-center">
                    <Link to={`/user/${publicationDetails.author.user.username}`}>
                        <img src={publicationDetails.author.photo}
                            className="profile-img-med"
                            style={{ marginRight: '10px' }}
                        />
                    </Link>
                    <div className="d-flex flex-column align-items-start">
                        {type === 'comment' &&
                            <div>
                                <div className="d-flex">
                                    <span className="mr-1">Camada</span>
                                    <strong>{publicationDetails.layer}</strong>
                                </div>
                            </div>
                        }
                        <p className="text-secondary d-inline-block" style={{ margin: '0' }}>
                            {renderTimestamp(publicationDetails.created)}
                            {" • "}
                            <Link to={`/user/${publicationDetails.author.user.username}`}
                                style={{ color: "var(--primary-grey)" }}
                            >
                                @{publicationDetails.author.user.username}
                            </Link> {`Marcou você em um ${type === 'comment' ? 'comentário' : 'post'}`}.
                                </p>
                    </div>
                </div>
                {publication.content &&
                    <div className="d-flex justify-content-start word-break w-100"
                        style={{ paddingTop: '10px' }}
                    >
                        <PostTextbox
                            editable={false}
                            postContent={JSON.parse(publication.content)}
                            contentFormatter={publicationContentFormatter}
                        />
                    </div>
                }
            </div>
        </li>
    )
}