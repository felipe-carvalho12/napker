import React, { useState } from 'react'

import PostListItem from '../../../../../../../../components/PostListItem'
import PostForm from '../../../components/PostForm'


export default function CommentListItem(props) {
    const post = props.post
    const comment = props.comment
    const myProfile = props.myProfile
    const renderParent = props.renderParent

    const [displayingComments, setDisplayingComments] = useState(false)
    const [displayingForm, setDisplayingForm] = useState(false)

    const colors = ['#5454fe', '#33fe66', '#fe4545', '#fefe45', 'var(--primary-grey)']
    const borderLeft = comment.layer ?
        `5px solid ${colors[comment.layer - 1 >= colors.length ? (comment.layer - 1) % colors.length : comment.layer - 1]}`
        : 'unset'

    const showHideComments = e => {
        e.stopPropagation()
        setDisplayingComments(!displayingComments)
    }

    return (
        <div style={{ marginLeft: '25px' }}>
            <PostListItem
                type='comment'
                post={comment}
                myProfile={myProfile}
                isLink={false}
                renderParent={renderParent}
                displayingComments={displayingComments}
                showHideForm={() => setDisplayingForm(!displayingForm)}
                showHideComments={showHideComments}
                style={{ borderLeft: borderLeft }}
            />
            {displayingForm &&
                <PostForm
                    type='comment'
                    myProfile={myProfile}
                    renderParent={renderParent}
                    postId={post.id}
                    parentCommentId={comment.id}
                    hideForm={() => setDisplayingForm(false)}
                />
            }
            {(comment.comments && displayingComments) && comment.comments.map(c => {
                return (
                    <CommentListItem
                        post={post}
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