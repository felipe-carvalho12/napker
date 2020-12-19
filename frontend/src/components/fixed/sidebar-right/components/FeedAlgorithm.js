import React, { useState } from 'react'


export default function FeedAlorithm() {
    const [interestsValue, setInterestsValue] = useState(50)
    const [ageValue, setAgeValue] = useState(50)
    const [friendsValue, setFriendsValue] = useState(50)
    const [isFriendValue, setIsFriendValue] = useState(50)
    
    return (
        <>
            <div className="d-flex justify-content-center align-items-center b-bottom" style={{ height: 'var(--header-heigth)' }}>
                <h4>Algoritmo do Feed</h4>
            </div>
            <div className="d-flex flex-column justify-content-between p-2">
                <div className="b-bottom py-3">
                    <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                        <h5>Interesses</h5>
                        <div>{interestsValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" onInput={e => setInterestsValue(e.target.value)} />
                    </div>
                </div>
                <div className="b-bottom py-3">
                    <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                        <h5>Semelhança de idade</h5>
                        <div>{ageValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" defaultValue="50" onInput={e => setAgeValue(e.target.value)} />
                    </div>
                </div>
                <div className="b-bottom py-3">
                    <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                        <h5>Amigos em comum</h5>
                        <div>{friendsValue}</div>
                    </div>
                    <div class="range">
                        <input type="range" min="0" max="100" defaultValue="50" onInput={e => setFriendsValue(e.target.value)} />
                    </div>
                </div>
                <div className="py-3">
                    <div className="d-flex justify-content-between" style={{ padding: '5px' }}>
                        <h5>Ser meu amigo</h5>
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