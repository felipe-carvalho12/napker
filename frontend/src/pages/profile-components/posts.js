import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../../components/header'
import { SERVER_URL } from '../../settings'

export default function Posts(props) {
    const profile = props.profile

    const likeUnlikePost = e => {
        const likeBtn = e.target
        if (likeBtn.classList.contains('fas')) {
            likeBtn.classList.remove('fas') //border heart
            likeBtn.classList.add('far')  //filled heart
            fetch(`${SERVER_URL}/post-api/unlike-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.fetchProfile()
                })
        } else {
            likeBtn.classList.remove('far') //border heart
            likeBtn.classList.add('fas')  //filled heart
            fetch(`${SERVER_URL}/post-api/like-post/${likeBtn.dataset.postid}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    props.fetchProfile()
                })
        }
    }

    return (
        <>
            <div className="post-list">
                {profile && profile.posts.length ? profile.posts.map(post => {
                    return (
                        <li className="post-container" key={post.id}>
                            <div className="post-row">
                                <div className="post-col">
                                    <img src={`${SERVER_URL}${profile.photo}`}
                                        className="profile-img-med"
                                    />
                                </div>
                                <div className="post-col">
                                    <div style={{ height: '30px' }}>
                                        <strong>{profile.first_name} {profile.last_name} </strong>
                                        <p className="text-secondary d-inline-block">
                                            @{profile.user.username} • {post.created.split('-').reverse().join('/')}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'start' }}>
                                        {post.content}
                                    </div>
                                    {post.image &&
                                        <img src={`${SERVER_URL}${post.image}`} className="post-img" />
                                    }
                                </div>
                            </div>
                            <div className="post-actions">
                                <p className="text-secondary">
                                    <i class="far fa-comment" />{post.comments.length}
                                    {post.likes.includes(profile.id) ?
                                        <i class="fas fa-heart"
                                            data-postid={post.id}
                                            onClick={likeUnlikePost}
                                        />
                                        :
                                        <i class="far fa-heart"
                                            data-postid={post.id}
                                            onClick={likeUnlikePost}
                                        />}{post.likes.length}
                                </p>
                            </div>
                        </li>
                    )
                }) : <h3 style={{ marginTop: '50px' }}>{profile.first_name} não tem posts</h3>}
            </div>
        </>
    )
}