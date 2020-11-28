import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../config/settings'

export default function ProfileListItem(props) {
    const profile = props.profile
    const myProfile = props.myProfile

    return (
        <Link to={profile.id === myProfile.id ?
            '/perfil' : `/user/${profile.slug}`}
            style={{ color: '#000', textDecoration: 'none' }}
        >
            <li
                className="list-group-item profile-row filtered-profile profile-profile-list-item"
                key={profile.id}
                style={props.style}
                onClick={props.onClick}
            >
                <div className="d-flex">
                    <div className="profile-img-container">
                        <img src={`${SERVER_URL}${profile.photo}`}
                            className="profile-img-med"
                            style={{ marginRight: '10px' }}
                        />
                    </div>
                    <div className="d-flex flex-column w-100">
                        <div className="profile-row-top">
                            <div className="main-profile-data">
                                <strong style={{ textAlign: 'start' }}>
                                    {profile.first_name} {profile.last_name}
                                </strong>
                                <p className="text-secondary">@{profile.user.username}</p>
                            </div>
                        </div>
                        <div className="profile-row-bottom">
                            {profile.bio}
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    )
}