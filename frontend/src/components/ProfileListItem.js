import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileListItem(props) {
    const profile = props.profile
    const myProfile = props.myProfile

    const imgSize = props.imgSize || 'med'
    const bioLength = props.bioLength
    const breakText = props.breakText == undefined ? 60 : props.breakText
    const bool = props.bool == undefined ? true : props.bool
    let bioWasRendered = false

    return (
        <Link to={profile.id === myProfile.id ?
            '/perfil' : `/user/${profile.slug}`}
            style={{ color: 'var(--primary-grey)', textDecoration: 'none', width: '100%' }}
        >
            <li
                className="position-relative d-flex flex-column border-0 b-bottom base-hover box-sm"
                key={profile.id}
                style={{ ...props.style, background: 'var(--theme-base-color)' }}
                onClick={props.onClick}
            >
                <div className="d-flex">
                    <div className="profile-img-container">
                        <img src={profile.photo}
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
                                {(profile.bio.split('').slice(0, bioLength).length < breakText || bool) &&
                                    <div className="d-flex word-break">
                                        {bioWasRendered = true}
                                        {profile.bio.split('').slice(0, bioLength)}
                                        {profile.bio.split('').slice(0, bioLength).length < profile.bio.length && '...'}
                                    </div>
                                }
                            </>
                            :
                            <>
                                {(profile.bio.length < breakText || bool) &&
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
                        {(!bioWasRendered && (profile.bio.split('').slice(0, bioLength).length >= breakText || !bool)) &&
                            <div className="w-100 pt-2 word-break">
                                {profile.bio.split('').slice(0, bioLength)}
                                {profile.bio.split('').slice(0, bioLength).length < profile.bio.length && '...'}
                            </div>
                        }
                    </>
                    :
                    <>
                        {(!bioWasRendered && (profile.bio.length >= breakText || !bool)) &&
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