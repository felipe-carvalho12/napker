import React from 'react'

import { InvitesReceivedContext, InvitesReceivedProvider } from './invites-received-number/InvitesReceivedContext'
import { UnvisualizedCommentsContext, UnvisualizedCommentsProvider } from './unvisualized-comments-number/UnvisualizedCommentsContext'
import { UnvisualizedLikesContext, UnvisualizedLikesProvider } from './unvisualized-likes-number/UnvisualizedLikesContext'
import { UnreadMessagesContext, UnreadMessagesProvider } from './unread-messages-number/UnreadMessagesContext'
import { AlgorithmWeightsContext, AlgorithmWeightsProvider } from './algorithm-weights/AlgorithmWeightsContext'
export { InvitesReceivedContext, UnvisualizedCommentsContext, UnvisualizedLikesContext, UnreadMessagesContext, AlgorithmWeightsContext }

export default function AppContextProvider(props) {
    return (
        <InvitesReceivedProvider>
            <UnvisualizedCommentsProvider>
                <UnvisualizedLikesProvider>
                    <UnreadMessagesProvider>
                        <AlgorithmWeightsProvider>
                            {props.children}
                        </AlgorithmWeightsProvider>
                    </UnreadMessagesProvider>
                </UnvisualizedLikesProvider>
            </UnvisualizedCommentsProvider>
        </InvitesReceivedProvider>
    )
}