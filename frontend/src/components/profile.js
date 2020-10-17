import React, { useEffect, useState } from 'react'

export default function Profile() {
    const [profile, setProfile] = useState({ user: '', interests: [], created: '', friends: [] })
    const profilePhotoStyle = {
        borderRadius: '50%',
        display: 'inline-block',
        transform: 'scale(1.5)'
    }
    useEffect(() => {
        fetch('http://localhost:8000/profile-api/myprofile')
            .then(response => response.json())
            .then(data => setProfile(data))
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center profile-data-container">
                <div className="d-flex flex-column align-items-start">
                    <p style={{ padding: '15px' }}><img src={`http://localhost:8000${profile.photo}`} style={profilePhotoStyle} /></p>
                    <p style={{ marginBottom: 0 }}><strong>{profile.first_name} {profile.last_name}</strong></p>
                    <p className="text-secondary" style={{ marginTop: 0 }}>@{profile.user.username}</p>
                    <p>{profile.bio}</p>
                    <p className="text-secondary">
                        <i className="far fa-calendar-alt"></i> Entrou em {profile.created.split('-').reverse().join('/')}
                    </p>
                    <p><strong>{profile.friends.length}</strong> {profile.friends.length === 1 ? 'amigo' : 'amigos'}</p>
                </div>
                <div>
                    <button className="btn btn-secondary">Editar perfil</button>
                </div>
            </div>
        </div>
    )
}