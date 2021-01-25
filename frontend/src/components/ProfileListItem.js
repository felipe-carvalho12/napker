import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileListItem(props) {
    const profile = props.profile
    const myProfile = props.myProfile
    const onClick = props.onClick

    const imgSize = props.imgSize || 'med'
    const bioLength = props.bioLength
    const breakText = props.breakText == undefined ? 60 : props.breakText
    const bool = props.bool == undefined ? true : props.bool
    let bioWasRendered = false

    return (
        <Link to={myProfile != undefined && profile.id === myProfile.id ?
            '/perfil' : `/user/${profile.user.username}`}
            style={{ color: 'var(--primary-grey)', textDecoration: 'none', width: '100%' }}
            onClick={() => onClick}
        >
            <li
                className="position-relative d-flex flex-column border-0 base-hover box-sm"
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
                        <div className="d-flex justify-content-between align-items-start">
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