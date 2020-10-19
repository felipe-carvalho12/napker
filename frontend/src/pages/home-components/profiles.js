import React, { useEffect, useState } from 'react'
import Profile from './profile'
import { serverURL } from '../../utils'

export default function Profiles() {
    const [profiles, setProfiles] = useState([])
    const [search, setSearch] = useState('')
    const [hasProfileInFocus, setHasProfileInFocus] = useState(false)
    const [profileInFocus, setProfileInFocus] = useState(null)

    useEffect(() => {
        let url
        if (search === '') {
            url = `${serverURL}/profile-api/profile-list`
        } else {
            url = `${serverURL}/profile-api/users/${search}`
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
        if (btn.innerHTML === 'Solicitar') {
            btn.innerHTML = 'Solicitado'
            btn.className = 'btn btn-primary'
        } else {
            btn.innerHTML = 'Solicitar'
            btn.className = 'btn btn-secondary'
        }
    }

    const viewProfile = username => {
        setProfileInFocus(username)
        setHasProfileInFocus(true)
    }

    return (
        <>
            <Profile open={hasProfileInFocus} profileUsername={profileInFocus} onHide={() => setHasProfileInFocus(false)}/>
            <div className="form-row d-inline-block">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Pesquisar" style={{ width: '400px' }} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="list-group">
                {profiles ? profiles.map(profile => {
                    return (
                        <li className="list-group-item profile-row" key={profile.id} onClick={() => viewProfile(profile.user.username)}>
                            <div className="d-flex justify-content-between">
                                <div className="profile-col">
                                    <img src={`${serverURL}${profile.photo}`} />
                                    <div className="main-profile-data">
                                        <strong>{profile.first_name} {profile.last_name}</strong>
                                        <p className="text-secondary">@{profile.user.username}</p>
                                    </div>
                                </div>
                                <div className="profile-col">
                                    {profile.bio}
                                </div>
                                <div className="profile-col">
                                    <button className="btn btn-secondary" data-userid={profile.user.id} onClick={friendRequest}>Solicitar</button>
                                </div>
                            </div>
                        </li>
                    )
                }) : <></>}
            </div>
        </>
    )
}