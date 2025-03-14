import React, { useEffect } from 'react'

import Header from '../../../components/fixed/Header'
import SettingsMenu from './components/SettingsMenu'
import BlockedProfiles from './components/BlockedProfiles'
import SecurityMenu from './components/security_/SecurityMenu'
import Faq from './components/Faq'
import ChangePassword from './components/security_/components/ChangePassword'
import DeleteAccount from './components/security_/components/DeleteAccount'
import BottomMenu from '../../../components/fixed/bottom-menu/BottomMenu'
import Feedback from './components/Feedback'
import Colors from './components/Colors/Colors'


export default function Settings(props) {
    const isMobile = visualViewport.width <= 980

    if (!props.page) props.page = 'default'

    document.title = 'Configurações / Napker'

    useEffect(() => {
        if (props.page !== 'default') {
            document.querySelector('.settings-description-container') &&
                document.querySelector('.settings-description-container').classList.remove('mobile-d-none')
        } else {
            document.querySelector('.settings-description-container') &&
                document.querySelector('.settings-description-container').classList.add('mobile-d-none')
        }
    }, [props.page])

    return (
        <div className={`content-container ${isMobile && "b-theme-base-color"}`}>
            <div className={`p-0 ${!isMobile && "b-theme-base-color box-med m-vw-t"}`} style={{ height: 'var(--content-height)' }}>
                {isMobile &&
                    < Header page="Configurações" className= "b-b"/>
                }
                <div className="content m-0 h-100">
                    <div className="settings-page-container h-100">

                        <SettingsMenu />

                        {(props.page === 'blocked-profiles' || props.page === 'default') &&
                            <BlockedProfiles />
                        }

                        {props.page === 'security' &&
                            <SecurityMenu />
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

                        {props.page === 'colors' &&
                            <Colors />
                        }

                    </div>
                </div>
                <BottomMenu />
            </div>
        </div>
    )
}