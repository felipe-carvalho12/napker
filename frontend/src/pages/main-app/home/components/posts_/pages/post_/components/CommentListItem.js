import React, { useState } from 'react'

import PostListItem from '../../../../../../../../components/PostListItem'


export default function CommentListItem(props) {
    const comment = props.comment
    const myProfile = props.myProfile
    const renderParent = props.renderParent

    const [showComments, setShowComments] = useState(true)

    const colors = ['#5454fe', '#33fe66', '#fe4545', '#fefe45', 'var(--primary-grey)']
    const borderLeft = comment.layer ?
        `5px solid ${colors[comment.layer - 1 >= colors.length ? colors.length - 1 : comment.layer - 1]}`
        : 'unset'

    const showHideComments = e => {
        e.stopPropagation()
        setShowComments(!showComments)
    }

    return (
        <div style={{ marginLeft: `${comment.layer * 20}px` }}>
            <PostListItem
                type='comment'
                post={comment}
                myProfile={myProfile}
                isLink={false}
                renderParent={renderParent}
                showComments={showComments}
                showHideComments={showHideComments}
                style={{ borderLeft: borderLeft }}
            />
            {(comment.comments && showComments) && comment.comments.map(c => {
                return (
                    <CommentListItem
                        comment={c}
                        myProfile={myProfile}
                        renderParent={renderParent}
                    />
                )
            })
            }
        </div>
    )
}