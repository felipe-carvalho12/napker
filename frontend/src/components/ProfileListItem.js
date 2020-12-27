import React from 'react'
import { Link } from 'react-router-dom'

import { SERVER_URL } from '../config/settings'

export default function ProfileListItem(props) {
    const profile = props.profile
    const myProfile = props.myProfile

    const imgSize = props.imgSize || 'med'
    const bioLength = props.bioLength
    const bool = props.bool || true

    let bioWasRendered = false

    return (
        <Link to={profile.id === myProfile.id ?
            '/perfil' : `/user/${profile.slug}`}
            style={{ color: 'var(--primary-grey)', textDecoration: 'none' }}
        >
            <li
                className="position-relative d-flex flex-column border-0 b-bottom base-hover"
                key={profile.id}
                style={{ ...props.style, padding: '.75rem 1.25rem', background: 'var(--theme-base-color)' }}
                onClick={props.onClick}
            >
                <div className="d-flex">
                    <div className="profile-img-container">
                        <img src={`${SERVER_URL}${profile.photo}`}
                            className={`profile-img-${imgSize}`}
                            style={{ marginRight: '10px' }}
                        />
                    </div>
                    <div className="d-flex flex-column w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="main-profile-data">
                                <strong style={{ textAlign: 'start' }}>
                                    {profile.first_name} {profile.last_name}
                                </strong>
                                <p className="text-secondary m-0 mb-1">@{profile.user.username}</p>
                            </div>
                            {props.children}
                        </div>

                        {bioLength ?
                            <>
                                {(profile.bio.split('').slice(0, bioLength).length < 60 || bool) &&
                                    <div className="d-flex word-break">
                                        {bioWasRendered = true}
                                        {profile.bio.split('').slice(0, bioLength)}
                                        {profile.bio.split('').slice(0, bioLength).length < profile.bio.length && '...'}
                                    </div>
                                }
                            </>
                            :
                            <>
                                {(profile.bio.length < 60 || bool) &&
                                    <div className="d-flex word-break">
                                        {bioWasRendered = true}
                                        {profile.bio}
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
                {bioLength ?
                    <>
                        {(!bioWasRendered && (profile.bio.split('').slice(0, bioLength).length >= 60 || !bool)) &&
                            <div className="w-100 pt-2 word-break">
                                {profile.bio.split('').slice(0, bioLength)}
                                {profile.bio.split('').slice(0, bioLength).length < profile.bio.length && '...'}
                            </div>
                        }
                    </>
                    :
                    <>
                        {(!bioWasRendered && (profile.bio.length >= 60 || !bool)) &&
                            <div className="w-100 pt-2 word-break">
                                {profile.bio}
                            </div>
                        }
                    </>
                }
            </li>
        </Link>
    )
}