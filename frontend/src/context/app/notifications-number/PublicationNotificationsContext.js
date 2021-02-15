import React, { createContext, useState } from 'react'

export const PublicationNotificationsContext = createContext()

export const PublicationNotificationsProvider = props => {
    const [publicationNotifications, setPublicationNotifications] = useState(0)

    return (
        <PublicationNotificationsContext.Provider value={[publicationNotifications, setPublicationNotifications]}>
            {props.children}
        </PublicationNotificationsContext.Provider>
    )
}