import React, { createContext, useState } from 'react'

export const PostNotificationsContext = createContext()

export const PostNotificationsProvider = props => {
    const [postNotifications, setPostNotifications] = useState(0)

    return (
        <PostNotificationsContext.Provider value={[postNotifications, setPostNotifications]}>
            {props.children}
        </PostNotificationsContext.Provider>
    )
}