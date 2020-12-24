import React from 'react'

import Logo from '../assets/icons/Logo'


export default function PageLoader() {

    return (
        <div className="d-flex align-items-center" style={{ height: '85vh' }}>
            <div className="spinner">
                <Logo size="50pt" />
            </div>
        </div>
    )
}