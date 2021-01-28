import React from 'react'

import { InvitesReceivedContext, InvitesReceivedProvider } from './invites-received-number/InvitesReceivedContext'
import { PublicationNotificationsContext, PublicationNotificationsProvider } from './publication-notifications-number/PublicationNotificationsContext'
import { UnreadMessagesContext, UnreadMessagesProvider } from './unread-messages-number/UnreadMessagesContext'
import { AlgorithmWeightsContext, AlgorithmWeightsProvider } from './algorithm-weights/AlgorithmWeightsContext'
import { ThemeContext, ThemeContextProvider } from './theme-context/ThemeContext'
import { MyProfileContext, MyProfileProvider } from './myprofile/MyProfileContext'
export { ThemeContext, InvitesReceivedContext, PublicationNotificationsContext, UnreadMessagesContext, AlgorithmWeightsContext, MyProfileContext }

export default function AppContextProvider(props) {
    return (
        <ThemeContextProvider>
            <InvitesReceivedProvider>
                <PublicationNotificationsProvider>
                    <UnreadMessagesProvider>
                        <AlgorithmWeightsProvider>
                            <MyProfileProvider>
                                {props.children}
                            </MyProfileProvider>
                        </AlgorithmWeightsProvider>
                    </UnreadMessagesProvider>
                </PublicationNotificationsProvider>
            </InvitesReceivedProvider>
        </ThemeContextProvider>
    )
}