import React from 'react'

export default function ContactFilterInput(props) {
    const activeChatsProfiles = props.activeChatsProfiles
    const setHasFilteredProfiles = props.setHasFilteredProfiles
    const fetchActiveChatProfiles = props.fetchActiveChatProfiles
    const setRenderedActiveChatsProfiles = props.setRenderedActiveChatsProfiles
    const addNewChat = props.addNewChat

    const setContactSearch = query => {
        if (query === '') {
            setHasFilteredProfiles(false)
            fetchActiveChatProfiles()
            return
        }
        if (activeChatsProfiles) {
            console.log(activeChatsProfiles)
            const filteredProfiles = activeChatsProfiles.filter(p => p.user.username.includes(query))
            setHasFilteredProfiles(true)
            setRenderedActiveChatsProfiles(filteredProfiles)
        }
    }

    return (
        <input
            className="search-input contact-filter-input box-shadow"
            id="contact-filter-input"
            placeholder="Pesquisar pessoas"
            style={{ color: 'var(--primary-grey)' }}
            onChange={e => setContactSearch(e.target.value)}
        />
    )
}