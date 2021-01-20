import React, { createContext, useEffect, useState } from 'react'
import { setTheme } from '../../../config/utils'

export const ThemeContext = createContext()

export const ThemeContextProvider = props => {
    const [theme, setThemeContext] = useState(window.localStorage.getItem('theme') || 'light')
    
    useEffect(() => {
        window.localStorage.setItem('theme', theme)
        setTheme()
    }, [theme])

    return (
        <ThemeContext.Provider value={[theme, setThemeContext]}>
            {props.children}
        </ThemeContext.Provider>
    )
}