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
    
    const borderLeft = i => {
        return (
            `5px solid ${comment.layer != undefined ? colors[comment.layer - i >= colors.length ? (comment.layer - i) % colors.length : comment.layer - i] : "var(--background)"}`
        )
    }

    const showHideComments = e => {
        e.stopPropagation()
        setDisplayingComments(!displayingComments)
    }

    return (
        <div style={{ marginLeft: '30px' }}>
            <PostListItem
                type='comment'
                post={comment}
                myProfile={myProfile}
                isLink={false}
                renderParent={renderParent}
                displayingComments={displayingComments}
                showHideForm={() => setDisplayingForm(!displayingForm)}
                showHideComments={showHideComments}
                style={{ borderLeft: borderLeft(1) }}
            />
            {displayingForm &&
                <div style={{ marginLeft: "30px", borderLeft: borderLeft(0) }}>
                    <PostForm
                        type='comment'
                        myProfile={myProfile}
                        renderParent={renderParent}
                        postId={post.id}
                        parentComment={comment}
                        hideForm={() => setDisplayingForm(false)}
                    />
                </div>
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