import React, { useState } from 'react'

import ResetPasswordForm from './components/ResetPasswordForm'
import PageLoader from '../../PageLoader'


export default function ResetPassword() {
    const [currentPage, setCurrentPage] = useState('reset-password')

    document.title = 'Recuperar senha / Napker'

    return (
        <>
            {currentPage === 'reset-password' &&
                <ResetPasswordForm setResetPasswordPage={setCurrentPage} />
            }
            {currentPage === 'page-loader' &&
                <PageLoader />
            }
        </>
    )
}