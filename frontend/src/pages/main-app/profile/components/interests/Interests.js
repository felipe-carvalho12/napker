import React from 'react'
import { Link } from 'react-router-dom'

export default function Interests(props) {
    const profile = props.profile

    return (
        <div className="b-top-radius b-bottom-radius p-10px" style={{ background: 'var(--theme-base-color)' }}>
            <h3 className="c-secondary-grey fw-200 fs-27 m-0">Interesses públicos de {profile.first_name}</h3>
            <div className="interest-list-container">
                {profile && profile.interests.filter(i => i.public).map(interest => {
                    return (
                        <>
                            {interest.title &&
                                <>
                                    <li
                                        className="w-100 d-flex justify-content-between align-items-center p-3"
                                        style={{ minHeight: '50px', fontSize: 'large' }}
                                    >
                                        {interest.title[0].toUpperCase() + interest.title.slice(1)}
                                        <Link to={`/interesses/${interest.title}`}>
                                            <button className="btn btn-secondary" style={{ padding: 'var(--sz-0)' }}>Pesquisar usuários</button>
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