import React, { useEffect, useState } from 'react'

export default function Home() {
    const [profiles, setProfiles] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/profile/profile-list')
            .then(response => response.json())
            .then(data => {
                setProfiles(data)
            })
    }, [])

    return (
        <>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary">Perfis</button>
                <button type="button" class="btn btn-secondary">Posts</button>
            </div>
            {profiles.map(profile => {
                return (
                    <div key={profile.id}>{profile.first_name} {profile.last_name}</div>
                )
            })}
        </>
    )
}