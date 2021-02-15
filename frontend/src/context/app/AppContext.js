import React from 'react'

import { InvitesReceivedContext, InvitesReceivedProvider } from './notifications-number/InvitesReceivedContext'
import { PublicationNotificationsContext, PublicationNotificationsProvider } from './notifications-number/PublicationNotificationsContext'
import { MentionNumberContext, MentionNumberProvider } from './notifications-number/MentionNumberContext'
import { UnreadMessagesContext, UnreadMessagesProvider } from './notifications-number/UnreadMessagesContext'

import { AlgorithmWeightsContext, AlgorithmWeightsProvider } from './algorithm-weights/AlgorithmWeightsContext'
import { ThemeContext, ThemeContextProvider } from './theme-context/ThemeContext'
import { MyProfileContext, MyProfileProvider } from './myprofile/MyProfileContext'

import { PostsIdContext, PostsIdProvider } from './posts/PostsIdContext'
import { FeedPostsContext, FeedPostsContextProvider } from './posts/FeedPostsContext'

export {
    ThemeContext,
    InvitesReceivedContext,
    PublicationNotificationsContext,
    MentionNumberContext, UnreadMessagesContext,
    AlgorithmWeightsContext,
    MyProfileContext,
    PostsIdContext,
    FeedPostsContext,
}

export default function AppContextProvider(props) {
    return (
        <ThemeContextProvider>
            <InvitesReceivedProvider>
                <PublicationNotificationsProvider>
                    <MentionNumberProvider>
                        <UnreadMessagesProvider>
                            <AlgorithmWeightsProvider>
                                <MyProfileProvider>
                                    <PostsIdProvider>
                                        <FeedPostsContextProvider>
                                            {props.children}
                                        </FeedPostsContextProvider>
                                    </PostsIdProvider>
                                </MyProfileProvider>
                            </AlgorithmWeightsProvider>
                        </UnreadMessagesProvider>
                    </MentionNumberProvider>
                </PublicationNotificationsProvider>
            </InvitesReceivedProvider>
        </ThemeContextProvider>
    )
}