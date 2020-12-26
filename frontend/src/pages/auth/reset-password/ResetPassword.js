import React, { useState } from 'react'

import ResetPasswordForm from './components/ResetPasswordForm'
import EmailSent from './components/EmailSent'
import PageLoader from '../../PageLoader'


export default function ResetPassword() {
    const [currentPage, setCurrentPage] = useState('reset-password')

    document.title = 'Recuperar senha / Napker'

    return (
        <>
            {currentPage === 'reset-password' &&
                <ResetPasswordForm setResetPasswordPage={setCurrentPage} />
            }
            {currentPage === 'email-does-not-exists' &&
                <ResetPasswordForm setResetPasswordPage={setCurrentPage} errMessage='Não existe nenhuma conta ligada a esse email!' />
            }
            {currentPage === 'email-sent' &&
                <EmailSent />
            }
            {currentPage === 'page-loader' &&
                <PageLoader />
            }
        </>
    )
}