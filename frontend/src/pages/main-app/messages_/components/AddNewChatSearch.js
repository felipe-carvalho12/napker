import React from 'react'

import { SERVER_URL } from '../../../../config/settings'

export default function AddNewChatSearch(props) {
    const setAddingNewChatProfiles = props.setAddingNewChatProfiles

    const setSearch = query => {
        if (query === '') {
            setAddingNewChatProfiles([])
            return
        }
        fetch(`${SERVER_URL}/profile-api/profiles/${query}`)
            .then(response => response.json())
            .then(data => {
                setAddingNewChatProfiles(data)
            })
    }

    return (
        <>
            <input
                className="search-input c-primary-grey contact-filter-input box-shadow"
                placeholder="Nova conversa"
                onChange={e => setSearch(e.target.value)}
            />
        </>
    )
}