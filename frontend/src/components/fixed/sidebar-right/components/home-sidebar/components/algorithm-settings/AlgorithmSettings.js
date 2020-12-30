import React, { useContext, useState } from 'react'

import { AlgorithmWeightsContext } from '../../../../../../../context/app/AppContext'
import { SERVER_URL } from '../../../../../../../config/settings'
import { csrftoken } from '../../../../../../../config/utils'
import InfoModal from './components/InfoModal'
import InfoIcon from '../../../InfoIcon'
import ProfileSettings from './components/ProfileSettings'
import PostSettings from './components/PostSettings'


export default function AlgorithmSettings() {
    const [weights, setWeights] = useContext(AlgorithmWeightsContext)

    const [profileWeights, setProfileWeights] = useState(null)
    const [postWeights, setPostWeights] = useState(null)

    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false)

    const [profileSettingsIsOpen, setProfileSettingsIsOpen] = useState(true)
    const [postSettingsIsOpen, setPostSettingsIsOpen] = useState(false)

    const setPages = {
        'profile': setProfileSettingsIsOpen,
        'post': setPostSettingsIsOpen
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
            .then(() => setWeights({
                'profile': profileWeights,
                'post': postWeights
            }))
    }


    return (
        <>
            <InfoModal isOpen={infoModalIsOpen} hideModal={() => setInfoModalIsOpen(false)} />
            <InfoIcon onClick={() => setInfoModalIsOpen(true)} />
            <div className="d-flex flex-column justify-content-start align-items-center" style={{ height: '85%' }}>
                <div className="" style={{ marginTop: 'var(--header-heigth)', width: '100%' }}>
                    <h6>Personalize o algoritmo que calcula o quão relevante um perfil é para você.</h6>
                </div>
                {weights ?
                    <div className="w-100 h-100 p-2 d-flex flex-column justify-content-between b-ternary-grey" style={{ borderRadius: '15px' }}>
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
                        <button
                            className="btn btn-primary d-flex justify-content-center align-items-center align-self-end"
                            style={{ width: '70px', height: '30px' }}
                            onClick={handleSave}
                        >
                            Salvar
                        </button>
                    </div>
                    :
                    <div className="loader-container">
                        <div className="loader" />
                    </div>
                }
            </div>
        </>
    )
}