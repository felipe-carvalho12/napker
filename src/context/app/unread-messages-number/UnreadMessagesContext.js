import React, { createContext, useState } from 'react'

export const UnreadMessagesContext = createContext()

export const UnreadMessagesProvider = props => {
    const [unreadMessagesNumber, setUnreadMessagesNumber] = useState(0)
    
    return (
        <UnreadMessagesContext.Provider value={[unreadMessagesNumber, setUnreadMessagesNumber]}>
            {props.children}
        </UnreadMessagesContext.Provider>
    )
}