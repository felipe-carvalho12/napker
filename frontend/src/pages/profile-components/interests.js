import React from 'react'

export default function Interests(props) {
    const profile = props.profile

    return (
        <div className="interests-page-container">
            <h3>Interesses públicos de {profile.first_name}</h3>
            <div>
                {profile && profile.interests.map(interest => {
                    return (
                        <>
                            {interest.title &&
                                <>
                                    <hr />
                                    <li className="interest-item">
                                        {interest.title[0].toUpperCase() + interest.title.slice(1)}
                                        <button className="btn-secondary" style={{ padding: '5px' }}>Pesquisar usuários</button>
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