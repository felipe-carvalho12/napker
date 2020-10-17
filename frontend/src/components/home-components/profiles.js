import React, { useEffect, useState } from 'react'

export default function Profiles() {
    const [profiles, setProfiles] = useState([{ user: '' }])
    const [search, setSearch] = useState('')

    useEffect(() => {
        let url
        if (search === '') {
            url = 'http://localhost:8000/profile-api/profile-list'
        } else {
            url = `http://localhost:8000/profile-api/users/${search}`
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProfiles(data)
            })
            .catch(e => console.log(e))
    }, [search])

    const friendRequest = e => {
        const btn = e.target
        fetch('http://localhost:8000/profile-api/myprofile')
            .then(response => response.json())
            .then(data => {
                let userProfile = data
                if (userProfile.friends.includes(btn.dataset.userid)) {
                    console.log('friends')
                }
                if (btn.innerHTML === 'Solicitar') {
                    btn.innerHTML = 'Solicitado'
                    btn.className = 'btn btn-primary'
                } else {
                    btn.innerHTML = 'Solicitar'
                    btn.className = 'btn btn-secondary'
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <form>
                <div className="form-row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Pesquisar" onChange={e => setSearch(e.target.value)}/>
                    </div>
                </div>
            </form>
            <div className="list-group">
                {profiles.map(profile => {
                    return (
                        <li className="list-group-item profile-row" key={profile.id}>
                            <div className="d-flex justify-content-between">
                                <div className="profile-col">
                                    <img src={`http://localhost:8000${profile.photo}`} />
                                    <div className="main-profile-data">
                                        <strong>{profile.first_name} {profile.last_name}</strong>
                                        <p className="text-secondary">@{profile.user.username}</p>
                                    </div>
                                </div>
                                <div className="profile-col">
                                    {profile.bio}
                                </div>
                                <div className="profile-col">
                                    <button className="btn btn-secondary" data-userid={profile.user.id} onClick={e => friendRequest(e)}>Solicitar</button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </div>
        </>
    )
}