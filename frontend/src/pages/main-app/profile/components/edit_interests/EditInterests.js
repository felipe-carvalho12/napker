import React, { useEffect, useState } from 'react'

import Header from '../../../../components/fixed/Header'
import PublicInterests from './components/PublicInterests'
import PrivateInterests from './components/PrivateInterests'
import { SERVER_URL } from '../../../../config/settings'
import { csrftoken } from '../../../../config/utils'

export default function EditInterests() {
    const [myProfile, setMyProfile] = useState(null)
    let [publicInterests, setPublicInterests] = [null, value => publicInterests = value]
    let [privateInterests, setPrivateInterests] = [null, value => privateInterests = value]

    useEffect(() => {
        fetch(`${SERVER_URL}/profile-api/myprofile`)
            .then(response => response.json())
            .then(data => setMyProfile(data))
    }, [])

    const submitInterests = () => {
        fetch(`${SERVER_URL}/profile-api/set-myinterests`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                public_interests: publicInterests.sort(),
                private_interests: privateInterests.sort()
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.querySelector('#interests-updated-message').style.display = 'block'
                document.documentElement.scrollTop = 0
            })
    }

    return (
        <>
            <Header page="Meus interesses" backArrow={true} />
            <div className="content">
                <p
                    className="edit-interests-success-message"
                    id="interests-updated-message"
                >
                    Interesses atualizados com sucesso
                </p>
                {myProfile ?
                    <div style={{ background: 'var(--theme-base-color)', textAlign: 'start' }}>
                        <div className="w-100 p-2 b-bottom">
                            <button
                                className="btn btn-primary"
                                onClick={submitInterests}
                            >
                                Salvar
                            </button>
                        </div>
                        <PublicInterests
                            myProfile={myProfile}
                            setInterests={setPublicInterests}
                        />

                        <br />
                        <hr />
                        <br />

                        <PrivateInterests
                            myProfile={myProfile}
                            setInterests={setPrivateInterests}
                        />
                    </div> :
                    <div className="edit-interests-loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}