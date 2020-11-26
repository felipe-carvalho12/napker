import React from 'react'

export default function Header(props) {
    return (
        <div className="header fixed-top">
            {!props.backArrow ? '' :
                <i class="fas fa-arrow-left left-arrow-icon" onClick={() => window.history.back()} />
            }
            <strong>{props.page}</strong>
        </div>
    )
}