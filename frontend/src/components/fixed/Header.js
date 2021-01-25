import React from 'react'

export default function Header(props) {
    const isMobile = visualViewport.width <= 980
    
    return (
        <div className={"d-flex justify-content-between align-items-center header fixed-top " + props.className} style={props.style}>
            <div>
                {props.backArrow &&
                    <i class="fas fa-arrow-left left-arrow-icon" onClick={() => window.history.back()} />
                }
                <spam className="c-secondary-grey fw-300 fs-21 fa-l">{props.page}</spam>
            </div>
            {props.children}
        </div>
    )
}