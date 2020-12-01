import React, { useEffect } from 'react'

import Header from '../../components/fixed/Header'
import SettingsMenu from './components/SettingsMenu'
import BlockedProfiles from './components/BlockedProfiles'
import ChangePassword from './components/ChangePassword'
import DeleteAccount from './components/DeleteAccount'
import BottomMenu from '../../components/fixed/bottom-menu/BottomMenu'

export default function Settings(props) {
    if (!props.page) props.page = 'blocked-profiles'

    document.title = 'Configurações / Napker'

    useEffect(() => {
        document.getElementById(props.page).classList.add('active')
    }, [])

    const pageChange = page => {
        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active')
        })
        document.getElementById(page).classList.add('active')
    }

    return (
        <>
            <Header page="Configurações" />
            <div className="content">
                <div className="settings-page-container">
                    <SettingsMenu pageChange={pageChange} />
                    {props.page === 'blocked-profiles' ?
                        <BlockedProfiles />
                        :
                        <>
                            {props.page === 'change-password' ?
                                <ChangePassword />
                                :
                                <DeleteAccount />
                            }
                        </>
                    }
                </div>
            </div>
            <BottomMenu />
        </>
    )
}