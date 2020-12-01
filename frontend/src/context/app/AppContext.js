import React from 'react'

import { InvitesReceivedContext, InvitesReceivedProvider } from './invites-received-number/InvitesReceivedContext'
import { UnvisualizedCommentsContext, UnvisualizedCommentsProvider } from './unvisualized-comments-number/UnvisualizedCommentsContext'
import { UnvisualizedLikesContext, UnvisualizedLikesProvider } from './unvisualized-likes-number/UnvisualizedLikesContext'
import { UnreadMessagesContext, UnreadMessagesProvider } from './unread-messages-number/UnreadMessagesContext'
export { InvitesReceivedContext, UnvisualizedCommentsContext, UnvisualizedLikesContext, UnreadMessagesContext }

export default function AppContextProvider(props) {
    return (
        <InvitesReceivedProvider>
            <UnvisualizedCommentsProvider>
                <UnvisualizedLikesProvider>
                    <UnreadMessagesProvider>
                        {props.children}
                    </UnreadMessagesProvider>
                </UnvisualizedLikesProvider>
            </UnvisualizedCommentsProvider>
        </InvitesReceivedProvider>
    )
}