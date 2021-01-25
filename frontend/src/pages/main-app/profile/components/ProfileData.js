import React from 'react'
import { Link } from 'react-router-dom'


export default function ProfileData(props) {
    const profile = props.profile

    return (
        <div className="profile-data-container">
            <div className="d-flex flex-column align-items-start word-break" style={{ textAlign: 'start', maxWidth: '50%' }}>
                <p>
                    <img src={profile.photo}
                        className="profile-img-big"
                        style={{ marginBottom: '25px' }}
                    />
                </p>
                <p style={{ marginBottom: 0 }}><strong>{profile.first_name} {profile.last_name}</strong></p>
                <p className="text-secondary" style={{ marginTop: 0 }}>@{profile.user.username}</p>
                <p>{profile.bio}</p>
                <p className="text-secondary joined-date">
                    <i className="far fa-calendar-alt"></i> Entrou em {profile.created.split('-').reverse().join('/')}
                </p>
                <p>
                    <Link to={`/user/${profile.user.username}/amigos`} style={{ color: "var(--primary-grey)" }}>
                        <strong>{profile.friends.length}</strong> <span className="text-secondary">{profile.friends.length === 1 ? 'amigo' : 'amigos'}</span>
                    </Link>
                </p>
            </div>
            {props.children}
        </div>
    )
}