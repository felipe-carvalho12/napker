import React from 'react'

import { InvitesReceivedContext, InvitesReceivedProvider } from './invites-received-number/InvitesReceivedContext'
import { PostNotificationsContext, PostNotificationsProvider } from './post-notifications-number/PostNotificationsContext'
import { UnreadMessagesContext, UnreadMessagesProvider } from './unread-messages-number/UnreadMessagesContext'
import { AlgorithmWeightsContext, AlgorithmWeightsProvider } from './algorithm-weights/AlgorithmWeightsContext'
import { ThemeContext, ThemeContextProvider } from './theme-context/ThemeContext'
import { MyProfileContext, MyProfileProvider } from './myprofile/MyProfileContext'
export { ThemeContext, InvitesReceivedContext, PostNotificationsContext, UnreadMessagesContext, AlgorithmWeightsContext, MyProfileContext }

export default function AppContextProvider(props) {
    return (
        <ThemeContextProvider>
            <InvitesReceivedProvider>
                <PostNotificationsProvider>
                    <UnreadMessagesProvider>
                        <AlgorithmWeightsProvider>
                            <MyProfileProvider>
                                {props.children}
                            </MyProfileProvider>
                        </AlgorithmWeightsProvider>
                    </UnreadMessagesProvider>
                </PostNotificationsProvider>
            </InvitesReceivedProvider>
        </ThemeContextProvider>
    )
}