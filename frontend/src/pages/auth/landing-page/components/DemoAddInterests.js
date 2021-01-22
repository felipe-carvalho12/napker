import React from 'react'

import PublicInterests from '../../../main-app/profile/pages/edit_interests/components/PublicInterests'
import PrivateInterests from '../../../main-app/profile/pages/edit_interests/components/PrivateInterests'


export default function DemoAddInterests() {

    return (
        <>
            <div className="pb-3" style={{ textAlign: 'start' }}>
                <PublicInterests />
                <PrivateInterests />
            </div>
        </>
    )
}