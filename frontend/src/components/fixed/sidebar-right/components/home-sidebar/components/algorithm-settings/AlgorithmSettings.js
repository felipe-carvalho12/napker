import React, { useState } from 'react'

import InfoModal from './components/InfoModal'
import InfoIcon from '../../../InfoIcon'


export default function FeedAlgorithm() {
    const [interestsValue, setInterestsValue] = useState(50)
    const [ageValue, setAgeValue] = useState(50)
    const [friendsValue, setFriendsValue] = useState(50)
    const [isFriendValue, setIsFriendValue] = useState(50)

    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false)

    return (
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
                        <input type="range" min="0" max="100" onInput={e => setInterestsValue(e.target.value)} />
                    </div>
                </div>
                <div className="b-bottom py-3" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                        <h6>Semelhança de idade</h6>
                        <div>{ageValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" defaultValue="50" onInput={e => setAgeValue(e.target.value)} />
                    </div>
                </div>
                <div className="b-bottom py-3" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                        <h6>Amigos em comum</h6>
                        <div>{friendsValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" defaultValue="50" onInput={e => setFriendsValue(e.target.value)} />
                    </div>
                </div>
                <div className="py-3" style={{ width: '100%' }}>
                    <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                        <h6>Ser meu amigo</h6>
                        <div>{isFriendValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" defaultValue="50" onInput={e => setIsFriendValue(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}