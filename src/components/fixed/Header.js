import React from 'react'

export default function Header(props) {
    return (
        <div className="header fixed-top b-bottom">
            {!props.backArrow ? '' :
                <i class="fas fa-arrow-left left-arrow-icon" onClick={() => window.history.back()} />
            }
            <strong>{props.page}</strong>
        </div>
    )
}