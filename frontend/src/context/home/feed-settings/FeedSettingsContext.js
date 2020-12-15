import React, { createContext, useState } from 'react'

export const FeedSettingsContext = createContext()

export const FeedSettingsProvider = props => {
    const [feedModalIsOpen, setFeedModalIsOpen] = useState(false)

    return (
        <FeedSettingsContext.Provider value={[feedModalIsOpen, setFeedModalIsOpen]}>
            {props.children}
        </FeedSettingsContext.Provider>
    )
}