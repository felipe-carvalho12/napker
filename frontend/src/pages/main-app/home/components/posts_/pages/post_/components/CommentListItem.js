import React from 'react'

import PostListItem from '../../../../../../../../components/PostListItem'


export default function CommentListItem(props) {
    const comment = props.comment
    const myProfile = props.myProfile
    const renderParent = props.renderParent

    const colors = ['#00f', '#0f0', '#f00', '#fa0', 'var(--primary-grey)']
    const borderLeft = comment.layer ?
        `5px solid ${colors[comment.layer - 1 >= colors.length ? colors.length - 1 : comment.layer - 1]}`
        : 'unset'

    return (
        <div style={{ marginLeft: `${comment.layer * 20}px` }}>
            <PostListItem
                type='comment'
                post={comment}
                myProfile={myProfile}
                isLink={false}
                renderParent={renderParent}
                style={{ borderLeft: borderLeft }}
            />
            {comment.comments && comment.comments.map(c => {
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