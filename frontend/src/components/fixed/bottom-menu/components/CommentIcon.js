import React from 'react'
import { Link } from 'react-router-dom'

export default props => (
    <Link to={`/post/${props.postId}/comentar`}>
        <i className="far fa-comment bottom-menu-action-icon btn-primary" />
    </Link>
)