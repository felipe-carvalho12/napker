import React from 'react'

import { InvitesReceivedContext, InvitesReceivedProvider } from './invites-received-number/InvitesReceivedContext'
import { PostNotificationsContext, PostNotificationsProvider } from './post-notifications-number/PostNotificationsContext'
import { UnreadMessagesContext, UnreadMessagesProvider } from './unread-messages-number/UnreadMessagesContext'
import { AlgorithmWeightsContext, AlgorithmWeightsProvider } from './algorithm-weights/AlgorithmWeightsContext'
export { InvitesReceivedContext, PostNotificationsContext, UnreadMessagesContext, AlgorithmWeightsContext }

export default function AppContextProvider(props) {
    return (
        <InvitesReceivedProvider>
            <PostNotificationsProvider>
                <UnreadMessagesProvider>
                    <AlgorithmWeightsProvider>
                        {props.children}
                    </AlgorithmWeightsProvider>
                </UnreadMessagesProvider>
            </PostNotificationsProvider>
        </InvitesReceivedProvider>
    )
}