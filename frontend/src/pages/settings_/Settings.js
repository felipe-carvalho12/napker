import React, { useEffect } from 'react'

import Header from '../../components/fixed/Header'
import SettingsMenu from './components/SettingsMenu'
import BlockedProfiles from './components/BlockedProfiles'
import ChangePassword from './components/ChangePassword'
import DeleteAccount from './components/DeleteAccount'
import BottomMenu from '../../components/fixed/bottom-menu/BottomMenu'

export default function Settings(props) {
    const defaultPage = 'blocked-profiles'
    if (!props.page) props.page = 'default'

    document.title = 'Configurações / Napker'

    useEffect(() => {
        document.getElementById(props.page !== 'default' ? props.page : defaultPage).classList.add('active')
    }, [])

    useEffect(() => {
        if (props.page !== 'default') {
            document.querySelector('.settings-description-container').classList.remove('mobile-d-none')
        } else {
            document.querySelector('.settings-description-container').classList.add('mobile-d-none')
        }
    }, [props.page])

    const pageChange = page => {
        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active')
        })
        document.getElementById(page).classList.add('active')
    }

    return (
        <>
            <Header page="Configurações" backArrow={visualViewport.width <= 635 && props.page !== 'default'} />
            <div className="content">
                <div className="settings-page-container">
                    <SettingsMenu pageChange={pageChange} />
                    {props.page === 'blocked-profiles' || props.page === 'default' ?
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