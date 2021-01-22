import React from 'react'

import AlgorithmSettings from '../../../../components/fixed/sidebar-right/components/home-sidebar/components/algorithm-settings/AlgorithmSettings'

export default function DemoAlgorithmSettings() {

    return (
        <>
            <AlgorithmSettings renderInfoIcon={false} isDemo={true} isMobile={true} />
        </>
    )
}