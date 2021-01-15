import React from 'react'

export default function Header(props) {
    const isMobile = visualViewport.width <= 980
    
    return (
        <div className="d-flex justify-content-between align-items-center header fixed-top">
            <div>
                {props.backArrow &&
                    <i class="fas fa-arrow-left left-arrow-icon" onClick={() => window.history.back()} />
                }
                <strong>{props.page}</strong>
            </div>
            {props.children}
        </div>
    )
}