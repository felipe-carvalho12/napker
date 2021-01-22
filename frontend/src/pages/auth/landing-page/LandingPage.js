
import React from 'react'

import DesktopLP from './components/DesktopLP'
import MobileLP from './components/MobileLP'

export default function LandingPage() {
    const isMobile = visualViewport.width <= 980

    document.title = 'Bem Vindo / Napker'

    return (
        <>
            {isMobile ?
                <MobileLP />
                :
                <DesktopLP />
            }
        </>
    )
}