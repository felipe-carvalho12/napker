import React from 'react'

export default function Header(props) {
    return (
        <div className="d-flex justify-content-between align-items-center header fixed-top b-bottom">
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