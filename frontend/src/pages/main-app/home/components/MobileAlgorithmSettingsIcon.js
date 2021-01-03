import React, { useState } from 'react'
import AlgorithmSettings from '../../../../components/fixed/sidebar-right/components/home-sidebar/components/algorithm-settings/AlgorithmSettings'


export default function MobileAlgorithmSettingsIcon(props) {
    const [isOpen, setIsOpen] = props.useIsOpen

    return (
        <>
            <i
                className="material-icons d-none justify-content-center align-items-center c-primary-color header-view-more-icon"
                style={{ textDecoration: 'none', width: '30px', height: '30px', borderRadius: '30px' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                sort
            </i>
            {isOpen &&
                <div className="position-absolute d-flex vw-100 vh-100 b-theme-base-color" style={{ left: '0', top: 'var(--header-heigth)', zIndex: '2000' }}>
                    <AlgorithmSettings className='w-100 h-100 position-relative' isMobile={true} saveCallBack={() => setIsOpen(false)} />
                </div>
            }
        </>
    )
} 