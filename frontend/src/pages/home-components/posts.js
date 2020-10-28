import React, { useState } from 'react'

import { SERVER_URL } from '../../settings'
import { csrftoken } from '../../utils'

export default function Posts() {
    const [postContent, setPostContent] = useState('')

    const createPost = () => {
        fetch(`${SERVER_URL}/post-api/create-post`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(postContent)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPostContent('')
        })
    }

    return (
        <>
            <div className="form-row d-inline-block">
                <div className="col d-flex">
                    <input type="text"
                        className="form-control"
                        placeholder="O que está acontecendo?"
                        style={{ marginRight: '5px', width: '400px' }}
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                    />
                    <button className="btn btn-primary" style={{ marginBottom: '20px', borderRadius: '5px' }} onClick={createPost}>Postar</button>
                </div>
            </div>
            <div className="list-group">

            </div>
        </>
    )
}