import React, { createContext, useState } from 'react'

export const InvitesReceivedContext = createContext()

export const InvitesReceivedProvider = props => {
    const [invitesReceivedNumber, setInvitesReceived] = useState(0)

    return (
        <InvitesReceivedContext.Provider value={[invitesReceivedNumber, setInvitesReceived]}>
            {props.children}
        </InvitesReceivedContext.Provider>
    )
}