import React, { useEffect, useState, useContext } from 'react'
import Slider from '@material-ui/core/Slider'

import { AlgorithmWeightsContext } from '../../../../../../../../context/app/AppContext'


export default function ProfileSettings(props) {
    const handleDetailClick = props.handleDetailClick
    const open = props.open
    const [, setCurrentWeights] = props.useCurrentWeights

    const [weights,] = useContext(AlgorithmWeightsContext)

    const [interestsValue, setInterestsValue] = useState(null)
    const [ageValue, setAgeValue] = useState(null)
    const [friendsValue, setFriendsValue] = useState(null)
    const [isFriendValue, setIsFriendValue] = useState(null)

    useEffect(() => {
        if (weights) {
            setInterestsValue(parseInt(weights.profile.interest_weight))
            setAgeValue(parseInt(weights.profile.age_weight))
            setFriendsValue(parseInt(weights.profile.friends_weight))
            setIsFriendValue(parseInt(weights.profile.is_friend_weight))
        }
    }, [weights])

    useEffect(() => {
        setCurrentWeights({
            'interest_weight': parseInt(interestsValue),
            'age_weight': parseInt(ageValue),
            'friends_weight': parseInt(friendsValue),
            'is_friend_weight': parseInt(isFriendValue),
        })
    }, [interestsValue, ageValue, friendsValue, isFriendValue])

    return (
        <>
            {(interestsValue !== null && ageValue !== null && friendsValue !== null && isFriendValue !== null) &&
                <div className="w-100">
                    <div className="w-100 d-flex mb-1">
                        <i
                            className="material-icons-sharp align-self-start icon base-hover text-secondary algorithm-settings-details"
                            data-type='profile'
                            style={{ width: '25px', height: '25px' }}
                            onClick={handleDetailClick}
                        >
                            keyboard_arrow_down</i>
                        <h6 style={{ margin: "0", lineHeight: "1.5" }}>Perfil</h6>
                    </div>
                    <div className={`mb-10px ${!open && 'd-none'}`}>
                        <div className="pt-1" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between">
                                <spam className="text-secondary">Interesses em comum</spam>
                                <strong>{interestsValue}</strong>
                            </div>
                            <div class="range px-10px">
                                <Slider
                                    defaultValue={interestsValue}
                                    className='c-primary-color'
                                    onChange={(e, value) => setInterestsValue(value)}
                                />
                            </div>
                        </div>
                        <div className="pt-1" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between">
                                <spam className="text-secondary">Semelhança de idade</spam>
                                <strong>{ageValue}</strong>
                            </div>
                            <div class="range px-10px">
                                <Slider
                                    defaultValue={ageValue}
                                    className='c-primary-color'
                                    onChange={(e, value) => setAgeValue(value)}
                                />
                            </div>
                        </div>
                        <div className="pt-1" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between">
                                <spam className="text-secondary">Amigos em comum</spam>
                                <strong>{friendsValue}</strong>
                            </div>
                            <div class="range px-10px">
                                <Slider
                                    defaultValue={friendsValue}
                                    className='c-primary-color'
                                    onChange={(e, value) => setFriendsValue(value)}
                                />
                            </div>
                        </div>
                        <div className="pt-1" style={{ width: '100%' }}>
                            <div className="d-flex justify-content-between">
                                <spam className="text-secondary">Ser meu amigo</spam>
                                <strong>{isFriendValue}</strong>
                            </div>
                            <div class="range px-10px">
                                <Slider
                                    defaultValue={isFriendValue}
                                    className='c-primary-color'
                                    onChange={(e, value) => setIsFriendValue(value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}