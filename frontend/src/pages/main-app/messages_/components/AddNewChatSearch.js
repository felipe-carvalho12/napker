import React from 'react'

import { SERVER_URL } from '../../../../config/settings'

export default function AddNewChatSearch(props) {
    const setModalProfiles = props.setModalProfiles
    const setAddingNewChat = props.setAddingNewChat

    const setModalSearch = query => {
        if (query === '') {
            setModalProfiles([])
            return
        }
        fetch(`${SERVER_URL}/profile-api/users/${query}`)
            .then(response => response.json())
            .then(data => {
                setModalProfiles(data)
            })
    }

    return (
        <>
            <div className="search-input-container">
                <input
                    className="search-input c-primary-grey contact-filter-input box-shadow"
                    placeholder="Nova conversa"
                    onChange={e => setModalSearch(e.target.value)}
                />
                <i
                    className="material-icons-sharp c-primary-color add-icon"
                    style={{ fontSize: "32px", padding: '5px' }}
                    onClick={() => setAddingNewChat(false)}
                >
                    close
                </i>
            </div>
        </>
    )
}