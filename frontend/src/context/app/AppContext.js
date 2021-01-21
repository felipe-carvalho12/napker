import React from 'react'

import { InvitesReceivedContext, InvitesReceivedProvider } from './invites-received-number/InvitesReceivedContext'
import { PostNotificationsContext, PostNotificationsProvider } from './post-notifications-number/PostNotificationsContext'
import { UnreadMessagesContext, UnreadMessagesProvider } from './unread-messages-number/UnreadMessagesContext'
import { AlgorithmWeightsContext, AlgorithmWeightsProvider } from './algorithm-weights/AlgorithmWeightsContext'
import { ThemeContext, ThemeContextProvider } from './theme-context/ThemeContext'
export { ThemeContext, InvitesReceivedContext, PostNotificationsContext, UnreadMessagesContext, AlgorithmWeightsContext }

export default function AppContextProvider(props) {
    return (
        <ThemeContextProvider>
            <InvitesReceivedProvider>
                <PostNotificationsProvider>
                    <UnreadMessagesProvider>
                        <AlgorithmWeightsProvider>
                            {props.children}
                        </AlgorithmWeightsProvider>
                    </UnreadMessagesProvider>
                </PostNotificationsProvider>
            </InvitesReceivedProvider>
        </ThemeContextProvider>
    )
}