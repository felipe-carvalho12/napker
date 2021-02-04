import React, { createContext, useState } from 'react'

export const MentionNumberContext = createContext()

export const MentionNumberProvider = props => {
    const [mentionsNotificationsNumber, setMentionsNotificationsNumber] = useState(0)
    
    return (
        <MentionNumberContext.Provider value={[mentionsNotificationsNumber, setMentionsNotificationsNumber]}>
            {props.children}
        </MentionNumberContext.Provider>
    )
}