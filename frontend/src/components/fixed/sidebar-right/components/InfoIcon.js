import React from 'react'


export default function InfoIcon(props) {

    return (
        <i
            class="fas fa-info-circle position-absolute hover-pointer py-3"
            style={{ top: '0', right: '0', color: 'var(--text-secondary)' }}
            onClick={props.onClick}
        />
    )
}