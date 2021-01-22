import React, { useContext, useEffect, useRef, useState } from 'react'

import { AlgorithmWeightsContext } from '../../../../../../../context/app/AppContext'
import { SERVER_URL } from '../../../../../../../config/settings'
import { csrftoken } from '../../../../../../../config/utils'
import Info from './components/Info'
import InfoIcon from '../../../InfoIcon'
import ProfileSettings from './components/ProfileSettings'
import PostSettings from './components/PostSettings'


let previousProfileWeights = null
let previousPostWeights = null
let bool = true

export default function AlgorithmSettings(props) {
    const [weights, setWeights] = useContext(AlgorithmWeightsContext)

    const [profileWeights, setProfileWeights] = useState(null)
    const [postWeights, setPostWeights] = useState(null)

    const [infoIsOpen, setInfoIsOpen] = useState(false)

    const [profileSettingsIsOpen, setProfileSettingsIsOpen] = useState(true)
    const [postSettingsIsOpen, setPostSettingsIsOpen] = useState(false)

    const isMobile = props.isMobile
    const renderInfoIcon = props.renderInfoIcon === undefined ? true : props.renderInfoIcon

    useEffect(() => {
        if (props.isDemo) {
            setWeights({
                'profile': {
                    'interest_weight': 50,
                    'age_weight': 50,
                    'friends_weight': 50,
                    'is_friend_weight': 50
                },
                'post': {
                    'date_weight': 50,
                    'author_weight': 50,
                    'likes_weight': 50,
                }
            })
        }
    }, [])

    const setPages = {
        'profile': setProfileSettingsIsOpen,
        'post': setPostSettingsIsOpen
    }

    const buttonRef = useRef()

    useEffect(() => {
        if (!props.isDemo) {
            if (bool && weights) {
                previousProfileWeights = weights.profile
                previousPostWeights = weights.post
                bool = false
            }
            if (previousProfileWeights && previousPostWeights && profileWeights && postWeights) {
                buttonRef.current.disabled = areSameWeights(previousProfileWeights, previousPostWeights, profileWeights, postWeights)
            }
        }
    }, [profileWeights, postWeights])

    const areSameWeights = (previousProfileWeights, previousPostWeights, profileWeights, postWeights) => {
        if (previousProfileWeights.interest_weight !== profileWeights.interest_weight) return false
        if (previousProfileWeights.age_weight !== profileWeights.age_weight) return false
        if (previousProfileWeights.friends_weight !== profileWeights.friends_weight) return false
        if (previousProfileWeights.is_friend_weight !== profileWeights.is_friend_weight) return false

        if (previousPostWeights.date_weight !== postWeights.date_weight) return false
        if (previousPostWeights.author_weight !== postWeights.author_weight) return false
        if (previousPostWeights.likes_weight !== postWeights.likes_weight) return false

        return true
    }

    const handleDetailClick = e => {
        const isClosing = e.target.innerHTML === 'keyboard_arrow_down'

        document.querySelectorAll('.algorithm-settings-details').forEach(el => {
            el.innerHTML = 'keyboard_arrow_right'
            setPages[el.dataset.type](false)
        })

        if (!isClosing) {
            e.target.innerHTML = 'keyboard_arrow_down'
            setPages[e.target.dataset.type](true)
        }
    }

    const handleSave = () => {
        fetch(`${SERVER_URL}/profile-api/set-weights`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'profile': profileWeights,
                'post': postWeights
            })
        })
            .then(response => response.json())
            .then(() => {
                setWeights({
                    'profile': profileWeights,
                    'post': postWeights
                })
                bool = true
                props.saveCallBack && props.saveCallBack()
            })
    }


    return (
        <>
            <div
                className={`d-flex flex-column justify-content-start align-items-center algorithm-settings ${props.className ? props.className : ''}`}
                style={{ height: '85%', ...props.style }}
            >
                <div className="w-100 h-100 blur-20px">
                    {weights ?
                        <div
                            className={`w-100 ${isMobile ? 'p-2' : ''} d-flex flex-column justify-content-between box-med b-theme-base-color`}
                            style={{ marginTop: !isMobile && 'var(--header-heigth)', height: "400px" }}
                        >
                            {infoIsOpen ?
                                <Info setInfoIsOpen={setInfoIsOpen} />
                                :
                                <>
                                    <div>
                                        <div className="w-100 d-flex justify-content-between align-items-start mb-3">
                                            <h6 className={isMobile ? 'm-2' : 'mr-10px'}>Personalize seu algoritmo.</h6>
                                            {renderInfoIcon &&
                                                <InfoIcon className="p-5px" onClick={() => setInfoIsOpen(true)} />
                                            }
                                        </div>
                                        <div>
                                            <ProfileSettings
                                                open={profileSettingsIsOpen}
                                                handleDetailClick={handleDetailClick}
                                                useCurrentWeights={[profileWeights, setProfileWeights]}
                                            />
                                            <PostSettings
                                                open={postSettingsIsOpen}
                                                handleDetailClick={handleDetailClick}
                                                useCurrentWeights={[postWeights, setPostWeights]}
                                            />
                                        </div>
                                    </div>
                                    {!props.isDemo &&
                                        <button
                                            ref={buttonRef}
                                            className="btn btn-primary d-flex justify-content-center align-items-center justify-self-end align-self-end"
                                            style={{ width: '70px', height: '30px' }}
                                            onClick={handleSave}
                                        >
                                            Salvar
                                    </button>
                                    }
                                </>
                            }
                        </div>
                        :
                        <div className="loader-container" style={{ marginTop: '20px' }}>
                            <div className="loader" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}