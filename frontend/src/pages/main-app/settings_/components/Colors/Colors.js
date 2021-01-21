import React from 'react'
import ThemeEditor from './components/ThemeEditor'
import SettingsContent from '../components/SettingsContent'


export default function Colors() {

    return (
        <SettingsContent title="Cores" mobilePaddingBottom={false}>
            <ThemeEditor />
        </SettingsContent>
    )
}