import React, { useState } from 'react'

import SignupForm from './components/SignupForm'
import InterestsForm from './components/InterestsForm'
import ActivationLinkSent from './components/ActivationLinkSent'
import PageLoader from '../PageLoader'


export default function Signup() {
    const [currentPage, setCurrentPage] = useState('signup')
    const [myUserId, setMyUserId] = useState(null)

    document.title = 'Criar conta / Napker'

    return (
        <>
            {currentPage === 'signup' &&
                <SignupForm setSignupPage={setCurrentPage} setMyUserId={setMyUserId} />
            }
            {currentPage === 'interests' &&
                <InterestsForm setSignupPage={setCurrentPage} myUserId={myUserId} />
            }
            {currentPage === 'activation-link-sent' &&
                <ActivationLinkSent />
            }
            {currentPage === 'page-loader' &&
                <PageLoader />
            }
        </>
    )
}