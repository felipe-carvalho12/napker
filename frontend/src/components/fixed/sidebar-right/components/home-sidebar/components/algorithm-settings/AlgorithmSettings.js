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
            {interestsValue && ageValue && friendsValue && isFriendValue ?
                <>
                    <InfoModal isOpen={infoModalIsOpen} hideModal={() => setInfoModalIsOpen(false)} />
                    <InfoIcon onClick={() => setInfoModalIsOpen(true)} />
                    <div className="d-flex flex-column justify-content-start align-items-center" style={{ marginLeft: '10%' }}>
                        <div className="b-bottom" style={{ marginTop: 'var(--header-heigth)', width: '100%' }}>
                            <h6>Personalize o algoritmo que calcula o quão relevante um perfil é para você.</h6>
                        </div>
                        <div className="b-bottom py-3" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                                <h6>Interesses em comum</h6>
                                <div>{interestsValue}</div>
                            </div>
                            <div class="range">
                                <input type="range" min="0" max="100" value={interestsValue} onInput={e => setInterestsValue(e.target.value)} onMouseUp={handleMouseUp} />
                            </div>
                        </div>
                        <div className="b-bottom py-3" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                                <h6>Semelhança de idade</h6>
                                <div>{ageValue}</div>
                            </div>
                            <div class="range">
                                <input type="range" min="0" max="100" value={ageValue} onInput={e => setAgeValue(e.target.value)} onMouseUp={handleMouseUp} />
                            </div>
                        </div>
                        <div className="b-bottom py-3" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                                <h6>Amigos em comum</h6>
                                <div>{friendsValue}</div>
                            </div>
                            <div class="range">
                                <input type="range" min="0" max="100" value={friendsValue} onInput={e => setFriendsValue(e.target.value)} onMouseUp={handleMouseUp} />
                            </div>
                        </div>
                        <div className="py-3" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                                <h6>Ser meu amigo</h6>
                                <div>{isFriendValue}</div>
                            </div>
                            <div class="range">
                                <input type="range" min="0" max="100" value={isFriendValue} onInput={e => setIsFriendValue(e.target.value)} onMouseUp={handleMouseUp} />
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="loader-container">
                    <div className="loader" />
                </div>
            }
        </>
    )
}