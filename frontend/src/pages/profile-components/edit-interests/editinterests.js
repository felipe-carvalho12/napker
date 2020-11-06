import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../../../components/header'
import PublicInterests from './publicInterests'
import PrivateInterests from './privateInterests'
import { SERVER_URL } from '../../../settings'
import { csrftoken } from '../../../utils'

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
        <>{console.log('rerendered')}
            <Header page="Meus interesses" backArrow={true} />
            <div className="content">
                <p
                    id="interests-updated-message"
                    style={{ background: '#fff', color: '#0f0', display: 'none', padding: '5px', fontSize: 'large', fontWeight: 'bold' }}
                >
                    Interesses atualizados com sucesso
                </p>
                {myProfile &&
                    <div className="interests-page-container">
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

                        <hr />
                        <button
                            className="btn btn-primary"
                            onClick={submitInterests}
                        >
                            Salvar
                        </button>
                    </div>}
            </div>
        </>
    )
}