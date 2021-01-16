import React, { useEffect } from 'react'

import { setTheme } from '../config/utils'


export default function ThemeSwitcher(props) {
    const checkboxId = props.id

    let theme = window.localStorage.getItem('theme') || 'light'

    useEffect(() => {
        document.getElementById(checkboxId).checked = theme === 'dark'
    }, [])

    const switchTheme = () => {
        theme = theme === 'light' ? 'dark' : 'light'
        setTheme(theme)
        window.localStorage.setItem('theme', theme)
    }

    return (
        <div
            className={`d-flex justify-content-start align-items-center sidebar-menu-item theme-switcher ${props.className}`}
            style={props.style}
        >
            <div class="one-quarter" id="switch">
                <input type="checkbox" class="checkbox" id={checkboxId} onChange={switchTheme} />
                <label class="label m-0" for={checkboxId}>
                    <i class="fas fa-sun"></i>
                    <i class="fas fa-moon"></i>
                    <div class="ball"></div>
                </label>
            </div>
            <span style={{ marginLeft: '10px' }}>Tema</span>
        </div>
    )
} 