import React, { useState } from 'react'

import PostListItem from '../../../../../../../components/PostListItem'
import PostForm from '../../components/PostForm'


export default function CommentListItem(props) {
    const comment = props.comment
    const myProfile = props.myProfile
    const renderParent = props.renderParent

    const [displayingComments, setDisplayingComments] = useState(false)
    const [displayingForm, setDisplayingForm] = useState(false)

    const colors = ['#5454fe', '#33fe66', '#fe4545', '#fefe45', 'var(--primary-grey)']

    const color = i => {
        return (
            colors[comment.details.layer - i >= colors.length ? (comment.details.layer - i) % colors.length : comment.details.layer - i]
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
                openLikesModal={props.openLikesModal}
                setLikesModalItems={props.setLikesModalItems}
                level={color(1)}
            />
            {displayingForm &&
                <div className="d-flex box-med b-theme-base-color b-vw-t py-0 px-10px" style={{ marginLeft: "30px" }}>
                    <div style={{ height: "inherit", width: "5px", background: color(0) }} />
                    <div className="w-100 pl-10px py-10px">
                        <PostForm
                            type='comment'
                            renderParent={renderParent}
                            parent={comment}
                            hideForm={() => setDisplayingForm(false)}
                        />
                    </div>
                </div>
            }
            {(comment.first_layer_comments && displayingComments) && comment.first_layer_comments.map(c => {
                return (
                    <CommentListItem
                        comment={c}
                        myProfile={myProfile}
                        renderParent={renderParent}
                        openLikesModal={props.openLikesModal}
                        setLikesModalItems={props.setLikesModalItems}
                    />
                )
            })
            }
        </div>
    )
}