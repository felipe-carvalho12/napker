import React from 'react'

import { FeedSettingsContext, FeedSettingsProvider } from './feed-settings/FeedSettingsContext'
export { FeedSettingsContext }


export default function HomeContextProvider(props) {
    return (
        <FeedSettingsProvider>
            {props.children}
        </FeedSettingsProvider>
    )
}