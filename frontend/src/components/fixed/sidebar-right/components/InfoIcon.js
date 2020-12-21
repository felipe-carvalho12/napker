import React from 'react'


export default function InfoIcon(props) {

    return (
        <i
            class="fas fa-info-circle position-absolute hover-pointer p-3"
            style={{ top: '0', right: '0', color: '#555' }}
            onClick={props.onClick}
        />
    )
}