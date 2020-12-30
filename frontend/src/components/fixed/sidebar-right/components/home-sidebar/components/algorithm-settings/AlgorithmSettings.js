import React, { useEffect, useState, useContext } from 'react'

import { SERVER_URL } from '../../../../../../../config/settings'
import { csrftoken } from '../../../../../../../config/utils'
import { AlgorithmWeightsContext } from '../../../../../../../context/app/AppContext'
import InfoModal from './components/InfoModal'
import InfoIcon from '../../../InfoIcon'


export default function FeedAlgorithm() {
    const [weights, setWeights] = useContext(AlgorithmWeightsContext)

    const [interestsValue, setInterestsValue] = useState(null)
    const [ageValue, setAgeValue] = useState(null)
    const [friendsValue, setFriendsValue] = useState(null)
    const [isFriendValue, setIsFriendValue] = useState(null)

    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false)

    useEffect(() => {
        if (weights) {
            setInterestsValue(weights.interest_weight)
            setAgeValue(weights.age_weight)
            setFriendsValue(weights.friends_weight)
            setIsFriendValue(weights.is_friend_weight)
        }
    }, [weights])

    const handleMouseUp = () => {
        fetch(`${SERVER_URL}/profile-api/set-post-weights`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                'interest-weight': interestsValue,
                'age-weight': ageValue,
                'friends-weight': friendsValue,
                'is_friend-weight': isFriendValue
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'weights updated') {
                    setWeights({
                        interest_weight: interestsValue,
                        age_weight: ageValue,
                        friends_weight: friendsValue,
                        is_friend_weight: isFriendValue,
                    })
                }
            })
    }

    return (
        <>
            <InfoModal isOpen={infoModalIsOpen} hideModal={() => setInfoModalIsOpen(false)} />
            <InfoIcon onClick={() => setInfoModalIsOpen(true)} />

            {interestsValue !== null && ageValue !== null && friendsValue !== null && isFriendValue !== null ?
                <div className="d-flex flex-column justify-content-start align-items-center">
                    <div className="" style={{ marginTop: 'var(--header-heigth)', width: '100%' }}>
                        <h6>Personalize o algoritmo que calcula o quão relevante um perfil é para você.</h6>
                    </div>
                    <div className="w-100 p-2 b-ternary-grey">
                        <details open>
                            <summary className="b-theme-base-color">
                                <i
                                    className="material-icons-sharp align-self-start icon base-hover text-secondary"
                                    style={{ width: '25px', height: '25px' }}
                                >
                                    keyboard_arrow_down</i>
                                <h6>Perfil</h6>
                            </summary>
                            <div>
                                <div className="pt-1" style={{ width: '100%' }}>
                                    <div className="d-flex justify-content-between">
                                        <spam className="text-secondary">Interesses em comum</spam>
                                        <strong>{interestsValue}</strong>
                                    </div>
                                    <div class="range">
                                        <input type="range" min="0" max="100" value={interestsValue} onInput={e => setInterestsValue(e.target.value)} onMouseUp={handleMouseUp} />
                                    </div>
                                </div>
                                <div className="pt-1" style={{ width: '100%' }}>
                                    <div className="d-flex justify-content-between">
                                        <spam className="text-secondary">Semelhança de idade</spam>
                                        <strong>{ageValue}</strong>
                                    </div>
                                    <div class="range">
                                        <input type="range" min="0" max="100" value={ageValue} onInput={e => setAgeValue(e.target.value)} onMouseUp={handleMouseUp} />
                                    </div>
                                </div>
                            </div>
                        </details>
                        <details>
                            <summary className="b-theme-base-color">
                                <i
                                    className="material-icons-sharp align-self-start icon base-hover text-secondary"
                                    style={{ width: '25px', height: '25px' }}
                                >
                                    keyboard_arrow_down</i>
                                <h6>Post</h6>
                            </summary>
                            <div>
                                <div className="pt-1" style={{ width: '100%' }}>
                                    <div className="d-flex justify-content-between">
                                        <spam className="text-secondary">Interesses em comum</spam>
                                        <strong>{interestsValue}</strong>
                                    </div>
                                    <div class="range">
                                        <input type="range" min="0" max="100" value={interestsValue} onInput={e => setInterestsValue(e.target.value)} onMouseUp={handleMouseUp} />
                                    </div>
                                </div>
                                <div className="pt-1" style={{ width: '100%' }}>
                                    <div className="d-flex justify-content-between">
                                        <spam className="text-secondary">Semelhança de idade</spam>
                                        <strong>{ageValue}</strong>
                                    </div>
                                    <div class="range">
                                        <input type="range" min="0" max="100" value={ageValue} onInput={e => setAgeValue(e.target.value)} onMouseUp={handleMouseUp} />
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
                :
                <div className="loader-container">
                    <div className="loader" />
                </div>
            }
        </>
    )
}