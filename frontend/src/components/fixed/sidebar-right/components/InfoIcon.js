import React from 'react'


export default function InfoIcon(props) {

    return (
        <i
            className={`fas fa-info-circle position-absolute hover-pointer py-2 ${props.className}`}
            style={{ top: '0', right: '5px', zIndex: '2000' }}
            onClick={props.onClick}
        />
    )
}