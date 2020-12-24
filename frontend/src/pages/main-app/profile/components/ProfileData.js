import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../../../../config/settings'

export default function ProfileData(props) {
    const profile = props.profile

    return (
        <div className="profile-data-container">
            <div className="d-flex flex-column align-items-start" style={{ textAlign: 'start' }}>
                <p>
                    <img src={`${SERVER_URL}${profile.photo}`}
                        className="profile-img-big"
                        style={{ marginBottom: '25px' }}
                    />
                </p>
                <p style={{ marginBottom: 0 }}><strong>{profile.first_name} {profile.last_name}</strong></p>
                <p className="text-secondary" style={{ marginTop: 0 }}>@{profile.user.username}</p>
                <p>{profile.bio}</p>
                <p className="text-secondary">
                    <i className="far fa-calendar-alt"></i> Entrou em {profile.created.split('-').reverse().join('/')}
                </p>
                <p>
                    <Link to={`/user/${profile.slug}/amigos`} style={{ color: '#000' }}>
                        <strong>{profile.friends.length}</strong> {profile.friends.length === 1 ? 'amigo' : 'amigos'}
                    </Link>
                </p>
            </div>
            {props.children}
        </div>
    )
}