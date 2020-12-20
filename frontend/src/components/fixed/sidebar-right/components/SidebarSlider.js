import React from 'react'

export default function SidebarSlider(props) {

    const handlePageChange = e => {
        document.querySelectorAll('.slider-navigation-item').forEach(el => {
            el.style.opacity = .5
        })
        e.target.style.opacity = 1

        props.handlePageChange(e)
    }

    return (
        <div className="d-flex w-100 justify-content-center position-absolute pb-3" style={{ bottom: '0' }}>
            <div
                className="w-25 p-1 m-2 primary-hover slider-navigation-item"
                id="0"
                style={{ background: 'var(--primary-color)', opacity: '1' }}
                onClick={handlePageChange}
            />
            <div
                className="w-25 p-1 m-2 primary-hover slider-navigation-item"
                id="1"
                style={{ background: 'var(--primary-color)', opacity: '.5' }}
                onClick={handlePageChange}
            />
            <div
                className="w-25 p-1 m-2 primary-hover slider-navigation-item"
                id="2"
                style={{ background: 'var(--primary-color)', opacity: '.5' }}
                onClick={handlePageChange}
            />
        </div>
    )
}