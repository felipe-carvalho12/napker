import React from 'react'
import { Link } from 'react-router-dom'

export default function Interests(props) {
    const profile = props.profile

    return (
        <div className="interests-page-container">
            <h3>Interesses públicos de {profile.first_name}</h3>
            <div>
                {profile && profile.interests.filter(i => i.public).map(interest => {
                    return (
                        <>
                            {interest.title &&
                                <>
                                    <hr />
                                    <li className="interest-item">
                                        {interest.title[0].toUpperCase() + interest.title.slice(1)}
                                        <Link to={`/interesses/${interest.title}`}>
                                            <button className="btn-secondary" style={{ padding: '5px' }}>Pesquisar usuários</button>
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