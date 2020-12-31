import React from 'react'

export default function ContactFilterInput(props) {
    const activeChatsProfiles = props.activeChatsProfiles
    const setHasFilteredProfiles = props.setHasFilteredProfiles
    const fetchActiveChatProfiles = props.fetchActiveChatProfiles
    const setRenderedActiveChatsProfiles = props.setRenderedActiveChatsProfiles
    const openModal = props.openModal

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
        <div className="search-input-container">
            <input
                className="search-input contact-filter-input"
                id="contact-filter-input"
                placeholder="Pesquisar pessoas"
                onChange={e => setContactSearch(e.target.value)}
            />
            <i className="fas fa-plus add-icon" onClick={openModal}></i>
        </div>
    )
}