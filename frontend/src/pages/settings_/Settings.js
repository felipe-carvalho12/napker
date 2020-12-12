import React, { useEffect } from 'react'

import Header from '../../components/fixed/Header'
import SettingsMenu from './components/SettingsMenu'
import BlockedProfiles from './components/BlockedProfiles'
import SecurityMenu from './components/security_/SecurityMenu'
import Faq from './components/Faq'
import ChangePassword from './components/security_/components/ChangePassword'
import DeleteAccount from './components/security_/components/DeleteAccount'
import BottomMenu from '../../components/fixed/bottom-menu/BottomMenu'
import Feedback from './components/Feedback'


export default function Settings(props) {
    const defaultPage = 'blocked-profiles'
    if (!props.page) props.page = 'default'

    document.title = 'Configurações / Napker'

    useEffect(() => {
        document.getElementById(props.page !== 'default' ? props.page : defaultPage) &&
            document.getElementById(props.page !== 'default' ? props.page : defaultPage).classList.add('active')
    }, [])

    useEffect(() => {
        if (props.page !== 'default') {
            document.querySelector('.settings-description-container') &&
                document.querySelector('.settings-description-container').classList.remove('mobile-d-none')
        } else {
            document.querySelector('.settings-description-container') &&
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
            {visualViewport.width < 635 ?
                <>
                    {props.page === 'default' || props.page === 'blocked-profiles' || props.page === 'security' ?
                        < Header page="Configurações" backArrow={props.page !== 'default'} />
                        :
                        <>
                        </>
                    }
                </>
                :
                < Header page="Configurações" />
            }
            <div className="content">
                <div className="settings-page-container">

                    <SettingsMenu pageChange={pageChange} />
                    {props.page === 'blocked-profiles' || props.page === 'default' &&
                        <BlockedProfiles />
                    }

                    {props.page === 'security' &&
                        <SecurityMenu pageChange={pageChange} />
                    }

                    {props.page === 'change-password' &&
                        <ChangePassword />
                    }

                    {props.page === 'delete-account' &&
                        <DeleteAccount />
                    }

                    {props.page === 'faq' &&
                        <Faq />
                    }

                    {props.page === 'feedback' &&
                        <Feedback />
                    }

                </div>
            </div>
            <BottomMenu />
        </>
    )
}