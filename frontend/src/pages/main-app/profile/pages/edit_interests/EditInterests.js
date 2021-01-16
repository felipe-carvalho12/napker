import React, { useEffect, useState } from 'react'

import { SERVER_URL } from '../../../../../config/settings'
import { csrftoken } from '../../../../../config/utils'
import Header from '../../../../../components/fixed/Header'
import PublicInterests from './components/PublicInterests'
import PrivateInterests from './components/PrivateInterests'
import BottomMenu from '../../../../../components/fixed/bottom-menu/BottomMenu'

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
            <div className="b-theme-base-color box-med blur" style={{ position: "sticky", top: "1vw", padding: "0 20px 0", zIndex: "1000" }}>
                <Header page="Meus interesses" backArrow={true} />
            </div>
            <div className="sidebar-content">
                {myProfile ?
                    <div className="pb-3" style={{ textAlign: 'start' }}>
                        <div className="w-100 p-3 d-flex ">
                            <button
                                className="btn btn-primary"
                                onClick={submitInterests}
                            >
                                Salvar
                            </button>
                            <p
                                className="edit-interests-success-message ml-2"
                                id="interests-updated-message"
                            >
                                Interesses atualizados com sucesso
                            </p>
                        </div>
                        <PublicInterests
                            myProfile={myProfile}
                            setInterests={setPublicInterests}
                        />
                        <PrivateInterests
                            myProfile={myProfile}
                            setInterests={setPrivateInterests}
                        />
                    </div> :
                    <div className="loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
            <BottomMenu />
        </>
    )
}