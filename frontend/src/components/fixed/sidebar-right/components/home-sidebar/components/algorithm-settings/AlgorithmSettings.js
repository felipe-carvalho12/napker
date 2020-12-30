import React, { useState } from 'react'

import InfoModal from './components/InfoModal'
import InfoIcon from '../../../InfoIcon'
import ProfileSettings from './components/ProfileSettings'
import PostSettings from './components/PostSettings'


export default function AlgorithmSettings() {
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
        
        if(!isClosing) {
            e.target.innerHTML = 'keyboard_arrow_down'
            setPages[e.target.dataset.type](true)
        }
    }

    return (
        <>
            <InfoModal isOpen={infoModalIsOpen} hideModal={() => setInfoModalIsOpen(false)} />
            <InfoIcon onClick={() => setInfoModalIsOpen(true)} />
            <div className="d-flex flex-column justify-content-start align-items-center">
                <div className="" style={{ marginTop: 'var(--header-heigth)', width: '100%' }}>
                    <h6>Personalize o algoritmo que calcula o quão relevante um perfil é para você.</h6>
                </div>
                <div className="w-100 p-2 b-ternary-grey">
                    <ProfileSettings open={profileSettingsIsOpen} handleDetailClick={handleDetailClick} />
                    <PostSettings open={postSettingsIsOpen} handleDetailClick={handleDetailClick} />
                </div>
            </div>
        </>
    )
}