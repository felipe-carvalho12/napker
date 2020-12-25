import React from 'react'
import { Link } from 'react-router-dom'

export default function Interests(props) {
    const profile = props.profile

    return (
        <div style={{ background: 'var(--theme-base-color)' }}>
            <h3 className="p-3 b-bottom">Interesses públicos de {profile.first_name}</h3>
            <div className="interest-list-container">
                {profile && profile.interests.filter(i => i.public).map(interest => {
                    return (
                        <>
                            {interest.title &&
                                <>
                                    <li
                                        className="w-100 d-flex justify-content-between align-items-center p-3 b-bottom"
                                        style={{ minHeight: '50px', fontSize: 'large' }}
                                    >
                                        {interest.title[0].toUpperCase() + interest.title.slice(1)}
                                        <Link to={`/interesses/${interest.title}`}>
                                            <button className="btn btn-secondary" style={{ padding: '5px' }}>Pesquisar usuários</button>
                                        </Link>
                                    </li>
                                </>
                            }
                        </>
                    )
                })}
            </div>
        </div>
    )
}