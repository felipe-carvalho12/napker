import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = props => {
    const [theme, setTheme] = useState(window.localStorage.getItem('theme') || 'light')

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    )
}