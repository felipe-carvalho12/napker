import React, { useContext, useEffect } from 'react'

import { ThemeContext } from '../context/app/AppContext'

import { setTheme } from '../config/utils'


export default function ThemeSwitcher(props) {
    const checkboxId = props.id

    const [theme, setThemeContext] = useContext(ThemeContext)

    useEffect(() => {
        document.getElementById(checkboxId).checked = theme === 'dark'
    }, [theme])

    const switchTheme = () => {
        setThemeContext(theme === 'light' ? 'dark' : 'light')
        setTheme()
    }

    return (
        <div
            className={`pr-10px theme-switcher ${props.className}`}
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
        </div>
    )
} 