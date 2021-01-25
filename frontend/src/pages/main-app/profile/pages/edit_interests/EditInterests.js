import React, { useContext, useEffect } from 'react'

import { SERVER_URL } from '../../../../../config/settings'
import { csrftoken } from '../../../../../config/utils'
import { MyProfileContext } from '../../../../../context/app/AppContext'
import Header from '../../../../../components/fixed/Header'
import PublicInterests from './components/PublicInterests'
import PrivateInterests from './components/PrivateInterests'
import BottomMenu from '../../../../../components/fixed/bottom-menu/BottomMenu'

export default function EditInterests() {
    const [myProfile, updateMyProfile] = useContext(MyProfileContext)
    let [publicInterests, setPublicInterests] = [null, value => publicInterests = value]
    let [privateInterests, setPrivateInterests] = [null, value => privateInterests = value]

    const isMobile = visualViewport.width <= 980

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
                updateMyProfile()
            })
    }

    return (
        <div className="content-container">
            <Header
                page="Meus interesses"
                backArrow={true}
                className="b-theme-base-color box-med blur-20px"
                style={{ top: "1vw", padding: "0 20px 0", zIndex: "1000" }}
            />
            <div className={`sidebar-content ${isMobile ? 'pb-mobile' : ''}`}>
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
                                className="edit-interests-success-message ml-10px"
                                id="interests-updated-message"
                            >
                                Interesses atualizados com sucesso
                            </p>
                        </div>
                        <PublicInterests
                            setInterests={setPublicInterests}
                        />
                        <PrivateInterests
                            setInterests={setPrivateInterests}
                        />
                    </div> :
                    <div className="loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
            <BottomMenu />
        </div>
    )
}